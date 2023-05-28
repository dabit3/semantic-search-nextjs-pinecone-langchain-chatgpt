---
title: "useProfilePublicationsForSale"
slug: "use-profile-publications-for-sale"
hidden: false
createdAt: "2023-02-10T14:38:45.258Z"
updatedAt: "2023-03-20T06:56:09.833Z"
---
`useProfilePublicationsForSale` is a React hook used to query publications for sale by a profile.

```typescript
const { data, loading, hasMore, next } = useProfilePublicationsForSale(args)
```



## Usage

```typescript TypeScript
import { useProfilePublicationsForSale } from '@lens-protocol/react-web';

function ProfilePublicationsForSale() {
  const {
    data,
    loading,
    hasMore,
    next,
  } = useProfilePublicationsForSale({
    profileId: '0x1b-0x0118',
    observerId: '0x02',
    limit: 10,
  });
}
```



## Reference

### `useProfilePublicationsForSale(args)`

### Parameters

`profileId: string` (required)

- The id of the profile that posted the publications for sale

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: PublicationFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more results after the current batch
  next(): () => void // fetches the next batch and appends to the data
}
```