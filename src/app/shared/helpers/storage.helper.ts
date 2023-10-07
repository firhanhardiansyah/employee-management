import { Injectable } from '@angular/core';
import { environment } from '@env/environment.development';

@Injectable()
export class StorageHelper {
  private static storagePrefix: string =
    environment.appName + '_' + environment.version + '_';

  public static setItem(key: string, value: any, prefix: boolean = true): void {
    const itemKey = this.prefixer(key, prefix);
    localStorage.setItem(itemKey, JSON.stringify(value));
  }

  public static getItem(key: string, prefix: boolean = true): any {
    const itemKey = this.prefixer(key, prefix);
    const res = localStorage.getItem(itemKey);
    if (res !== 'undefined') return JSON.parse(res as any);
    return null;
  }

  public static removeItem(key: string, prefix: boolean = true): void {
    const itemKey = this.prefixer(key, prefix);
    localStorage.removeItem(itemKey);
  }

  public static getKeys(all: boolean = false): string[] {
    const keys: string[] = [];
    for (const key in localStorage) keys.push(key);
    if (all) return keys;
    return keys.filter((item) => item.startsWith(this.storagePrefix));
  }

  public static clearItems(all: boolean = false): void {
    if (all) {
      localStorage.clear();
      return;
    }
    const prefixedKeys = this.getKeys();
    for (const prefixedKey of prefixedKeys) this.removeItem(prefixedKey, false);
  }

  public static clearItemsWithoutCurrentPrefix(): void {
    const allKeys = this.getKeys(true);
    for (const key of allKeys)
      if (!key.startsWith(this.storagePrefix)) this.removeItem(key, false);
  }

  private static prefixer(key: string, autoPrefix: boolean): string {
    let itemKey = key;
    if (autoPrefix) itemKey = this.storagePrefix + key;
    return itemKey;
  }
}
