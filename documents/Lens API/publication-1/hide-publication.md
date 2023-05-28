---
title: "Hide publication"
slug: "hide-publication"
hidden: false
createdAt: "2022-02-18T11:31:24.219Z"
updatedAt: "2023-03-16T16:08:54.411Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/publications/hide-publication.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Once you publish something on-chain you can not remove it, that said if you have used a centralized link for storage you can remove it on the centralized side and the content will not be able to be loaded. If you are using IPFS you can unpin the content.

Since our indexer moves the content into its own storage our API will still show it.

However, this mutation allows you to hide the publication you posted from our API's storage, but this DOES NOT do anything on-chain. This is a nice way to allow your users to "delete" publications and it will hide the content and media which was uploaded for it. The publication will still come back so UIs can render all the comments related to it and so it doesn't destroy the pointers, UIs can then design it how they wish but as said above the content and media will not be brought back for the UIs to render. If an application does not use our API and has their own subgraph or indexer they can still show this publication and read from the contentURI if that is not removed. 

You must own the publication to hide it, this is not the functionality to hide stuff that other people post this is to hide a publication you have done. 

# API design

returns a `VoidScalar` which means no response is returned if you do look at the response data it will be data.hidePublication= null but you do not need to look at the response for anything which returns `void`. If it does not throw it is successful. 

```javascript Example operation
mutation HidePublication {
  hidePublication(request: { publicationId: "0x01-0x01" })
}
```
```javascript Query interface
type Mutation {
   hidePublication(request: HidePublicationRequest!): Void
}
```
```javascript Request
input HidePublicationRequest {
  # Publication id
  publicationId: InternalPublicationId!
}
  
# Internal publication id custom scalar type
scalar InternalPublicationId
```



# 

# Using LensClient SDK

```typescript
await lensClient.publication.hide({  
  publicationId: "0x01-0x01",  
});
```