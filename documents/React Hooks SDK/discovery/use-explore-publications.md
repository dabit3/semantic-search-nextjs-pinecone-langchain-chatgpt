---
title: "useExplorePublications"
slug: "use-explore-publications"
hidden: false
createdAt: "2023-01-13T14:48:20.781Z"
updatedAt: "2023-04-11T19:50:49.451Z"
---
`useExplorePublications` is a React Hook used to explore different publications on Lens Protocol from a variety of people that you may not yet follow. 

```typescript
const { data, loading, hasMore, next } = useExplorePublications(args)
```



## Usage

```typescript TypeScript
import { useExplorePublications } from '@lens-protocol/react-web';

function useExplorePublications() {
	const { data, loading, hasMore, next } = useExplorePublications();
}
```



## Reference

### `useExplorePublications(args)`

### Parameters

`observerId: string` (optional)

- The id of the profile that is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

`metadataFilter: PublicationMetadataFilters` (optional)

- Any optional [metadata](https://docs.lens.xyz/docs/use-publications#publicationmetadatafilters) to filter publications by

### Returns

```typescript
{
  data: PublicationFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more publications after the current batch
  next(): () => void, // fetches the next publications and appends to the data
}
```