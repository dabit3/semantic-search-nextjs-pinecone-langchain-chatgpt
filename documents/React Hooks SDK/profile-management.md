---
title: "Profile Management"
slug: "profile-management"
excerpt: "Manage your own profiles"
hidden: false
createdAt: "2023-04-04T07:28:14.553Z"
updatedAt: "2023-05-25T09:24:52.349Z"
---
## Active Profile

On successful login via the `useWalletLogin` hook, the Lens SDK retrieves the Lens Profile owned by the authenticated wallet address and selects the first profile as the Active Profile.

The Active Profile is then used throughout the SDK hooks to provide a cohesive view on the data.

We can retrieve the Active Profile by means of the `useActiveProfile` hook:

```typescript
import { useActiveProfile } from '@lens-protocol/react-web';

function MyProfile() {
  const { data, error, loading } = useActiveProfile();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (data === null) return <p>No active profile</p>;

  return (
    <div>
      <p>Active profile: {data.handle}</p>
    </div>
  );
}
```

> 📘 Pro-tip
> 
> For the TypeScript enthusiast out there, you might have noticed that the  `useActiveProfile` yields a specialized type of profile called `ProfileOwnedByMe`.
> 
> In and around the SDK your will find hooks that requires to know the Lens profile that is performing a given operation. Those hooks makes it clear that they need a profile owned by the logged-in wallet using the type `ProfileOwnedByMe`. See for example `collector` in `useCollect` hook or `follower` in `useFollow` hook.
> 
> You can pass the profile returned by the `useActiveProfile` directly to those hook arguments and you can improve the type safety of your Lens integration with not extra effort.

## Change the Active Profile

If the logged-in wallet has more than one Lens profiles you can list all the profiles by means of the `useProfilesOwnedByMe`:

```typescript
import { useProfilesOwnedByMe } from '@lens-protocol/react-web';

function MyProfiles() {
  const { data: profiles, error, loading } = useProfilesOwnedByMe();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
     {profiles.map((profile) => (
       <li key={profile.id}>{profile.name}</li>
     ))}
    </ul>
  );
}
```

The `useProfilesOwnedByMe` is a paginated hook, so it returns the usual `hasMore` flag and `next`callback you found already in other paginated hooks. See [this example](https://github.com/lens-protocol/lens-sdk/blob/main/examples/web-wagmi/src/hooks/useInfiniteScroll.ts) of infinite scroll pagination leveraging this standardized paginated return type.

We can now use the `useActiveProfileSwitch` to create a simple profile switcher interface:

```typescript
import { useActiveProfileSwitch, useActiveProfile, useProfilesOwnedByMe } from '@lens-protocol/react-web';

function ProfileSwitcher() {
  const { data: activeProfile } = useActiveProfile();
  const { execute: switchActiveProfile, isPending } = useActiveProfileSwitch();
  const { data: profiles, error, loading } = useProfilesOwnedByMe();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Active profile: {activeProfile?.handle}</p>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <button
              disabled={isPending || activeProfile?.id === profile.id}
              onClick={() => {
                switchActiveProfile(profile.id);
              }}
            >
              {profile.handle}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

> 👍 Pro-tip
> 
> Again, for the TypeScript enthusiast might notice that `useProfilesOwnedByMe` returns `ProfileOwnedByMe` instances and that `useActiveProfileSwitch` callback accepts `ProfileOwnedByMe` only.
> 
> This has 2 benefits:
> 
> - self-document the hooks by informing how hooks can be composed together
> - provides type safety that avoid run-time issues before they can occur.

## Log in as profile X

Finally, if you know the profile you intend to use you can log-in and select the profile as the Active Profile to use in one go by passing the profile handle to the `useWalletLogin` callback:

```typescript
import { useWalletLogin } from '@lens-protocol/react-web';

function LoginButton() {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();

  const onLoginClick = async () => {    
    const handle = window.prompt('Type the profile handle you want to login with')
    
    // signer is available here, omitted for brevity
    await login(signer, handle);
  };
 
  return (
    <div>
      {loginError && <p>{loginError}</p>}
      <button disabled={isLoginPending} onClick={onLoginClick}>Log in</button>
    </div>
  );
}
```

The example above focuses on the alternative use of the `useWalletLogin` hook and omits several details of a proper login integration. See the [Authentication](doc:hooks-authentication) guide to see a more comprehensive example.