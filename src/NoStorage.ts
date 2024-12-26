// Notice:
// adapted from [@instantdb/react-native](https://github.com/instantdb/instant/blob/main/client/packages/react-native/README.md)
// see instantdb-license.md for license

export default class NoStorage {
  public dbName: string;

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  async getItem(key: string) {
    return null;
  }

  async setItem(key: any, value: any) {}
}
