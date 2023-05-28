---
title: "useProfilesOwnedByMe"
slug: "use-profiles-owned-by-me"
hidden: false
createdAt: "2023-02-28T15:05:35.543Z"
updatedAt: "2023-03-20T07:04:03.468Z"
---
`useProfilesOwnedByMe` is a React Hook that lets you query the profiles owned by the currently active wallet. This differs from the `useProfilesOwnedBy` hook where the results of this hook include newly created profiles belonging to the active wallet address.

```typescript
const { data, loading, hasMore, next } = useProfilesOwnedByMe(args)
```



## Usage

```typescript TypeScript
import { useProfilesOwnedByMe } from '@lens-protocol/react-web';

function MyProfiles() {
const {
    data: profiles,
    loading,
    hasMore,
    next,
  } = useProfilesOwnedByMe({
    limit: 10,
  });
}
```



## Reference

### `useProfilesOwnedByMe(args)`

### Parameters

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: ProfileOwnedByMeFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more profles after the current batch
  next(): () => void, // fetches the next profiles and appends to the data
}
```