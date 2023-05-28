---
title: "useProfilePublicationRevenue"
slug: "use-profile-publication-revenue"
hidden: false
createdAt: "2023-01-18T16:29:08.854Z"
updatedAt: "2023-03-20T07:32:00.102Z"
---
`usePublicationRevenue` is a React hook used to query publications by a profile that have earned revenue.

```typescript
const { data, loading, hasMore, next } = useProfilePublicationRevenue(args)
```



## Usage

```typescript TypeScript
import { usePublicationRevenue } from '@lens-protocol/react-web';

function PublicationRevenue() {
  const { data: profilePublicationRevenue, loading } = useProfilePublicationRevenue({
    profileId: '0x4f90-0x02',
  });
  
  if (loading) return 'Loading...';

  return (
  	<div>
      {profilePublicationRevenue.map(publicationRevenue => (
        <article>
          <p>
            {publicationRevenue.publication.profile.name ?? `@${publicationRevenue.publication.profile.handle}`}
          </p>

          <p>{publicationRevenue.publication.metadata.content}</p>

          <p>{`Currency: ${publicationRevenue.revenue.total.asset.name}`}</p>
          <p>{`Symbol: ${publicationRevenue.revenue.total.asset.symbol}`}</p>
          <p>{`Amount: ${publicationRevenue.revenue.total.value}`}</p>
        </article>
      )}
    </div>
  );
}
```



## Reference

### `useProfilePublicationRevenue(args)`

### Parameters

`profileId: string` (required)

- The id of the profile that posted the revenue earning publications

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

`publicationTypes: PublicationTypes[]` (optional)

- the types of publications to query

`sources: Source[]` (optional)

- type sources of publications to query

#### Returns

```typescript
{
  data: PublicationRevenueFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more results after the current batch
  next(): () => void // fetches the next batch and appends to the data
}
```



### `PublicationRevenueFragment`

```typescript
{
  publication: PublicationFragment,
  revenue: RevenueAggregate
}
```