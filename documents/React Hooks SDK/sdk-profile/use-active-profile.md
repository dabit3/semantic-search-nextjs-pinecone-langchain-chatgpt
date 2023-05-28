---
title: "useActiveProfile"
slug: "use-active-profile"
hidden: false
createdAt: "2022-12-23T13:59:01.519Z"
updatedAt: "2023-03-20T06:58:16.719Z"
---
`useActiveProfile` is a React Hook that lets you access the currently active Profile.

```typescript
const { data, loading } = useActiveProfile();
```



## Usage

An `Signer` can own multiple Lens profiles. The Lens SDK has the concept of Active Profile. It's an in memory reference to a Profile object owned by the logged-in `Signer`. It is also persisted in the underlying `IStorageProvider` (see [`LensConfig`](doc:sdk-getting-started) until log out.

Call `useActiveProfile` whenever you need access to the active Profile data.

```typescript
import { useActiveProfile } from '@lens-protocol/react-web';

function ActiveProfileHandle() {
  const { data, error, loading } = useActiveProfile();
  
  if (loading) return <p>Loading...</p>
  
  if (error) return <p>{error.message}</p>

  if (data === null) return <p>No active profile selected</p>

  return <p>@{data.handle}</p>
}
```



> 📘 Which profile?
> 
> During the login the first profile owned by the authenticated `Signer` will be selected as the active profile.

## Reference

### `useActiveProfile()`

```typescript
function ActiveProfileHandle() {
  const { data, error, loading } = useActiveProfile();
  // ...
}
```



#### Parameters

- `useActiveProfile` does not take any parameters.

#### Returns

- `data` the `ProfileOwnedByMeFragment` data or `null` if there is no active profile.
- `error` any error it might occur while retrieving active profile data.
- `loading` a flag that let you determine if `data` is ready to be read.