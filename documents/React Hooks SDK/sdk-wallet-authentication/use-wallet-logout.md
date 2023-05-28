---
title: "useWalletLogout"
slug: "use-wallet-logout"
hidden: true
createdAt: "2023-01-23T18:10:37.501Z"
updatedAt: "2023-03-10T11:04:10.778Z"
---
`useWalletLogout` is a React Hook that lets you log out of the previously authenticated user. You have to be authenticated before calling `logout`.

```typescript
const { execute, isPending } = useWalletLogout();
```



## Reference

### `useWalletLogout`

Call `useWalletLogout` in the component responsible to log out your users.

```typescript
function LogoutButton() {
  const { execute: logout, isPending } = useWalletLogout();
  
  return (
 	  <button disabled={isPending} onClick={logout}>Log out</button>
  );
}
```



#### Parameters

`useWalletLogout` does not take any parameters.

#### Returns

Returns an object with:

- `execute`: a function you can use to programmatically log out currently logged-in user.
- `isPending`: a boolean notifying you when the operation is still in progress.