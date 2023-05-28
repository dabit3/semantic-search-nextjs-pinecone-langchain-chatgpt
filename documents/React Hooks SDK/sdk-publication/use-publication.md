---
title: "usePublication"
slug: "use-publication"
hidden: false
createdAt: "2022-12-23T15:27:41.379Z"
updatedAt: "2023-03-20T06:54:30.080Z"
---
`usePublication` is a React hook that allows you to find a specific publication using it's identifier.

```typescript
const { data, loading } = usePublication(args)
```



## Usage

```typescript TypeScript
import { usePublication } from '@lens-protocol/react-web';

function Publication() {
const { data: publication, loading } = usePublication({
    publicationId: '0x77-0x0149',
  });
}
```



## Reference

### `usePublication(args)`

### Parameters

- `publicationId` (required)

The id of the publication to fetch

- `observerId` (optional)

The id of the profile who is running the query, usually the logged in/active profile.

### Returns

```typescript
{
  data: PublicationFragment,
  loading: boolean
}
```