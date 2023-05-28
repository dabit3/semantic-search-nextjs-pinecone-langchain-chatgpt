---
title: "Metadata filters - publication"
slug: "metadata-publication-filters"
hidden: false
createdAt: "2022-09-23T13:16:33.798Z"
updatedAt: "2023-03-16T16:14:57.059Z"
---
On anything which returns a `Post` `Comment` `Mirror` or anything to do with a publication you have ability to filter on that metadata. 

# API Design

Will use publications as an example but please note this is a filter on a lot more endpoints so make sure you look at the graphQL schema for the best visibility. 

```javascript example operation
query Publications {
  publications(request: {
    profileId: "0x09",
    publicationTypes: [POST, COMMENT, MIRROR],
    metadata: {
      locale: "en-us",
      contentWarning: {
        includeOneOf: [SPOILER]
      },
      mainContentFocus: [VIDEO, IMAGE]
      tags: {
        oneOf: ["tag1"],
        all: ["tag2", "tag3"]
      }
    }
  }) {
    items {
      __typename 
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
```



## Request

### locale - optional

This is the locale you which to filter on you can just pass in the region code or language code or both as the example above shows.

### contentWarning - optional

By default all flagged content warning publications is not brought back when querying but if you want to bring them back you can add this filter and it will include them. 

#### includeOneOf

It must include at least one of the array. 

### mainContentFocus - optional

You can filter on the main content focus, if you do not supply anything for it then it bring back them all.

### tags - optional

On a publication you can now add tags for discovery this allows you to filter on them.

#### oneOf

It only needs to match 1 of the array passed in to bring it back. Remember publications can be tagged by many tags. 

#### all

It must match all tags supplied.



# 

# Using LensClient SDK

```typescript
import { PublicationContentWarning, PublicationMainFocus } from "@lens-protocol/client";

const result = await lensClient.publication.fetchAll({
  metadata: {
    locale: "en-us",
    contentWarning: {
      includeOneOf: [PublicationContentWarning.Spoiler],
    },
    mainContentFocus: [PublicationMainFocus.Video, PublicationMainFocus.Image],
    tags: {
      oneOf: ["tag1"],
      all: ["tag2", "tag3"],
    },
  },
});
```