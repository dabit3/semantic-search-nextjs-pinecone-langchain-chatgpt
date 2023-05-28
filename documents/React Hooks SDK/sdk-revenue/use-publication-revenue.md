---
title: "usePublicationRevenue"
slug: "use-publication-revenue"
hidden: false
createdAt: "2023-01-16T10:35:41.135Z"
updatedAt: "2023-03-20T07:31:52.198Z"
---
`usePublicationRevenue` is a React hook used to query the revenue from a publication. 

```typescript
const { data: publicationRevenue, loading } = usePublicationRevenue(args)
```



## Usage

```typescript TypeScript
import { usePublicationRevenue } from '@lens-protocol/react-web';

function PublicationRevenue() {
  const { data: revenue, loading } = usePublicationRevenue({
    publicationId: '0x4f90-0x02',
  });
  
  if (loading) return 'Loading...';

  return (
    <article>
      <p>{`Currency: ${revenue.total.asset.name}`}</p>
      <p>{`Symbol: ${revenue.total.asset.symbol}`}</p>
      <p>{`Amount: ${revenue.total.value}`}</p>
    </article>
  );
}
```



## Reference

### `usePublicationRevenue(args)`

### Parameters

- `publicationId` (required)

The id of the publication for which to query the revenue

### Returns

```typescript
{
  data: RevenueAggregateFragment[],
  loading: boolean
}
```