---
title: "App comment total"
slug: "app-comment-total"
hidden: false
createdAt: "2022-09-26T15:07:28.489Z"
updatedAt: "2023-03-16T15:26:44.924Z"
---
As you can filter queries by sources this means comments on a publication may be different numbers. Let's look at an example:

- Josh does a post on APP2 
- Sally comments on APP3
- John comments on APP4
- Paul comments on APP2

Josh's post has 3 comments but across many apps. When you filter on sources you only bring back the sources from those apps. This example below its showing you how we get publication ID `0x01-0x01` and we get back the number of comments that have been done on the app `your_app_id`. This allows us to get the correct counters etc. 

# API design

```javascript Example operation
query Publications {
  publications(request: { publicationIds: ["0x01-0x01"] }) {
    items {
      ... on Post {
        stats {
          totalAmountOfComments
          commentsTotal(forSources: ["your_app_id"])
        }
      }
      ... on Comment {
        stats {
          totalAmountOfComments
          commentsTotal(forSources: ["your_app_id"])
        }
      }
      ... on Mirror {
        stats {
          totalAmountOfComments
          commentsTotal(forSources: ["your_app_id"])
        }
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "publications": {
      "items": [
        {
          "stats": {
            "totalAmountOfComments": 3,
            "commentsTotal": 1
          }
        }
      ]
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.publication.stats(  
  {  
    publicationId,  
  },  
  ["your_app_id"] // sources
);
```