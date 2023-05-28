---
title: "Troubleshooting"
slug: "troubleshooting"
excerpt: "These are some common issues you may run into while using `@lens-protocol/react`."
hidden: false
createdAt: "2023-03-08T22:00:53.661Z"
updatedAt: "2023-05-17T12:29:40.290Z"
---
## Next.js build failing

You might see your Next.js build failing with an error like this:

```
Error: Directory import '[...]/node_modules/@apollo/client/link/context' is not supported resolving ES modules imported from [...]/node_modules/@lens-protocol/api-bindings/dist/index.js
Did you mean to import @apollo/client/link/context/context.cjs?
```

The root cause is the lack of ESM support from Apollo Client which manifests itself when imported as sub-dependency of `@lens-protocol/api-bindings` (which in turn is imported by `@lens-protocol/react`). See open Apollo Client [issue](https://github.com/apollographql/apollo-feature-requests/issues/287).

To fix it you need to edit you `next.config.js` so to make sure the Lens SDK and its sub-dependencies a transpiled by Next.js build pipeline.

```js
const nextConfig = {
  transpilePackages: ['@lens-protocol'],
};
```

For further details on how to integrate Lens SDK with a Next.js app, there is a working [Next.js example](https://github.com/lens-protocol/lens-sdk/tree/main/examples/nextjs) in the Lens SDK monorepo.