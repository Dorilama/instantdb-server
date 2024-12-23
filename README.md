# instantdb-server

Unofficial port of [@instantdb/react](https://github.com/instantdb/instant/blob/main/client/packages/react/README.md) for use in a reactive server

## !!!DISCLAIMER!!!

This package is an experiment. It bends the sdk to use it for something it's not supposed to do. It's very easy (if not granted) to generate unexpected behaviour and do something stupid with it. It is also a good way for me to try think with a different perspective, so maybe you can enjoy it too. Have fun.

---

> see `sandbox/node-server/src/index.ts` for an example

- using `@preact/signals-core` for reactivity
- starting from the simple assumption that network status is always connected and no data gets stored on the server
- subscribe to a query like `useQuery` and execute a callback every time its state changes
- query can be dynamically changed, the subscription updates automatically
- subscribe to auth like `useAuth` and execute a callback when its state changes

---

Related: [this](https://github.com/Dorilama/instantdb-vue#readme) is library that brings the sdk for vue.
