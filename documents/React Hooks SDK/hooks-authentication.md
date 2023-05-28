---
title: "Authentication"
slug: "hooks-authentication"
excerpt: "Sign-in, Sign-out and in between"
hidden: false
createdAt: "2023-04-04T07:27:51.068Z"
updatedAt: "2023-04-12T10:16:11.071Z"
---
## Sign in

Although the following example uses [wagmi](https://wagmi.sh/) it can be adapted to any wallet integration that results in an [ethers](https://ethers.org/) `Signer`.

```typescript
import { useWalletLogin } from '@lens-protocol/react-web';
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
      {loginError && <p>{loginError}</p>}
      <button disabled={isLoginPending} onClick={onLoginClick}>Log in</button>
    </div>
  );
}
```



## Determine if the user is authenticated

The Lens SDK makes use of the provided `Signer` instance only when really necessary and, once authenticated, it keeps track of it's own authentication status independently from the user's wallet.

This allows to provide an app user experience that is reminiscent of traditional web2 social apps in the sense that user can come back to their authenticated browser tab (or app in the case of a React Native integration) they are not prompted to sign over and over authentication challenges. Also if your user were to open multiple dApps and switch network and/or accounts, this means that as they come back to your social app power by the Lens SDK they won't be prompted to switch back. The app will still be authenticated. Only at the time that a signature is required the Lens SDK will prompt the user to do the correct changes (e.g. switch back to Polygon network, etc).

This also has the nice benefits of allowing the user to connect multiple wallets to the same dApps for the purpose of proving ownership of tokens/NFTs that are not hold on the wallet holding the Lens profile. We will get back to this when we will talk about using an NFT on another wallet as profile picture.

```typescript
import { useActiveWallet } from '@lens-protocol/react-web';

function HomePage() {
  const { data: wallet, loading } = useActiveWallet();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (wallet) {
    return <p>You are logged-in with {wallet.address}</p>;
  } 

  return <p>You are logged-out</p>;
}
```



## Sign out

```typescript
import { useWalletLogout } from '@lens-protocol/react-web';

function LogoutButton() {
  const { execute: logout, isPending } = useWalletLogout();
  
  return (
    <button disabled={isPending} onClick={logout}>Log out</button>
  );
}
```



Although the `useWalletLogout` returns an `isPending` flag, the sign-out operation tends to be pretty fast so do not expect to account for long wait. You probably don't need to do more than you see in the example above.