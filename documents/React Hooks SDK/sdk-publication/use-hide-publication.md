---
title: "useHidePublication"
slug: "use-hide-publication"
hidden: false
createdAt: "2023-01-18T12:05:34.988Z"
updatedAt: "2023-03-20T06:56:03.122Z"
---
`useHidePublication` is a React hook that allows you to hide a publication an active profile owns.

```typescript
const { hide, isPending } = useHidePublication();
```



> 📘 Important to know
> 
> Once you publish something on-chain you can not remove it. 
> 
> Hiding publication only hides it from the API's storage, it **does not** do anything on-chain.
> 
> This is just a nice way to allow users to "delete" publication by hiding content and media which was uploaded for it. 
> 
> You must own the publication to hide it, if you want to report someone else publication there is a separarate hook called `[useReportPublication](https://docs.lens.xyz/docs/use-report-publication)`.
> 
> Refer to the API documention to get more information about how hiding works: <https://docs.lens.xyz/docs/hide-publication>

## Usage

```typescript
import {
  PublicationFragment,
  useHidePublication,
  isPublicationOwnedByMe,
} from '@lens-protocol/react-web';

type HidePublicationProps = {
  publication: PublicationFragment;
};

export function HidePublication({ publication }: HidePublicationProps) {
  const { hide, isPending } = useHidePublication();

  if (!isPublicationOwnedByMe(publication)) {
    return <p>Can't hide publication that's not owned by you</p>;
  }

  return (
    <button
      onClick={async () => await hide(publication)}
      disabled={isPending || publication.hidden}
    >
      Hide
    </button>
  );
}
```



## Reference

### `useHidePublication()`

#### Returns

The hook returns an object with:

- `hide`: a function you can use to hide a publication.
- `isPending`: a boolean indicating whether the operation is still in progress.

### `hide(request: HidePublicationRequest)` function

You can use the `hide` function to hide a publication.

#### Parameters

- `request: HidePublicationRequest` read below for details

#### Returns

- `Promise<void>`

### HidePublicationRequest

This is an object that contains the following properties:

- `publication: PublicationOwnedByMeFragment`: the publication to hide