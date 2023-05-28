---
title: "useWhoMirroredPublication"
slug: "use-who-mirrored-publication"
hidden: false
createdAt: "2023-01-25T01:38:35.366Z"
updatedAt: "2023-03-20T06:55:25.617Z"
---
`useWhoMirroredPublication` is a React hook that allows you to query for profiles that mirrored a publication.

```typescript
const { data, loading, hasMore, next } = useWhoMirroredPublication(args)
```



## Usage

```typescript TypeScript
import { useWhoMirroredPublication } from '@lens-protocol/react-web';

function WhoMirroredPublication() {
  const {
    data,
    loading,
    hasMore,
    next,
  } = useWhoMirroredPublication({
    publicationId: '0x1b-0x0118',
    limit: 10,
  });
}
```



## Reference

### `useWhoMirroredPublication(args)`

#### Parameters

- `publicationId` (required)

The id of the publication to fetch mirroring profiles for.

- `observerId` (optional)

The id of the profile who is running the query, usually the logged in/active profile.

- `limit: number` (optional)

The amount of items to return.

#### Returns

```typescript
{
  data: ProfileFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more results after the current batch
  next(): () => void, // fetches the next batch and appends to the data
}
```