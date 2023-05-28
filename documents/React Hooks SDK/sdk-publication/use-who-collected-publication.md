---
title: "useWhoCollectedPublication"
slug: "use-who-collected-publication"
hidden: false
createdAt: "2023-01-18T16:14:45.209Z"
updatedAt: "2023-03-20T06:55:18.650Z"
---
`useWhoCollectedPublication` is a React hook that allows you to query for wallets and their profiles that collected a publication.

```typescript
const { data, loading, hasMore, next } = useWhoCollectedPublication(args)
```



## Usage

```typescript TypeScript
import { useWhoCollectedPublication } from '@lens-protocol/react-web';

const WhoCollectedPublication() {
 	const {
    data,
    loading,
    hasMore
    next,
  } = useWhoCollectedPublication({
    publicationId: '0x1b-0x0118',
    limit: 10,
  });
}
```



## Reference

### `useWhoCollectedPublication(args)`

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
  data: WalletFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more results after the current batch
  next(): () => void, // fetches the next batch and appends to the data
}
```



### `WalletFragment`

```typescript
{
  address: string,  
  defaultProfile: ProfileFragment
}
```