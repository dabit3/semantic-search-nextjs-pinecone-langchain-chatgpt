---
title: "App profile stats total"
slug: "app-comment-total-1"
hidden: false
createdAt: "2022-09-26T15:22:25.817Z"
updatedAt: "2023-04-27T23:15:01.665Z"
---
As you attach an appId to the publications you post the number of publications you did on profile Y on app Z can be different from app H numbers, this allows you to query by sources to get the correct stats if you're building an app that only cares about the content of the app.

# API design

```javascript Example operation
query Profile {
  profile(request: { profileId: "0x18" }) {
    stats {
      publicationsTotal(forSources: ["your_app_id"])
      postsTotal(forSources: ["your_app_id"])
      mirrorsTotal(forSources: ["your_app_id"])
      commentsTotal(forSources: ["your_app_id"])
      totalPublications
      totalPosts
      totalMirrors
      totalComments
    }
  }
}
```
```javascript Example response
{
  "data": {
    "profile": {
      "stats": {
        "publicationsTotal": 0,
        "postsTotal": 0,
        "mirrorsTotal": 0,
        "commentsTotal": 0,
        "totalPublications": 91,
        "totalPosts": 52,
        "totalMirrors": 11,
        "totalComments": 28
      }
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const profileById = await lensClient.profile.stats(
  {
    handle: "pukkynext.test",
  },
  ["your_app_id"] // array of sources -> appIds you want the stats to be calculated for
);
```