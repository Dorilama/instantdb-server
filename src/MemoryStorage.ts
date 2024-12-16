// Notice:
// adapted from [@instantdb/react-native](https://github.com/instantdb/instant/blob/main/client/packages/react-native/README.md)
// see instantdb-license.md for license

export default class MemosyStorage {
  public dbName: string;
  public _store: Map<any, any>;
  constructor(dbName: string) {
    this.dbName = dbName;
    this._store = new Map();
  }

  async getItem(key: string) {
    const value = this._store.get(`${this.dbName}_${key}`);
    if (typeof value === "string") {
      return value;
    }
    return null;
  }

  async setItem(key: any, value: any) {
    this._store.set(`${this.dbName}_${key}`, value);
  }
}
