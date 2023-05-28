---
title: "useWalletLogin"
slug: "use-wallet-login"
hidden: true
createdAt: "2023-01-23T17:50:04.489Z"
updatedAt: "2023-03-10T11:03:17.934Z"
---
`useWalletLogin` is a React Hook that lets you authenticate with the Lens API.

```typescript
const { execute, error, isPending } = useWalletLogin();
```



## Usage

Although the following example uses [wagmi](https://wagmi.sh/) it can be adapted to any wallet integration that results in an [ethers](https://ethers.org/) `Signer`.

```typescript
import { useWalletLogin } from '@lens-protocol/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

function LoginButton() {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer);
    }
  };
 
  return (
    <div>
      {error && <p>{error}</p>}
      <button disabled={isPending} onClick={onLoginClick}>Log in</button>
    </div>
  );
}
```



> 📘 Looking for a full-fledged example?
> 
> Check the [web-wagmi](https://github.com/lens-protocol/lens-sdk/tree/main/examples/web-wagmi) example in the Lens SDK monorepo. It's showcasing a full authnetication integration with some helper components to control which part of the UI should be just for logged in (or logged out) users.

## Reference

### `useWalletLogin`

Call `useWalletLogin` in the component responsible to log in your users.

```typescript
function LoginButton() {
  const { execute, error, isPending } = useWalletLogin();
  // ...
```



#### Parameters

`useWalletLogin` does not take any parameters.

#### Returns

Returns an object with:

- `execute`: a function you can use to programmatically log in your user with the Lens API.
- `isPending`: a boolean notifying you when the operation is still in progress.
- `error`: any error that might occur in normal operating conditions will be returned via this property. Default value `null`.

### `execute` function

The `execute` function returned by the `useWalletLogin` lets you programmatically login the specified [ethers](https://ethers.org/) `Signer`. If called multiple times it will re-trigger a new login flow. If called with a different signer it will implicitly log-out the old signer and log-in the new one.

```typescript
execute(signer)
```



#### Parameters

- `signer: Signer`: an instance of ethers `Signer`