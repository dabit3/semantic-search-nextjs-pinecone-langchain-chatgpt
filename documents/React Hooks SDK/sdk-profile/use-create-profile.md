---
title: "useCreateProfile"
slug: "use-create-profile"
excerpt: "`useCreateProfile` is a React Hook that lets you create a new Lens Profile owned by the connected wallet."
hidden: false
createdAt: "2023-01-16T10:40:30.183Z"
updatedAt: "2023-03-20T07:04:10.122Z"
---
> 🚧 Testnet only
> 
> Lens Protocol is currently gated and will be opening up soon for anyone to mint a profile, for now only Testnet allows `useCreateProfile` to work.

```typescript
const { execute, error, isPending } = useCreateProfile();
```



## Usage

Call `useCreateProfile` in the component responsible to accept the desired handle.

```
import { isValidHandle, useCreateProfile } from '@lens-protocol/react-web';


const [handle, setHandle] = useState<string | null>(null);

const { execute: create, error, isPending } = useCreateProfile();

const onSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!handle) return;
  await create(handle);
};
```



```html JSX
<form onSubmit={onSubmit}>
  <input
    minLength={5}
    maxLength={31}
    required
    type="text"
    disabled={isPending}
    onChange={(e) => {
      if (isValidHandle(e.target.value)) {
        setHandle(e.target.value);
      } else {
        setHandle(null);
      }
    }}
  />
  
  <button type="submit">Create</button>
</form>
```



> 🚧 
> 
> `isValidHandle` is available from 0.3.x onward.

## Reference

### `useCreateprofile`

#### Parameters

`useCreateProfile` does not take any parameters.

#### Returns

Returns an object with:

- `execute`: a function you can use to initiate the creation of a new Lens Profile.
- `isPending`: a boolean notifying you when the operation is still in progress.
- `error`: any error that might occur in normal operation conditions will be returned via this property. Default value `null`
  - `DuplicatedHandleError` - the provided handle has already been taken

### `execute` function

You can use the `execute` function to initiate the profile creation process. Depending on the network conditions, this might take a while as the hook waits for the operation to be executed and indexed by the Lens API.

#### Parameters

It accepts a string with the desired handle. The handle should not contain the `.test` suffix (nor the `.lens` for the Lens Protocol main-net deployment).

#### Returns

It returns a `Promise<void>` that you can use to sync with the state of your component. For example you can clear the content of any text input field when such promise resolves.