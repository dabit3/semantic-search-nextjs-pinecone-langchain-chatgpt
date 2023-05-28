---
title: "useWhoReacted"
slug: "use-who-reacted"
hidden: false
createdAt: "2023-01-06T10:16:42.967Z"
updatedAt: "2023-03-20T06:55:40.487Z"
---
`useWhoReacted` is a React hook that allows you to query for profiles that reacted to a publication.

```typescript
const { data, loading, hasMore, next } = useWhoReacted(args)
```



## Usage

```typescript TypeScript
import { useWhoReacted } from '@lens-protocol/react-web';

function WhoReacted() {
  const {
    data,
    loading,
    hasMore,
    next,
  } = useWhoReacted({
    publicationId: '0x1b-0x0118',
    limit: 10,
  });
}
```



## Reference

### `useWhoReacted(args)`

#### Parameters

- `publicationId` (required)

The id of the publication to fetch reactions for.

- `observerId` (optional)

The id of the profile who is running the query, usually the logged in/active profile.

- `limit: number` (optional)

The amount of items to return.

#### Returns

```typescript
{
  data: WhoReactedResultFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more results after the current batch
  next(): () => void, // fetches the next batch and appends to the data
}
```



### `WhoReactedResultFragment`

```typescript
{
  reactionId: string,  
  reaction: ReactionType, // ie. ReactionType.UPVOTE
  reactionAt: string,  
  profile: ProfileFragment
}
```