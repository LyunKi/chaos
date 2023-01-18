import AsyncStorage from '@react-native-async-storage/async-storage'

const EXPIRED_TIME_PREFIX = '&expiredTime='

export class Storage {
  private prefix: string

  public constructor(prefix: string) {
    this.prefix = prefix
  }
  private createStorageKey(key: string): string {
    return `${this.prefix}${key}`
  }

  async setItem<T>(key: string, value: T, validTime?: number): Promise<void> {
    const processedKey = this.createStorageKey(key)
    let processedValue = JSON.stringify({ value })
    if (validTime) {
      const expiredTime = Date.now() + validTime
      processedValue += `${EXPIRED_TIME_PREFIX}${expiredTime}`
    }
    await AsyncStorage.setItem(processedKey, processedValue)
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(this.createStorageKey(key))
  }

  async clear(): Promise<void> {
    await AsyncStorage.clear()
  }

  async getItem<T>(
    key: string,
    defaultValue: T | null = null
  ): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(this.createStorageKey(key))
      if (data) {
        const [dataString, expiredTIme] = data.split(EXPIRED_TIME_PREFIX)
        if (!expiredTIme || +expiredTIme > Date.now()) {
          return JSON.parse(dataString).value as T
        }
        //已经过期了,移除过期的存储
        await this.removeItem(key)
      }
      return defaultValue
    } catch (e) {
      return defaultValue
    }
  }

  async getOrInsert<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const data = await AsyncStorage.getItem(this.createStorageKey(key))
      if (data) {
        const [dataString, expiredTIme] = data.split(/&expiredTime=/)
        if (!expiredTIme || +expiredTIme > Date.now()) {
          return JSON.parse(dataString).value as T
        }
        //已经过期了,移除过期的存储
        await this.removeItem(key)
      }
      await this.setItem<T>(key, defaultValue)
      return defaultValue
    } catch (e) {
      await this.setItem<T>(key, defaultValue)
      return defaultValue
    }
  }
}
