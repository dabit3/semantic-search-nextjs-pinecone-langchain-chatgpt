---
title: "Self-funded transactions"
slug: "self-funded-transactions"
excerpt: "How to use user's wallet to pay gas as fallback for a rejected operation"
hidden: true
createdAt: "2023-05-26T12:49:35.672Z"
updatedAt: "2023-05-26T14:28:37.681Z"
---
[quick intro to let reader recognize the situation, error details, etc.]

We are going to use `useFollow` in our example here but bear in mind it works the same exact way for:

- `useCreatePost`
- `useCreateComment`
- `useCreateMirror`
- `useCollect`
- ...

We are going to compose the `useFollow` hook with the `useSelfFundedFallback` hook into a new React hook. This new hook will encapsulate how we intend to communicate and handle the rejection scenario.

```typescript useFollowWithSelfFundedFallback.tsx
import { FollowOperation, Profile, ProfileOwnedByMe, SelfFundedOperation, supportsSelfFundedFallback, useFollow, useSelfFundedFallback } from '@lens-protocol/react-web';

type UseFollowWithSelfFundedFallbackArgs = {
  followee: Profile;
  follower: ProfileOwnedByMe;
}

type PossibleError = FollowOperation['error'] | SelfFundedOperation['error']

export function useFollowWithSelfFundedFallback({ followee, follower }: UseFollowWithSelfFundedFallbackArgs) {
  const [error, setError] = useState<PossibleError>(undefined);
  const { execute: subsidize, error: subsidizedError, isPending: isSubsidizedPending } = useFollow({ followee, follower });

  const { execute: selfFund, error: selfFundedError, isPending: isSelfFundedPending } = useSelfFundedFallback();
  
  const execute = async () => {
    // it won't ask to sign if can be performed via proxy-action
    const result = await subsidize();

    // did the gasless request fail?
    if (result.isFailure()) {
      
      // was it rejected? is there an fallback?
      if (supportsSelfFundedFallback(result.error)) {

        // ask your confirmation before using their funds
        const shouldPayFor = window.confirm(
          'It was not possible to cover the gas costs at this time.\n\n' +
          'Do you wish to continue with your MATIC?'
        );

        if (shouldPayFor) {
          // initiate self-funded, will require signature
        	await selfFund(result.error.fallback);
        }
        return;
      }
      // other result.error handling as needed
    }
  };
  
  return {
    execute,
    error,
    isPending: isSubsidizedPending || isSelfFundedPending,
  }
}
```

### What's happening?

[list]

Now we can take our `FollowButton` and replace `useFollow` with our newly create hook. Job done!

```typescript FollowButton.tsx
import { Profile, ProfileOwnedByMe  } from '@lens-protocol/react-web';

import { useFollowWithSelfFundedFallback } from './useFollowWithSelfFundedFallback';

type FollowButtonProps = {
  followee: Profile;
  follower: ProfileOwnedByMe;
}

export function FollowButton({ followee, follower }: FollowButtonProps) {
  const { execute: follow, error, isPending } = useFollowWithSelfFundedFallback({ followee, follower });
  
  return (
    <>
      <button disabled={!followee.followStatus.canFollow || isPending} onClick={follow}>
        Follow
      </button>
         
      {error && <small>{error.message}</small>}
    </>
  );
}
```

[notes about example shortcut and link to Follow a profile guide to more details]