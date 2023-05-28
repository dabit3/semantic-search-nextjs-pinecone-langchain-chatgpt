---
title: "useProfilesOwnedBy"
slug: "use-profiles-owned-by"
hidden: false
createdAt: "2023-02-28T15:03:09.867Z"
updatedAt: "2023-03-20T06:58:24.686Z"
---
`useProfilesOwnedBy` is a React Hook that lets you query the profiles owned by a specific wallet address.

```typescript
const { data, loading, hasMore, next } = useProfilesOwnedBy(args)
```



## Usage

```typescript TypeScript
import { useProfilesOwnedBy } from '@lens-protocol/react-web';

function ProfilesOwnedBy() {
const {
    data: profiles,
    loading,
    hasMore,
    next,
  } = useProfilesOwnedBy({
    address: "0x0000000000000000000000000000000000000000"
    limit: 10,
  });
}
```



## Reference

### `useProfilesOwnedBy(args)`

### Parameters

`address: string` (required)

- The address to query for to view profiles owned

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: ProfileFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more profles after the current batch
  next(): () => void, // fetches the next profiles and appends to the data
}
```