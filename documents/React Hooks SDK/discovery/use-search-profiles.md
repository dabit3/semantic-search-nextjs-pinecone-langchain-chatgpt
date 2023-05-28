---
title: "useSearchProfiles"
slug: "use-search-profiles"
hidden: false
createdAt: "2023-01-12T07:06:41.027Z"
updatedAt: "2023-03-20T07:14:54.705Z"
---
`useSearchProfiles` is a React Hook used to query Lens profiles based on a query. 

```typescript
const { data, loading, hasMore, next } = useSearchProfiles(args)
```



## Usage

```typescript TypeScript
import { useSearchProfiles } from "@lens-protocol/react-web"

function SearchProfiles() {
 const { data, loading } = useSearchProfiles({ query: 'web3'})
```



## Reference

### `useSearchPublications(args)`

### Parameters

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

`query: string` (required)

- The query that will be used to search profiles

### Returns

```typescript
{
  data: ProfileFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more profiles after the current batch
  next(): () => void, // fetches the next profiles and appends to the data
}
```