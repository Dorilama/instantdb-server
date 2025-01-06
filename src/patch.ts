//@ts-nocheck
globalThis.window = {
  localStorage: {
    getItem(key: string) {
      return globalThis.process?.env?.[key] || null;
    },
  },
};

export default {};
