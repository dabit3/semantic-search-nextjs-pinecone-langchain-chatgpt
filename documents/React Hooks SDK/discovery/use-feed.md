---
title: "useFeed"
slug: "use-feed"
hidden: false
createdAt: "2022-12-23T16:50:51.237Z"
updatedAt: "2023-03-20T07:10:54.690Z"
---
`useFeed` is a React Hook that lets you fetch the feed of a given profile.

```typescript
const { data, loading, hasMore, next } = useFeed(args)
```



## Usage

```typescript TypeScript
import { useFeed } from '@lens-protocol/react-web';

function Feed() {
const {
    data: feedItems,
    loading,
    hasMore,
    next,
  } = useFeed({
    profileId: '0x02',
    limit: 10,
  });
}
```



## Reference

### `useFeed(args)`

### Parameters

- `profileId: string` (required) - the id of the profile to fetch the feed for
- `observerId: string` (optional) - the id of the profile who is running the query, usually the logged-in/active profile
- `limit: number` (optional) - the amount of items to return per page. This is performed in a best effort fashion. The API might return slightly less items than requests. This does not mean the list reached the end of the data available. Use the `hasMore` returned flag to determine if more items are available in the following page of results.
- `metadataFilter: PublicationMetadataFilters` (optional) - Any optional [metadata](https://docs.lens.xyz/docs/use-publications#publicationmetadatafilters) to filter publications by.

### Returns

```typescript
{
  data: FeedItemFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more publications after the current batch
  next(): () => void, // fetches the next publications and appends to the data
}
```