---
title: "useCollectedPublications"
slug: "use-collected-publications"
hidden: false
createdAt: "2022-12-23T16:29:16.717Z"
updatedAt: "2023-03-20T06:55:09.608Z"
---
`useCollectedPublications` is a React Hook that lets you query for all publications collected by a wallet address.

```typescript
const { data, loading, hasMore, next } = useCollectedPublications(args)
```



## Usage

```typescript TypeScript
import { useCollectedPublications } from '@lens-protocol/react-web';

function CollectedPublications() {
const {
    data: collectedPublications,
    loading,
    hasMore,
    next,
  } = useCollectedPublications({ walletAddress: '0x42a578e3557f5854B27D48E7d753fEb2f428546D' });
}
```



## Reference

### `useCollectedPublications(args)`

### Parameters

`walletAddress: string` (required)

- The wallet address that has collected the publications

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: PublicationFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more publications after the current batch
  next(): () => void, // fetches the next publications and appends to the data
}
```