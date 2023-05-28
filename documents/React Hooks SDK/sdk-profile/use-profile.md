---
title: "useProfile"
slug: "use-profile"
hidden: false
createdAt: "2022-12-23T13:59:35.385Z"
updatedAt: "2023-03-20T06:58:03.193Z"
---
`useProfile` is a React Hook that lets you fetch a Lens profile by handle or by profile ID.

```typescript
const result = useProfile(args);
```



## Usage

```typescript
import { useProfile } from '@lens-protocol/react-web';

function ProfilePage() {
  const { data: profile, loading } = useProfile({ handle: 'lensprotocol.test'});
  // ...
}
```



## Reference

### `useProfile(args)`

```typescript
const { data, loading } = useProfile({ handle, profileId, observerId})
```



#### Parameters

- `handle: string`: The lens handle that you want to fetch. 
- `profileId: string`:  The profile ID that you want to fetch. 
- `observerId: string` (optional):  The id of the profile who is running the query, usually the logged in/active profile.

> ❗️ The hook will throw an error if both `handle` and `profileId` are defined

#### Returns

```typescript
{
  data: ProfileFragment; // the profile data
  loading: boolean; // a flag that let you determine if data is ready to be read
}
  
```