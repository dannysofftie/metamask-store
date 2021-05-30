if (typeof window !== 'undefined') {
  Object.defineProperty(navigator || {}, 'serviceWorker', {
    writable: false,
    value: {
      addEventListener: () => null,
    },
  });
}
