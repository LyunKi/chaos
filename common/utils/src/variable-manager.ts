import forEach from "lodash-es/forEach";
import get from "lodash-es/get";
import isEmpty from "lodash-es/isEmpty";
import isObject from "lodash-es/isObject";
import isString from "lodash-es/isString";
import mapValues from "lodash-es/mapValues";
import merge from "lodash-es/merge";
import setWith from "lodash-es/setWith";
import { KV, NestedString } from "@cloud-dragon/common-types";

function isReferenceValue(value: string | NestedString): value is string {
	return isString(value) && value.startsWith("$") && !value.includes(":");
}

export type VariableManagerContext = NestedString;
export type VariablePack = KV<NestedString>;
export type VariablePacks = KV<VariablePack>;

export class VariableManager {
	private context = {};

	public updateContext(context?: Partial<VariableManagerContext>) {
		merge(this.context, context);
	}

	public setContext(context: VariableManagerContext) {
		this.context = context;
	}

	private variables = {};

	private packs: VariablePacks = {};

	public setPacks(packs: VariablePacks) {
		this.packs = packs;
	}

	private packKey: string;

	public setPackKey(packKey: string) {
		this.packKey = packKey;
	}

	public get pack() {
		return this.packs[this.packKey] ?? {};
	}

	public constructor(options: any) {
		const { packKey } = options;
		this.packKey = packKey;
	}

	public initManager() {
		this.processVariables();
	}

	protected handlePresetVariableValue(value: any) {
		return value;
	}

	private flatVariables(flatVariables: KV, variables: KV, path?: string) {
		forEach(variables, (value, key) => {
			const currentPath = path ? `${path}.${key}` : key;
			const firstProcessed = this.handlePresetVariableValue(value);
			if (isObject(firstProcessed)) {
				this.flatVariables(flatVariables, firstProcessed, currentPath);
				return;
			}
			flatVariables[currentPath] = firstProcessed;
		});
	}

	private maxReferenceDepth = 10;

	public setMaxReferenceDepth(maxReferenceDepth: number) {
		this.maxReferenceDepth = maxReferenceDepth;
	}

	private reduceReferences(flatVariables: KV) {
		const references: KV = {};
		forEach(flatVariables, (value, key) => {
			if (!isReferenceValue(value)) {
				return;
			}
			references[key] = value;
		});
		// Handle reference values recursively
		let recursiveFlag = true;
		let depth = 0;
		while (!isEmpty(references) && recursiveFlag) {
			recursiveFlag = false;
			depth += 1;
			if (depth > this.maxReferenceDepth) {
				throw new Error("Your reference variable value is too deep");
			}
			for (const key of Reflect.ownKeys(references)) {
				const value = references[key];
				const referenceValue = get(flatVariables, value.slice(1));
				if (!referenceValue) {
					continue;
				}
				if (isReferenceValue(referenceValue)) {
					references[key] = referenceValue;
					continue;
				}
				delete references[key];
				flatVariables[key] = referenceValue;
			}
		}
	}

	private calcVariables(flatVariables: KV) {
		forEach(flatVariables, (value, key) => {
			setWith(this.variables, key, value, Object);
		});
	}

	private processVariables = () => {
		const flatVariables = {};
		this.flatVariables(flatVariables, this.pack);
		this.reduceReferences(flatVariables);
		this.calcVariables(flatVariables);
	};

	public processedValue(value: any) {
		if (isReferenceValue(value)) {
			const path = value.slice(1);
			return get(this.variables, path);
		}
		return this.handlePresetVariableValue(value);
	}

	public processed(variables?: KV) {
		return mapValues(variables, (value) => {
			return this.processedValue(value);
		});
	}
}
