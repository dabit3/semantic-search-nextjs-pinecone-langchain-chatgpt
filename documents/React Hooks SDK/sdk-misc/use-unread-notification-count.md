---
title: "useUnreadNotificationCount"
slug: "use-unread-notification-count"
hidden: false
createdAt: "2022-12-23T16:10:24.213Z"
updatedAt: "2023-03-20T07:31:27.905Z"
---
`useUnreadNotificationsCount` is a React Hook that let you know the number of unread notifications.

```typescript
const { unreadNotificationCount, loading, clear } = useUnreadNotificationCount({ profileId })
```



## Usage

```typescript
import { useUnreadNotificationCount } from '@lens-protocol/react-web';


function NotificationsCount({ profileId }: { profileId: string }) {
  const { unreadNotificationCount, loading, clear } = useUnreadNotificationCount({ profileId })
  
  if (loading) return null;

  return (
    <div>
     <p>You have {unreadNotificationCount} unread notifications</p>
     <button onClick={clear}>Clear</button>
    </div>
  )
}
```



## Reference

### `useUnreadNotificationCount(args)`

```typescript
const { unreadNotificationCount, loading, clear } = useUnreadNotificationCount({ profileId });
```



#### Parameters

- `profileId: string` the profile Id you are interested in.

#### Returns

```typescript
{
  unreadNotificationCount: number;
  loading: boolean; // whether unreadNotificationCount is readable or not
  clear: () => Promise<void>; // function to clear the counter
}
```