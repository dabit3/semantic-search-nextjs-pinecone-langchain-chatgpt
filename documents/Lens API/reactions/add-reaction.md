---
title: "Add reaction"
slug: "add-reaction"
hidden: false
createdAt: "2022-06-20T12:25:14.210Z"
updatedAt: "2023-03-14T13:34:39.805Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/reaction/add-reaction.ts>

This API call allows you to react to publications with a profile off-chain without needing to sign. For now, reactions are stored on the server but we working on a way to decentralised likes without making UX really horrible with signing on every single reaction. 

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

# API Design

Add a reaction to a publication, please note if you pass in another reaction it will toggle it. What I mean by that is if you `UPVOTE` it then `DOWNVOTE` it the server will swap the `UPVOTE` to the `DOWNVOTE`.

This returns a void so no need to care about its response if successful. 

```javascript Example operation
mutation AddReaction {
  addReaction(request: { profileId: "0x01", reaction: UPVOTE, publicationId: "0x02-0x01" })
}
```



## Request

### profileId - required

The profile id you wish to react from the authenticated user must own that profile. 

### reaction - required

currently, we support `UPVOTE` and `DOWNVOTE` dApp can make them work as they wish for example on lenster they have a heart button that only uses `UPVOTE` but other dApp use both. 

### publicationId - required

which publication do you wish to react to



# 

# Using LensClient SDK

```typescript
import { ReactionTypes } from "@lens-protocol/client";

// lensClient is authenticated

const result = await lensClient.reactions.add({
  profileId: '0x01', 
  publicationId: '0x02-0x01',
  reaction: ReactionTypes.Upvote,
});
```