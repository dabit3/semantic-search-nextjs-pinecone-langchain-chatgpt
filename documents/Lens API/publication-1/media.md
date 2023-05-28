---
title: "Media uploads"
slug: "media"
hidden: false
createdAt: "2022-11-09T14:28:54.976Z"
updatedAt: "2023-03-27T22:37:21.744Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/df8cabb8f70a20913d505ecf3158a8aff551f411/src/media/create-attachment.ts>

Media endpoints will allow the users to upload AUDIO and VIDEO directly to the API without using IPFS or a storage provider. It will create a copy of the file in our cache and streaming system before pinning it to the decentralised IPFS. All on-chain metadata will point to the decentralised IPFS CID, not our cache system.

first, you need to create the media type and then push the file to the signed URL. When the file is fully updated using the `SignedURL` you then can create the post/comment with the Media on the metadata. We will explain in more detail below. 

Once the publication is mined, the Lens API will push the file to an IPFS storage making sure on-chain leverages the decentralised vision.

# API details

## params on the request

| name    | type     | desc                                                                                |
| :------ | :------- | :---------------------------------------------------------------------------------- |
| itemCid | IfpsCid  | You need to precalculate the CID of the file before upload it with the presignedURL |
| type    | MimeType | Mime type of the file to upload                                                     |
| altTag  | String   | Alternative text to show on the embed object                                        |
| cover   | Url      | Url cover image                                                                     |

## example

> 🚧 Only works with AUDIO and VIDEO.

> 📘 Hot tip
> 
> If you want to add a Cover first need to be pushed to a IPFS service, we only take care of the Audio/Video attached on the item media.

```typescript Example Operation
mutation CreateAttachMediaData($request:  {
    itemCid: "QmTAznyH583xUgEyY5zdrPB2LSGY7FUBPDddWKj58GmBgp",
    type: "video/mp4",
    altTag: "video test",
    cover: "ifps://QmVwvsJrFzAAb1fPe5uXF4QpPib1T6gjc3xLpS96BUsTL6"
  }) {
  createAttachMediaData(request: $request) {
    media {
      altTag
      cover
      item
      source
      type
    }
    signedUrl
  }
}
```
```json JSON
{
  signedUrl: 'https://statics-mumbai-lens-local.s3.eu-west-1.amazonaws.com/upload/QmTAznyH583xUgEyY5zdrPB2LSGY7FUBPDddWKj58GmBgp?Content-Type=video%2Fmp4&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZVP63HMY2HDU7HOB%2F20221109%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20221109T145729Z&X-Amz-Expires=300&X-Amz-Signature=820605678aab218a537d9524325fc3f30d70a3c9cbbed4d661bb966aadb3bd13&X-Amz-SignedHeaders=host%3Bx-amz-meta-contenttype%3Bx-amz-meta-createdat%3Bx-amz-meta-issuer%3Bx-amz-meta-user&x-amz-meta-contenttype=video%2Fmp4&x-amz-meta-createdat=1668005849003&x-amz-meta-issuer=lens&x-amz-meta-user=0x2adB75AB75957Cb1A13c23191E153aF167fe7f73',
  media: {
    item: 'ifps://QmTAznyH583xUgEyY5zdrPB2LSGY7FUBPDddWKj58GmBgp',
    type: 'video/mp4',
    cover: null,
    source: 'LENS',
    altTag: 'video test',

  },
}
```



> 📘 Tip:
> 
> For upload the image need to be done with the http method PUT

Once you get the presignedUrl [(more info)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html) , you can upload the file to S3. 

```typescript Push file to S3

const file = fs.readFileSync(path.join(__dirname, 'file/video.mp4'));
const response = await fetch(signedUrl, {method: 'PUT', body: file});
    

```



## Allowed formats

### Video

- video / webm
- video / mp4
- video / x - m4v
- video / ogv
- video / ogg

### Audio

- audio / wav
- audio / mpeg
- audio / ogg
- audio / midi

# 

# Using LensClient SDK

```typescript
const result = await lensClient.publication.createAttachMediaData({
  itemCid: "QmTAznyH583xUgEyY5zdrPB2LSGY7FUBPDddWKj58GmBgp",
  type: "video/mp4",
  altTag: "video test",
  cover: "ifps://QmVwvsJrFzAAb1fPe5uXF4QpPib1T6gjc3xLpS96BUsTL6"
});
```