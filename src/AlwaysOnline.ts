// Notice:
// adapted from [@instantdb/react-native](https://github.com/instantdb/instant/blob/main/client/packages/react-native/README.md)
// see instantdb-license.md for license

export default class AlwaysOnline {
  // assume the network is always connected
  static async getIsOnline() {
    return true;
  }
  static listen(_: any) {
    return () => {};
  }
}
