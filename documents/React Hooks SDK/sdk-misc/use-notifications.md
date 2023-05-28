---
title: "useNotifications"
slug: "use-notifications"
hidden: false
createdAt: "2022-12-23T17:06:00.737Z"
updatedAt: "2023-03-20T07:31:24.000Z"
---
`useNotifications` is a React Hook used to get all notifications for the authenticated user.

```typescript
const { data, loading, hasMore, next } = useNotifications(args)
```



## Usage

```typescript TypeScript
import { useNotifications } from '@lens-protocol/react-web';

function Notifications() {
const {
    data,
    loading,
    hasMore,
    next,
  } = useNotifications({
    profileId: '0x77-0x0149',
    limit: 10,
  });
}
```



## Reference

### `useNotifications(args)`

### Parameters

`profileId: string` (required)

- The id of the authenticated profile who is running the query.

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: Notification[],
  loading: boolean,
  hasMore: boolean, // whether there are more notifications after the current batch
  next(): () => void, // fetches the next notifications and appends to the data
}
```