import isString from 'lodash/isString'
import * as Yup from 'yup'

interface SchemaMap {
  [key: string]: Yup.BaseSchema
}

interface FieldConfig {
  schemaName?: string
  fieldName: string
  required?: string | boolean
}

export class ValidationSchema {
  private schema: SchemaMap = {}

  public constructor(schema?: SchemaMap) {
    if (schema) {
      this.schema = schema
    }
  }

  public init(schema: SchemaMap) {
    this.schema = schema
  }

  public load(schemas: Array<string | FieldConfig>) {
    return Yup.object().shape(
      schemas.reduce((prev, current) => {
        let fieldConfig
        if (isString(current)) {
          fieldConfig = {
            required: false,
            fieldName: current,
            schemaName: current,
          }
          prev[current] = this.schema[current].nullable()
        } else {
          const { fieldName, schemaName, required } = current
          fieldConfig = {
            fieldName,
            schemaName: schemaName ?? fieldName,
            required,
          }
        }

        const { schemaName, fieldName, required } = fieldConfig
        let schema = this.schema[schemaName]
        if (required) {
          schema = schema.required(
            isString(required)
              ? required
              : `errors.fields.${fieldName}.required`
          )
        } else {
          schema = schema.notRequired()
        }
        prev[fieldName] = schema
        return prev
      }, {} as SchemaMap)
    )
  }
}

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const enum ValidateType {
  EMAIL,
}

export class CommonValidator {
  public static validateEmail(email?: string | null) {
    return email && EMAIL_REGEX.test(email)
  }
}
