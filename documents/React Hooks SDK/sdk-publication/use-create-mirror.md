---
title: "useCreateMirror"
slug: "use-create-mirror"
hidden: false
createdAt: "2023-01-12T14:44:25.973Z"
updatedAt: "2023-03-20T06:56:49.757Z"
---
`useCreateMirror` is a React Hook that lets you create a mirror to a publication using a Profile you own.

> 📘 Don't know what a `mirror` is?
> 
> Refer to the Lens Protocol documentation for [mirror](https://docs.lens.xyz/docs/mirror).

> 👍 Good to know
> 
> Mirroring a mirror under the hood get's the orignal publication and applies the operation. Although Lens API (or smart contracts) allow to mirror a mirror, SDK is more strict and only post and comment can be mirrored.

```typescript
const { execute, error, isPending } = useCreateMirror();
```



## Usage

Call the `create` method from your event handler (quite likely attached to some `button`).

> 🐛 Remember to gracefully handle errors
> 
> Don't just ignore the `error` returned from the `useCreateMirror` hook. These are a valid scenarios that can happen to your user while using your app.

```typescript
import {
  CommentFragment,
  PostFragment,
  ProfileFragment,
  ReferencePolicy,
  useCreateMirror,
} from '@lens-protocol/react-web';

type MirrorButtonProps = {
  publication: PostFragment | CommentFragment;
  profile: ProfileFragment;
};

function MirrorButton({ publication, profile }: MirrorButtonProps) {
  const { execute: create, isPending, error } = useCreateMirror();

  const isMirroredByMe = publication.isOptimisticMirroredByMe || publication.mirrors.length > 0;

  return (
    <div>
      <button
        onClick={() =>
          create({
            publication,
            profile,
            reference: ReferencePolicy.ANYBODY,
          })
        }
        disabled={isPending || isMirroredByMe}
      >
        Mirror
      </button>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

```



## Reference

### `useCreateMirror()`

#### Parameters

The `useCreateMirror` hook has no parameters.

#### Returns

Returns an object with:

- `execute`: a function you can use to initiate the creation of a new comment.
- `isPending`: a boolean notifying you when the operation is still in progress.
- **Optional** `error`: any error that might occur in normal operating conditions will be returned via this property.

### `execute` function

You can use the `execute` function to initiate the process that leads to a new mirror.

#### Parameters

It accepts a complex object with all the required configurations. The TS definition will help you to know what configuration to provide and when.

```typescript
{
  publication: PostFragment | CommentFragment,
  profile: ProfileFragment,
  reference: ReferencePolicy,
}
```



#### Returns

It returns a `Promise<void>` that you can use to sync with the state of your component. For example, you can clear the content of any text input field when such Promise resolves.