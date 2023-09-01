import { KV } from '@cloud-dragon/common-types';

export function buildString(head = '', ...conditions: KV<boolean>[]): string {
  let result = head;
  conditions.forEach((condition) => {
    for (const key of Reflect.ownKeys(condition)) {
      const value = condition[key];
      if (value) {
        result += String(key);
      }
    }
  });
  return result;
}

export function includesIgnoreCase(master: string, target: string): boolean {
  return master.toLowerCase().includes(target.toLowerCase());
}
