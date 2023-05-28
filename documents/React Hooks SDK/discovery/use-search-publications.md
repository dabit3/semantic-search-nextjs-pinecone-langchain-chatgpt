---
title: "useSearchPublications"
slug: "use-search-publications"
hidden: false
createdAt: "2023-01-12T07:21:37.816Z"
updatedAt: "2023-03-20T07:14:58.482Z"
---
`useSearchPublications` is a React Hook used to query Lens publications based on a query. 

```typescript
const { data, loading, hasMore, next } = useSearchPublications(args)
```



## Usage

```typescript TypeScript
import { useSearchPublications } from "@lens-protocol/react-web"

function SearchPublications() {
  const { data, loading } = useSearchPublications({ query: 'web3'})
 }
```



## Reference

### `useSearchPublications(args)`

### Parameters

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

`query: string` (required)

- The query that will be used to search publications

`sortCriteria: PublicationSortCriteria` (optional)

- the criteria for sorting the result

`publicationTypes: PublicationTypes[]` (optional)

- the types of publications to query

### Returns

```typescript
{
  data: Publication,
  loading: boolean,
  hasMore: boolean, // whether there are more profiles after the current batch
  next(): () => void, // fetches the next profiles and appends to the data
}
```