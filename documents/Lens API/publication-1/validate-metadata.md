---
title: "Validate metadata"
slug: "validate-metadata"
hidden: false
createdAt: "2022-09-26T14:37:30.355Z"
updatedAt: "2023-03-16T15:04:31.479Z"
---
Some developers get confused when getting started on what is valid metadata and what is not. They miss a property or pass in a wrong type which is hard to debug if you do this. This endpoint allows you to pass in the metadata and see if it's valid, if it is not valid it tells you why. This is great for debugging when you're getting up and running with the LENS API. 

# API Design

You can validate metadata v1 and metadata v2 within the request, in this example we just show validating on metadata v2 as this is the latest and suggested metadata to follow.

```javascript Example request
query ValidatePublicationMetadata {
  validatePublicationMetadata(request: {
    metadatav2: {
      version: "2.0.0",
      mainContentFocus: TEXT_ONLY,
      metadata_id: "6162716327186732",
      description: "Description",
      locale: "en-US",
      content: "Content",
      external_url: null,
      image: null,
      imageMimeType: null,
      name: "Name",
      attributes: [],
      tags: ["using_api_examples"],
      appId: "api_examples_github",
  }
  }) {
    valid
    reason
  }
}
```
```javascript Example success response
{
  "data": {
    "validatePublicationMetadata": {
      "valid": true,
      "reason": null
    }
  }
}
```
```Text Example fail response
{
  "data": {
    "validatePublicationMetadata": {
      "valid": false,
      "reason": "Invalid metadata version - should be 2.0.0"
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const metadata = {
  appId: "lenster",
  attributes: [
    {
      displayType: PublicationMetadataDisplayTypes.String,
      traitType: "Created with",
      value: "LensClient SDK",
    },
  ],
  content: "Post created with LensClient SDK",
  description: "Description of the post created with LensClient SDK",
  locale: "en-US",
  mainContentFocus: PublicationMainFocus.TextOnly,
  metadata_id: uuid.v4(),
  name: "Post created with LensClient SDK",
  tags: ["lens-sdk"],
  version: "2.0.0",
};

const validateResult = await lensClient.publication.validateMetadata(metadata);

if (!validateResult.valid) {
  throw new Error(`Metadata is not valid.`);
}
```