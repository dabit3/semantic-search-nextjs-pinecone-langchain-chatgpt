---
title: "Publication metadata status"
slug: "publication-metadata-status"
hidden: false
createdAt: "2022-09-26T14:18:53.172Z"
updatedAt: "2023-03-16T16:17:08.171Z"
---
You sometimes need to debug why your publication has not been snapshotted and not appearing when querying the API. This is a very common thing that a lot of developers find and it's because you have not followed the metadata standards set for the publication. This endpoint returns you the error reason so you can see why it failed.

# API Design

In the example response, you can see it's saying this one failed because they put metadata version as 200 which isn't a supported version.

Metadata standards can be read here <https://docs.lens.xyz/docs/metadata-standards>

```javascript By publication id
query PublicationMetadataStatus {
  publicationMetadataStatus(request: { publicationId: "0x0e-0x34" }) {
    status
    reason
  }
}
```
```javascript By tx hash
query PublicationMetadataStatus {
  publicationMetadataStatus(request: { txHash: "0x13c21e9085f336a1ef5c002afe8dd4f0c6b55126e7468cf3fa98b21c2186d688" }) {
    status
    reason
  }
}
```
```javascript By tx id
query PublicationMetadataStatus {
  publicationMetadataStatus(request: { txId: "ae0650e3-4e12-4be3-9575-1d96b3f8d3d1" }) {
    status
    reason
  }
}
```
```javascript Example response
{
  "data": {
    "publicationMetadataStatus": {
      "status": "METADATA_VALIDATION_FAILED",
      "reason": "Metadata version 200 is not supported"
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.publication.metadataStatus({
  publicationId: "0x0e-0x34"
});
```