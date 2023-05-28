---
title: "useUpdateDispatcherConfig"
slug: "use-update-dispatcher-config"
hidden: false
createdAt: "2023-01-16T10:51:21.428Z"
updatedAt: "2023-03-20T07:10:45.694Z"
---
`useUpdateDispatcherConfig` is a React Hook that lets you update a dispatcher configuration on the Profile you own.

> 👍 Reduce signing hassle
> 
> Enabling the dispatcher let's you deliver better UX to your users by removing the need for singing on the most common Lens operations.
> 
> As of now, the dispatcher works for post, comment, mirror, updating profile metadata and updating profile image. 
> 
> Read more about dispatcher in our API docs: <https://docs.lens.xyz/docs/dispatcher>

```typescript
const { update, error, isPending } = useUpdateDispatcherConfig({ profile });
```



## Usage

Call the `update` method from your event handler (quite likely attached to some `button`).

> 🐛 Remember to gracefully handle errors
> 
> Don't just ignore the error returned from the `useUpdateDispatcherConfig` hook. These are a valid scenarios that can happen to your user while using your app.

```typescript
import {
  ProfileFragment,
  useUpdateDispatcherConfig,
} from '@lens-protocol/react-web';

type UpdateDispatcherConfigButtonProps = {
  profile: ProfileFragment;
};

function UpdateDispatcherConfigButton({ profile }: UpdateDispatcherConfigButtonProps) {
  const [isEnabled, setIsEnabled] = useState(profile.dispatcher !== null);
  const { update, error, isPending } = useUpdateDispatcherConfig({ profile });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await update({ enabled: isEnabled });
  };

  return (
    <form onSubmit={submit}>
      <fieldset>
        <p>
          <label htmlFor="isEnabled">Is dispatcher enabled</label>
          <input
            id="isEnabled"
            type="checkbox"
            disabled={isPending}
            checked={isEnabled}
            onChange={() => setIsEnabled((current) => !current)}
          />
        </p>

        <button type="submit" disabled={isPending}>
          Submit
        </button>

        {error && <p>{error.message}</p>}
      </fieldset>
    </form>
  );
}
```



## Reference

### `useUpdateDispatcherConfig(args)`

Call `useUpdateDispatcherConfig` in the component responsible to update dispatcher configuration.

```typescript
function UpdateDispatcherConfigForm({ profile }) {
  const { update, error, isPending } = useUpdateDispatcherConfig({ profile });
  // ...
}
```



#### Parameters

- `profile` This is the author profile of the new comment. It must be a profile owned by the authenticated `Signer` (see [useWalletLogin](doc:use-wallet-login)). You can retrieve the currently active profile via the [`useActiveProfile`](doc:use-active-profile) hook.

#### Returns

Returns an object with:

- `update`: a function you can use to initiate the update of the dispatcher configuration.
- `isPending`: a boolean notifying you when the operation is still in progress.
- > 📘 Important to know
  > 
  > `isPending` flag for `useUpdateDispatcherConfig` behaves differently from other hook. 
  > 
  > We always try to be very optimistic about the response which works good for creating publications, mirroring, following but updating dispatcher config is different in that case.
  > 
  > Given that dispatcher configuration affects how all new transactions are processed the `useUpdateDispatcherConfig` `isPending` flag waits until the transaction was mined and processed by backend.
- `error`: any error that might occur in normal operating conditions will be returned via this property.

### `update` function

You can use the `update` function to initiate the process that leads to a new comment.

#### Parameters

It accepts a simple object with just `enabled` key that should flag if the dispatcher should be enabled or disabled.

```typescript
{
  enabled: boolean
}
```



#### Returns

It returns a `Promise<void>` that you can use to sync with the state of your component. For example, you can clear the content of any text input field when such Promise resolves.