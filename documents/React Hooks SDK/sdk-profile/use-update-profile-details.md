---
title: "useUpdateProfileDetails"
slug: "use-update-profile-details"
hidden: false
createdAt: "2023-01-30T09:37:21.117Z"
updatedAt: "2023-03-20T07:12:56.052Z"
---
`useUpdateProfileDetails` is a React Hook that lets the active user update their profile details like name, bio, coverPicture and other custom attributes.

```typescript TypeScript
const { execute, error, isPending } = useUpdateProfileDetails({ profile, upload });

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



You can then wire the `useUpdateProfileDetails` into your component:

```typescript TypeScript
import {
  ProfileFragment,
  useUpdateProfileDetails,
} from '@lens-protocol/react-web';

function UpdateProfileDetails({ profile }: { profile: ProfileFragment }) {
  const { execute: update, error, isPending } = useUpdateProfileDetails({
    profile,
    upload
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string | null;
    const attributes = {
      location: (formData.get('location') as string | null) || null,
      website: (formData.get('website') as string | null) || null,
    };
    await update({ name, bio, attributes });
  }
  
  // ...
}
```



You can then pass the `onSubmit` handler to your form.

## Reference

### `useUpdateProfileDetails(args)`

#### Parameters

- `profile: ProfileFragment` active profile whose details you want to update.
- `upload` the user-defined upload function. Must conform to the `(data: unknown) => Promise<string>` signature. It receives a JS Object (safe for serialization) and should return the public URL where the JSON file has been saved. The file must be served as `Content-Type: application/json`. It's the function's responsibility to serialize, upload and return the file URL.

#### Returns

Returns an object with:

- `update`: a function you can use to update the profile details.
- `isPending`: a boolean notifying you if the operation is in progress.
- `error`: any error that might occur in normal operating conditions will be returned via this property.

### `execute(details: ProfileDetails)` function

You can use the `execute` function to update profile details.

#### Parameters

- `details: ProfileDetails` 

```typescript
type ProfileDetails = {
  name: string;  
  bio?: string | null;
  coverPicture?: string | null;
  attributes?: PartialAttributesUpdate;
};
```



#### Returns

- `Promise<void>`