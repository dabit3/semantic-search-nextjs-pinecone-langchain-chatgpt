---
title: "useProfileFollowRevenue"
slug: "use-profile-follow-revenue"
hidden: false
createdAt: "2023-01-13T14:34:45.832Z"
updatedAt: "2023-03-20T07:31:56.189Z"
---
`useProfileFollowRevenue` is a React hook used to query the revenue a profile has generated through their paid follow module. 

```typescript
const { data, loading } = useProfileFollowRevenue(args)
```



## Usage

```typescript TypeScript
import { useProfileFollowRevenue } from '@lens-protocol/react-web';

export function ProfileFollowRevenue({ profileId }: { profileId: string }) {
  const { data, loading } = useProfileFollowRevenue({
    profileId,
  });
  // ...
}
```



## Reference

### `useProfileFollowRevenue(args)`

### Parameters

- `profileId` (required)

The id of the profile of which to query the follow revenue

### Returns

```typescript
{
  data: RevenueAggregateFragment[],
  loading: boolean
}
```