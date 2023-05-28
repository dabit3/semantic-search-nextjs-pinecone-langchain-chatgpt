---
title: "useUpdateProfileImage"
slug: "use-update-profile-image"
hidden: false
createdAt: "2023-01-11T15:14:59.754Z"
updatedAt: "2023-03-20T07:13:08.545Z"
---
`useUpdateProfileImage` is a React Hook that lets the active user change their profile image.

```typescript TypeScript
const { execute, error, isPending } = useUpdateProfileImage({
  profile
});
```



## Usage

```typescript TypeScript
import {
  ProfileFragment,
  useUpdateProfileImage,
} from '@lens-protocol/react-web';

function UpdateProfileImage({ profile }: { profile: ProfileFragment }) {
  const { execute: update, error, isPending } = useUpdateProfileImage({
    profile,
  });

  const handleClick = async () => {
    const imageUrl = 'https://arweave.net/uiNDIjXbrgaSclOjgo0ia1gs9RKqY6XoUsdlqSBTKDI';
    await update(imageUrl);
  };

  return (
    <div>
      <button onClick={handleClick}>Upload a new profile image</button>

      {error && <p>{error.message}</p>}
      {isPending && <p>Updating your Lens profile's image...</p>}
    </div>
  );
}
```



## Reference

### `useUpdateProfileImage(args)`

#### Parameters

- `profile: ProfileFragment` profile whose image you want to update.

#### Returns

Returns an object with:

- `update`: a function you can use to update the profile image.
- `isPending`: a boolean notifying you if the operation is in progress.
- **Optional** `error`: any error that might occur in normal operating conditions will be returned via this property.

### `execute(fileUrl)` function

You can use the `execute` function to update profile image.

#### Parameters

- `fileUrl: string` public URL to an image file

#### Returns

- `Promise<void>`