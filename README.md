# instantdb-server

Unofficial port of [@instantdb/react](https://github.com/instantdb/instant/blob/main/client/packages/react/README.md) for use in a reactive server

> see `sandbox/node-server/src/index.ts` for an example

- using `@preact/signals-core` for reactivity
- starting from the simple assumption that network status is always connected and no data gets stored on the server
- subscribe to a query like `useQuery` and execute a callback every time its state changes
- query can be dynamically changed, the subscription updates automatically
- subscribe to auth like `useAuth` and execute a callback when its state changes

---

Related: [this](https://github.com/Dorilama/instantdb-vue#readme) is library that brings the sdk for vue.
