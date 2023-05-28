---
title: "usePublications"
slug: "use-publications"
hidden: false
createdAt: "2022-12-23T14:31:39.812Z"
updatedAt: "2023-03-20T06:54:38.841Z"
---
> 🚧 Supported Arguments
> 
> This hook currently only supports a subset of the arguments exposed by the API. In future releases, all arguments will be supported.

`usePublications` is a React Hook that lets you query for publications that match the criteria that you specify.

```typescript
const { data, loading, hasMore, next } = usePublications(args)
```



## Usage

```typescript TypeScript
import { usePublications } from '@lens-protocol/react-web';

function Publications() {
const {
    data: publication,
    loading,
    hasMore,
    next,
  } = usePublications({
    profileId: '0x77-0x0149',
    limit: 10,
  });
}
```



## Reference

### `usePublication(args)`

### Parameters

`profileId: string` (required)

- The id of the profile that posted the publications

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

`metadataFilter: PublicationMetadataFilters` (optional)

- Any optional [metadata](https://docs.lens.xyz/docs/use-publications#publicationmetadatafilters) to filter publications by

### Returns

```typescript
{
  data: PublicationFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more publications after the current batch
  next(): () => void, // fetches the next publications and appends to the data
}
```



### PublicationMetadataFilters

```typescript
{
  restrictPublicationMainFocusTo?: PublicationMainFocus[];
  restrictPublicationLocaleTo?: string;
  showPublicationsWithContentWarnings?: {
    oneOf: PublicationContentWarning[];
  };
  restrictPublicationTagsTo?:
    | {
        all: string[];
      }
    | {
        oneOf: string[];
      };
}
```