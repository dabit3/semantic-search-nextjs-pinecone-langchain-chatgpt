---
title: "useCreateComment"
slug: "use-create-comment"
hidden: false
createdAt: "2023-01-03T08:16:54.012Z"
updatedAt: "2023-05-10T07:58:43.818Z"
---
`useCreateComment` is a React Hook that lets you create a comment to a publication using a Profile you own.

```typescript
const { execute, error, isPending } = useCreateComment({ profile, upload });
```

## Usage

Define an `upload` function that conforms to the signature:

```typescript upload.ts
export const upload = (data: unknown): Promise<string> => {
  const serialized = JSON.stringify(data);
  
  const url = // upload serialized to a public location
        
  return url;
}
```

> 📘 Looking for an inspiration?
> 
> Check the [web-wagmi](https://github.com/lens-protocol/lens-sdk/tree/main/examples/web-wagmi) example in the Lens SDK monorepo. There is an example `upload` function that uses [Bundlr](https://github.com/Bundlr-Network) to upload the file to Aerwave.

You can then wire the `useCreateComment` into your _composer_ component:

```typescript
import { ContentFocus, CollectPolicyType, ProfileOwnedByMe, ReferencePolicy, useCreateComment } from '@lens-protocol/react';
import { upload } from './upload'

function Composer({ profile, publicationId }: { profile: ProfileOwnedByMe, publicationId: string ) {
  const { execute: create, error, isPending  } = useCreateComment({ profile, upload });

  const onSubmit = async (content: string) => {
    await create({
      publicationId,
      content,
      profileId: profile.id,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
      collect: {
        type: CollectPolicyType.NO_COLLECT
      },
      reference: {
        type: ReferencePolicy.ANYBODY
      }
    });
  };
  // ...
}
```

You can then pass the `onSubmit` handler to your form

## Reference

### `useCreateComment(args)`

Call `useCreateComment` in the component responsible for submitting the user's input.

```typescript
function Composer({ profile }) {
  const { create, error?, isPending  } = useCreateComment({ profile, upload });
  // ...
}
```

#### Parameters

- `upload` the user-defined upload function. Must conform to the `(data: unknown) => Promise<string>` signature. It receives a JS Object (safe for serialization) and should return the public URL where the JSON file has been saved. The file must be served as `Content-Type: application/json`. It's the function's responsibility to serialize, upload and return the file URL.
- `profile`This is the author profile of the new comment. It must be a profile owned by the authenticated `Signer` (see [useWalletLogin](doc:use-wallet-login)). You can retrieve the currently active profile via the [`useActiveProfile`](doc:use-active-profile) hook.

#### Returns

Returns an object with:

- `execute`: a function you can use to initiate the creation of a new comment.
- `isPending`: a boolean notifying you when the operation is still in progress.
- **Optional** `error`: any error that might occur in normal operating conditions will be returned via this property.

### `execute` function

You can use the `execute` function to initiate the process that leads to a new comment.

#### Parameters

It accepts a complex object with all the required configurations. The TS definition will help you to know what configuration to provide and when.

```typescript
{
  publicationId: string
  profileId: string,
  content?: string,
  contentFocus: ContentFocus,
  locale: string,
  collect: CollectPolicy,
  reference: ReferencePolicy
}
```

where `publicationId` is an id to a publication the comment should be assigned to.

where `locale` is a subset of the Locale Identifiers specification. See the full specification [here](https://docs.lens.xyz/docs/metadata-standards#locale---required).

> 📘 Pro tip
> 
> Use the TypeScript definition to navigate the possible values for each field and subfields. The type definition provided will guide you through the dependency rules of the [Lens Publication Metadata v2](https://docs.lens.xyz/docs/metadata-standards#metadata-structure) so you don't have to know them.

#### Returns

It returns a `Promise<void>` that you can use to sync with the state of your component. For example, you can clear the content of any text input field when such Promise resolves.