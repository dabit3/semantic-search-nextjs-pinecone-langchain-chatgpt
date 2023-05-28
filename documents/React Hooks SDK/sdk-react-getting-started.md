---
title: "Getting Started"
slug: "sdk-react-getting-started"
hidden: false
createdAt: "2022-12-22T21:53:20.983Z"
updatedAt: "2023-05-17T07:03:36.563Z"
---
> 🚧 Having some errors?
> 
> Have a look at our [troubleshooting](https://docs.lens.xyz/docs/troubleshooting) section which highlight some well know pain points that can happen during initial setup.

## Installation

Install `@lens-protocol/react-web` and [ethers](https://ethers.org/) dependency.

>  For this configuration of packages we recommend installing using either **yarn** or **pnpm**.

```shell yarn
yarn add @lens-protocol/react-web ethers@legacy-v5
```
```shell pnpm
pnpm add @lens-protocol/react-web ethers
```

> 🚧 Early adopters
> 
> If you are eager to test new coming features offered by the Lens SDK, install the pre-release version via the `next` tag.
> 
> ```shell yarn
> yarn add @lens-protocol/react-web@next
> ```
> ```shell pnpm
> pnpm add @lens-protocol/react-web@next
> ```
> 
> Bear in mind that the pre-releases are not stable for production use and there could be breaking changes between different pre-releases before they get promoted into a stable release version.

## Integrate with [wagmi](https://wagmi.sh/)

Although `@lens-protocol/react-web` only depends on [ethers](https://ethers.org/) (and React ofc), we created a companion package called `@lens-protocol/wagmi` which makes it easier to integrate it with the popular [wagmi](https://wagmi.sh/) library.

```shell yarn
yarn add wagmi@0.12.7 @lens-protocol/wagmi
```
```shell pnpm
pnpm add wagmi@0.12.7 @lens-protocol/wagmi
```

Ensure you have Polygon in the wagmi chains configuration

```typescript
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
```

Refer to [wagmi](https://wagmi.sh/) docs to see how to set up custom chains, providers and work with their client.

### Create the `LensConfig`

```typescript
import { LensConfig, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};
```

The environment variables comes in 2 flavours:

- `production` is the environment config variable to be used in the live instance of your application (real users, real profiles, real data).
- `development` is the environment config variable to be used when you develop and test your application (test users, test profiles, test data).

**NOTE**

Since v1.0.0 the `staging` got replaced by `development`. The `staging` environment config variable is still available as alias but flagged as deprecated. It will be removed in the next major release of the Lens SDK.

See our [react-native integration](doc:cyan-nails-turn-react-native-integration) guide.

## Wrap app with `LensProvider`

```typescript
import { LensProvider } from '@lens-protocol/react-web';
```

```html JSX
<WagmiConfig client={client}>
  <LensProvider config={lensConfig}>
    <YourRoutes />
  </LensProvider>
</WagmiConfig>
```

It's not strictly necessary to have the `LensProvider` as a child of the `WagmiConfig`.

You are good to go!

> 📘 Prefer to learn from examples?
> 
> That's perfect! We have a fully fledged example app showcasing the integration with wagmi. Our example app has authentication built-in and it's using pretty much all Lens SDK hooks.
> 
> You can find it on GitHub: <https://github.com/lens-protocol/lens-sdk/tree/main/examples/web-wagmi>