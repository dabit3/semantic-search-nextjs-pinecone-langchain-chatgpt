---
title: "useFollow"
slug: "use-follow"
hidden: false
createdAt: "2023-01-05T16:18:01.001Z"
updatedAt: "2023-03-20T07:14:04.549Z"
---
`useFollow` is a React Hook that lets you follow a profile.

```typescript
const { execute, error, isPending } = useFollow({ followee, follower });
```



## Usage

```typescript
import { ProfileFragment, useFollow } from '@lens-protocol/react-web';

type ProfileFollowProps = {
  profile: ProfileFragment;
};

export function FollowProfile({ profile }: ProfileFollowProps) {
  const { execute: follow, error, isPending } = useFollow({ profile });

  if (profile.isFollowedByMe) {
    return <p>Following</p>;
  }
  
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <button onClick={follow} disabled={isPending}>
      {isPending ? 'Follow in progress...' : 'Follow'}
    </button>
  );
}

```



## Reference

### `useFollow()`

Call `useFollow` where your follow button markup is and provide the profile that you would like to follow.

```typescript
type ProfileFollowProps = {
  followee: ProfileFragment;
  follower: ProfileOwnedByMeFragment;
};

function FollowProfile({ followee, follower }: ProfileFollowProps) {
  const { execute, isPending } = useFollow({ followee, follower });
  // ...
}
```



#### Parameters

- `followee: ProfileFragment`: the profile you wish to follow
- `follower: ProfileOwnedByMeFragment`: one of the profile owned by the authenticated wallet as returned by `useActiveProfile` for example (or you can use the `isProfileOwnedByMe` helper to narrow down the type correctly from a `ProfileFragment` instance).

#### Returns

- `execute` an async function that returns void used to follow a profile on button click
- `error` any error that might occur in normal operating conditions will be returned via this property. Possible values are:
  - `InsufficientAllowanceError`: the `followee` follow policy requires an ERC20 fee to be paid. The corresponding follow module contract address (i.e. the spender) is not authorized in the specific ERC20 contract to transact for the requested amount in behalf of the authenticated wallet address. You can use the `useApproveModule` hook to increase the allowance. You can see a working example of `useApproveModule`  in the Lens SDK monorepo [here](https://github.com/lens-protocol/lens-sdk/blob/main/examples/web-wagmi/src/misc/UseApproveModule.tsx).  
    Once done, you can retry this operation.
  - `InsufficientFundsError`: the `followee` follow policy requires an ERC20 fee to be paid. The authenticated wallet address does not hold enough amount of the specific ERC20 to perform the operation. Use this error together with the `followee.amount: Amount<Erc20>` to communicate to the user what token they need to source in order to complete the operation. 
  - `PrematureFollowError`: there is a pending unfollow request for the same `followee` profile that is not finalized yet. You can use the `followee.followStatus.canFollow` to eagerly determine if the operation is available so to not have to incur into this error (e.g. you can show an alert to the user if they prematurely try to follow again the same profile).
  - `PendingSigningRequestError | UserRejectedError | WalletConnectionError`: see [Error handling](doc:error-handling#generic-local-errors)
- `isPending` a boolean flag that informs you if a follow request for the given `followee` by the provided `follower` is in progress.

### `execute` function

The `execute` function returned by `useFollow` allows you to programmatically follow a profile, usually in a on click handler of a button. It takes no parameters.

#### Parameters

`execute` takes no parameters (the required data is supplied to `useFollow` directly for state management consistency reasons).