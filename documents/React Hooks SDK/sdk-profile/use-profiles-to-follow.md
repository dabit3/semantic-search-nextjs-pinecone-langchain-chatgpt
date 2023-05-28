---
title: "useProfilesToFollow"
slug: "use-profiles-to-follow"
hidden: false
createdAt: "2023-01-16T10:42:12.812Z"
updatedAt: "2023-03-20T07:04:41.913Z"
---
`useProfilesToFollow` is a React Hook that lets you query suggested profiles to follow.

```typescript
const { data: profiles, loading } = useProfilesToFollow()
```



## Usage

```typescript TypeScript
import { useProfilesToFollow } from '@lens-protocol/react-web';

function ProfilesToFollow() {
  const { data: profiles, loading } = useProfilesToFollow();

  if (loading) return <Loading />;

  return (
    <div>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
```



## Reference

### `useProfilesToFollow()`

#### Returns

```typescript
{
  data: ProfileFragment[],
  loading: boolean
}
```