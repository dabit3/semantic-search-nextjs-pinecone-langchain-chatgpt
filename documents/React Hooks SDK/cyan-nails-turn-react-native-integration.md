---
title: "React Native integration"
slug: "cyan-nails-turn-react-native-integration"
hidden: false
createdAt: "2023-02-01T09:35:13.933Z"
updatedAt: "2023-03-20T07:44:01.356Z"
---
The Lens SDK was built with `react-native` support in mind. Due to the nature of `react-native` environment some additional setup steps are required compared to the web.

The first major difference is tha you should install the `@lens-protocol/react` package rather than `@lens-protocol/react-web` like you see in the examples. Then you can follow the rest of the examples, unless clearly specified, as they are still relevant also for React Native integrations. Only the import and some minor `<LensProvider>` configuration aspects are different.

For the most up-to-date integration steps for react-native visit the `README.md` of our `react-native` example app - <https://github.com/lens-protocol/lens-sdk/tree/main/examples/react-native#integrating-with-lens-protocolreact>

The [example app](https://github.com/lens-protocol/lens-sdk/tree/main/examples/react-native) showcases the integration with the`@lens-protocol/react` and the way to build and provide custom `IStorageProvider` and `IBindings` implementations.