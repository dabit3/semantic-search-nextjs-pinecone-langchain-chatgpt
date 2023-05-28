---
title: "useReaction"
slug: "use-reaction"
hidden: false
createdAt: "2023-01-05T10:32:36.600Z"
updatedAt: "2023-03-20T06:55:34.248Z"
---
`useReaction` is a React Hook that lets you react to a publication. The only reaction type supported currently is `UPVOTE`. With `useReaction` hook you can add, remove reaction or check if a publication has a reaction. 

```typescript
const { addReaction, removeReaction, hasReaction, isPending, error } = useReaction(args);
```



## Usage

`useReaction` hook requires a `profileId` and later a `publication` object. It is important to provide `observerId` when querying for publication to know if the observer profile has reacted to that publication. See the example below:

```typescript
import {
  ReactionType,
  usePublication,
  useReaction,
} from '@lens-protocol/react-web';

function Component({ profile }) {
  const { data: publication, loading } = usePublication({
    publicationId: '0x1b-0x0118',
    observerId: profile.id, // important!
  });
  
  const { addReaction, removeReaction, hasReaction, isPending, error } = useReaction({
    profileId: profile.id,
  });
  
  const reactionType = ReactionType.UPVOTE;
  
  if (loading) return <Loading />;

  const hasReactionType = hasReaction({
    reactionType,
    publication,
  });

  const toggleReaction = async () => {
    if (hasReactionType) {
      await removeReaction({
        reactionType,
        publication,
      });
    } else {
      await addReaction({
        reactionType,
        publication,
      });
    }
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      <button onClick={toggleReaction} disabled={isPending}>
        {hasReactionType ? `Remove ${reactionType}` : `Add ${reactionType}`}
      </button>
    </>
  );
}
```



## Reference

### `useReaction(args)`

#### Parameters

- `profileId: string` this is the profile that will be reacting to a publication(s) and is the observer provided in `usePublication` as an `observerId`.

#### Returns

Returns an object with:

- `addReaction`: a function you can use to add a new reaction.
- `removeReaction`: a function you can use to remove an existing reaction.
- `hasReaction`: a function you can use to check if a publication has already a reaction from a profile 
- `isPending`: a boolean notifying you if any of the operations is in progress.
- `error`: any error that might occur in normal operating conditions will be returned via this property.

### `addReaction` function

You can use the `addReaction` function to add a new reaction.

#### Parameters

- `reactionType: ReactionType` type of reaction to be added, currently, there is only one reaction supported, `ReactionType.UPVOTE`, but we plan to offer more in the future.
- `publication: PublicationFragment` this is a publication returned from any publication query

#### Returns

- `Promise<void>`

### `removeReaction` function

You can use the `removeReaction` function to remove an existing reaction. Make sure that reaction exists before removing it. You can use `hasReaction` function for that.

#### Parameters

- `reactionType: ReactionType` type of reaction to be removed, currently, there is only one reaction supported, `ReactionType.UPVOTE`, but we plan to offer more in the future.
- `publication: PublicationFragment` this is a publication returned from any publication query

#### Returns

- `Promise<void>`

### `hasReaction` function

You can use the `hasReaction` function to check if a publication has already a reaction from a profile provided as an argument to the hook.

#### Parameters

- `reactionType: ReactionType` type of reaction to be checked.
- `publication: PublicationFragment` this is a publication returned from any publication query

#### Returns

- `boolean`