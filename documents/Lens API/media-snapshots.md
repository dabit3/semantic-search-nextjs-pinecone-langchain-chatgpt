---
title: "Media Snapshots"
slug: "media-snapshots"
hidden: false
createdAt: "2023-05-25T10:44:00.330Z"
updatedAt: "2023-05-26T16:33:51.252Z"
---
The Lens API now snapshots the media content from profiles and publications. Our goal is to provide a seamless experience to users, on par with web2, so that content delivery is quick, responsive and adjustable to your application's needs.

This new feature is implemented by adding 2 new fields on the `MediaSet` type, called `onChain` and `optimized`, which will contain the originally uploaded content and the snapshotted content respectively. The `original` field will now dynamically return snapshotted content if available, otherwise the original url uploaded by the user. This way, applications can enjoy faster loading times with zero changes on their side, and if it's crucial for a business case to include the on-chain content, that also remains available.

The type of content being snapshotted is:

- Profile pictures (not NFT PFPs)
- Profile cover photos
- Publication content under  `metadata.media` (including covers)

> 📘 My content is not being snapshotted, why?
> 
> While most media snapshots will happen almost instantaneously, some might take some time to complete especially for typically larger types of content like audio and video, in these cases, the `original` field will resolve to the onChain url, and will point to the snapshot once it's complete.
> 
> The current limits for snapshots are 50MB for images, 200MB for audio and 1GB for video content.
> 
> Also, please note that the `metadata.image` and `metadata.animation_url` fields are _not_ snapshotted right now.

### Images

Image content will be snapshotted on [ImageKit](https://imagekit.io) as well as S3 for redundancy, and will always be served from ImageKit CDN. This applies to images up to 50MB in size, larger ones will _not_ be snapshotted at this point.

#### Image transformations

One common usecase is to serve image content in various sizes for different purposes. eg. A profile picture can be served as part of a post in a small format, or in the profile page in a medium format, or even in full resolution if needed. The now deprecated `small` and `medium` media formats were allowing this but not in a customizable way. To support these usecases, `MediaSet` now has a `transform` field resolver that will serve images in custom resolutions harnessing ImageKit's on-the-fly transformation feature.

The new field resolver takes a single input object with 3 properties `width`, `height` and `keepAspectRatio`. `width` and `height` accept string values in the following forms: `'500px'` for pixel-based transformations, `'50%'` for transformations based on the percentage of the original image size and `'auto'` in cases you only want to supply one dimension and auto-compute the other. `keepAspectRatio` is set to true by default, and you can set it as false in case you explicitly want the image to be stretched.  

Here is a few GraphQL snippets using the `transform` field resolver:

```gql
... on Post {
  metadata {
    media {
      original {
        url
      }
      transform(params:{
          width: "200px"
          height: "10%"
          keepAspectRatio:false
        })
    }
  }
} 

```

```gql
... on Post {
  metadata {
    media {
      original {
        url
      }
      transform(params:{
          height: "100px"
          width: "auto"
        })
      
    }
  }
} 
```

### Audio

Audio content up to 200MBs in size will be snapshotted on an S3 bucket. The audio will be intact, no transcoding will be made, it will be a direct copy of the original. 

### Video content

Video content up to 1GB will be snapshotted on [Livepeer](https://livepeer.org). Snapshotting on Livepeer involves transcoding the video, so it's a lengthier process, that should take up to a few minutes. 

Also, Livepeer-snapshotted videos will be served in the m3u8 format, and that might need some additional handling from your side.