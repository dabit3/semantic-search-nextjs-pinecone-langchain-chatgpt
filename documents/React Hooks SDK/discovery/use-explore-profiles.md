---
title: "useExploreProfiles"
slug: "use-explore-profiles"
hidden: false
createdAt: "2022-12-23T17:10:46.544Z"
updatedAt: "2023-03-20T07:14:46.612Z"
---
`useExploreProfiles` is a React Hook used to query Lens profiles. 

```typescript
const { data, loading, hasMore, next } = useExploreProfiles(args)
```



## Usage

```typescript TypeScript
import { useExploreProfiles } from '@lens-protocol/react-web';

function ExploreProfiles() {
const { data, loading } = useExploreProfiles();
}
```



## Reference

### `useExploreProfiles(args)`

### Parameters

`observerId: string` (optional)

- The id of the profile that is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: ProfileFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more profiles after the current batch
  next(): () => void, // fetches the next profiles and appends to the data
}
```