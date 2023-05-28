---
title: "useUnfollow"
slug: "use-unfollow"
hidden: false
createdAt: "2023-01-13T14:15:39.567Z"
updatedAt: "2023-03-20T07:13:47.318Z"
---
`useUnfollow` is a React Hook that lets you unfollow a profile.

```typescript
const { execute, error, isPending } = useUnfollow();
```



## Usage

```typescript
import { ProfileFragment, useUnfollow } from '@lens-protocol/react-web';

type ProfileUnfollowProps = {
  profile: ProfileFragment;
};

export function UnfollowProfile({ profile }: ProfileUnfollowProps) {
  const { execute: unfollow, isPending } = useUnfollow({ profile });

  if (!profile.isFollowedByMe) {
    return null;
  }

  return (
    <button onClick={unfollow} disabled={isPending}>
      {isPending ? 'Unfollowing...' : 'Unfollow'}
    </button>
  );
}

```



## Reference

### `useUnfollow()`

Call `useUnfollow` where your unfollow button markup is and provide the profile that you would like to unfollow.

```typescript
type ProfileUnfollowProps = {
  profile: ProfileFragment;
};

export function UnfollowProfile({ profile }: ProfileUnfollowProps) {
  const { unfollow, isPending } = useUnfollow({ profile });
  // ...
}
```



#### Parameters

- `profile: ProfileFragment`: the profile you wish to unfollow

#### Returns

- `unfollow` an async function that returns void used to unfollow a profile on button click
- `isPending` a boolean flag that informs you if an unfollow is in progress

### `execute` function

The `execute` function returned by `useUnfollow` allows you to programmatically unfollow a profile, usually in a on click handler of a button. It takes no parameters.

#### Parameters

`execute` takes no parameters (the profile is supplied to `useUnfollow` directly)