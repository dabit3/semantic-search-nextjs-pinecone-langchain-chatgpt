---
title: "Metadata standards"
slug: "metadata-standards"
hidden: false
createdAt: "2022-02-18T17:25:31.324Z"
updatedAt: "2023-01-27T08:50:07.818Z"
---
As everything is an NFT in theory - even if it can not be collected - setting metadata standards is necessary for all publications. This will outline what we propose you should conform to if you are building on Lens Protocol. This does not mean you can not set up your own standards; rather, it means that our API will not index a publication unless it matches these standards. 

These standards can be continuously improved - and we are open to feedback from the community on how we can keep pushing the standards and making them better. 

# Metadata structure

Lens supports metadata that is structured according to the [official ERC721 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) or the [Enjin Metadata suggestions](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema).

All Metadata standards we set are supported on OpenSea and other marketplaces.

Here is the full overview of the latest metadata standard we will go through each field below.

Please note that legacy metadata standards will not be talked about in this doc as we do not want to confuse new builders on what the standards are. Saying this we will always support old standards and migrate the data to keep them as close as possible to new metadata standards. 

Please note `null` will be classed as undefined (optional parameters) if used. 

```ts json
interface PublicationMetadataMedia {
  item: Url;
  /**
   * This is the mime type of media
   */
  type?: MimeType | null;
  
  /**
   * The alt tags for accessibility
   */
  altTag?: string | null;

  /**
   * The cover for any video or audio you attached
   */
  cover?: string | null;
}

enum PublicationMetadataVersions {
  one = '1.0.0',
  // please use metadata v2 when doing anything! v1 is supported but discontinued.
  two = '2.0.0'
}

enum PublicationMetadataDisplayType {
  number = 'number',
  string = 'string',
  date = 'date',
}

interface PublicationMetadataAttribute {
  displayType?: MetadataDisplayType | undefined | null;
  traitType?: string | undefined | null;
  value: string;
}

enum PublicationContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}

enum PublicationMainFocus {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  ARTICLE = 'ARTICLE',
  TEXT_ONLY = 'TEXT_ONLY',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  EMBED = 'EMBED',
}

interface Metadata {
  /**
   * The metadata version.
   */
  version: PublicationMetadataVersions;

   /**
   * The metadata lens_id can be anything but if your uploading to ipfs
   * you will want it to be random.. using uuid could be an option!
   */
  metadata_id: string;

  /**
   * A human-readable description of the item.
   */
  description?: Markdown | undefined | null;

  /**
   * The content of a publication. If this is blank `media` must be defined or its out of spec.
   */
  content?: Markdown | undefined | null;
  
  /**
   * IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT
   * Full spec > https://tools.ietf.org/search/bcp47
   */
  locale: Locale;

  /**
   * Ability to tag your publication
   */
  tags?: string[] | undefined | null;

  /**
   * Ability to add a content warning
   */
  contentWarning?: PublicationContentWarning | undefined | null;

  /**
   * Main content focus that for this publication
   */
  mainContentFocus: PublicationMainFocus;

  /**
   * This is the URL that will appear below the asset's image on OpenSea and others etc
   * and will allow users to leave OpenSea and view the item on the site.
   */
  external_url?: Url | undefined | null;

  /**
   * Name of the item.
   */
  name: string;

  /**
   * These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the 
  item.
   */
  attributes?: PublicationMetadataAttribute[] | undefined | null;

  /**
   * legacy to support OpenSea will store any NFT image here.
   */
  image?: Url | undefined | null;

  /**
   * This is the mime type of image. This is used if you uploading more advanced cover images
   * as sometimes IPFS does not emit the content header so this solves the pr
   */
  imageMimeType?: MimeType | undefined | null;

  /**
   * This is lens supported attached media items to the publication
   */
  media?: PublicationMetadataMedia[] | undefined | null;

  /**
   * In spec for OpenSea and other providers - also used when using EMBED main publication focus
   * A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV,
   * and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.
   * Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas,
   * WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.

   */
  animation_url?: Url | undefined | null;

  /**
   * This is the appId the content belongs to
   */
  appId?: AppId | undefined | null;
}
```



## version - required!

### type

```ts
export enum PublicationMetadataVersions {
  one = '1.0.0',
  two = '2.0.0,
}
```



We expect this standard to keep growing as more is added, so defining the version number makes sense to allow us to parse it differently from the API standpoint. This doc will be kept updated with version changes.

The latest version to use when defining metadata version is - `PublicationMetadataVersions.two` aka ` '2.0.0'`

## metadata_id - required

### type

`string`

We force a metadata_id on the metadata because we would prefer content for each user is a different IPFS link if using IPFS. so having a metadata_id on here enforces that you want to make each publication for each person different even if they post the same content. You can create your own ids or use [uuid](https://www.npmjs.com/package/uuid) to make sure this will always be different when building up your metadata. 

## description - optional

> 🚧 Even though its optional we advise you to use this

### type

`Markdown` which is a schema type for string

As your publication can be NFT if collected, you can set a description for it which when you use opensea or other marketplaces it will show context about it to people who own it or may want to trade it.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2288406-lens1.PNG",
        "lens1.PNG",
        535
      ],
      "sizing": "100"
    }
  ]
}
[/block]



## content - required if no `media` attached

### type

`Markdown` which is a schema type for string

This contains your publication text. So if you write a post saying "Hello World" and attach an image the "Hello World" will be in that `content` property.

This supports markdown as well. 

## locale - required

### type

`Locale` which is a schema type for string

IOS 639-1 language code aka en or it and ISO 3166-1 alpha-2 region code aka US or IT aka en-US or it-IT.

This field describes which language and region the text/media is in. You can just pass in the language if you do not know the region or care about the region. 

example - en-Us

example of just language - en

Both would be allowed. 

## tags

### type

`string[]` 

Ability to tag dynamically on a publication, this will allow you to do queries on these tags throughout the API. 

- can not have more than 5 tags per publication or it will be rejected
- each tag char length can be no more then 50

## contentWarning

### type

```ts
export enum PublicationContentWarning {
  NSFW = 'NSFW',
  SENSITIVE = 'SENSITIVE',
  SPOILER = 'SPOILER',
}
```



Ability to tag content warnings on publications if known already. These by default are hidden from the main APIs you have to explictly ask to include content warning types for them to come back in the queries. 

It is not required but if you try to put something outside of the enum above it be will be rejected by the indexer. 

## mainContentFocus - required

### type

```ts
export enum PublicationMainFocus {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  ARTICLE = 'ARTICLE',
  TEXT_ONLY = 'TEXT_ONLY',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  EMBED = 'EMBED',
}
```



Main publication focus is one of the main ways you can add a category for the publication. For example, if you are uploading an image and content then it should be tagged as IMAGE as the main publication focus is that. This will allow clients to build really nice layouts for each main focus. All these main publication focus are filterable on all queries allowing you to bring it whichever you decide your app wants. Data migration has been run on old metadata standards so every publication will have a `mainPublicationFocus` - be as creative as you wish!

#### VIDEO

- to pass validation it must include a video in the `media` property which matches one of our supported formats. If it does not it will be rejected. You can of course have other media items in the array alongside the video. Please note we do not check the headers of these items so make sure your web app does not support anything passed these types.

formats:  
      - video/webm  
      - video/mp4  
      - video/x-m4v  
      - video/ogv  
      - video/quicktime  
      - video/mpeg  
      - video/ogg

#### IMAGE

- to pass validation it must include an image in the `media` property which matches one of our supported formats. If it does not it will be rejected. You can of course have other media items in the array alongside the image. Please note we do not check the headers of these items so make sure your web app does not support anything passed these types.

formats:  
      - image/gif  
      - image/jpeg  
      - image/png  
      - image/tiff  
      - image/x-ms-bmp  
      - image/svg+xml  
      - image/webp

#### ARTICLE

- See an article as a way someone can write more than just a small publication. This will allow other UIs knowledge about this as being classed as different from the other publications. The only requirement on this is it must have `content` defined. No constraints are put on the length that's down to the UIs to decide. Articles can have media all attached as you would a normal article.

#### TEXT_ONLY

- Text only explains itself, this is a publication with text only. If the person has attached any form of media that should live in image, audio, video, or article. To pass validation on this it needs to have `content` defined and no media items attached with it. 

#### AUDIO

- to pass validation it must include an audio file in the `media` property which matches one of our supported formats. You can of course have other media items in the array alongside the audio file. Please note we do not check the headers of these items so make sure your web app does not support anything passed these types. 

formats:  
      - audio/wav  
      - audio/mpeg  
      - audio/ogg  
      - audio/mp4  
      - audio/aac  
      - audio/webm  
      - audio/flac

#### LINK

- This is a way to explain that the main focus is the link itself which may exist within some content. The validation on this is that the content must have a valid `https` link inside it. 

#### EMBED

- Pushing the standard even further opensea introduced the metadata standard of `animated_url` allowing you to embed a webpage into an NFT. This is follows suite and allows you to define that this publication should be embedded. The validation constraint on this is that it must have an animated_url defined. We advise you like `opensea` do not render these in the timelines, profiles etc and only render it on click on the publication itself. Beware when used badly users could be scammed - make it clear it is an iframe and make sure alerting users and protecting them is your key focus. Also note you can filter these out from your queries if you wish not to support them. 

## external_url - optional

### type

`Url` which is a schema type for string

This is the URL that will appear below the asset's image on OpenSea and others etc and will allow users to leave OpenSea and view the item on the site. You could use this as a deep link into your dApp or something else. 

## name - required

### type

`string`

This is the name of your publication this is a key bit of data OpenSea uses to show the NFT so we have enforced it to make sure no bad NFTs are created.

## attributes

Please supply an empty array if no attributes are present as recommended best practice.

### type

```ts
export enum PublicationMetadataDisplayType {
  number = 'number',
  string = 'string',
  date = 'date',
}

export interface PublicationMetadataAttribute {
  displayType?: MetadataDisplayType;
  traitType?: string;
  value: string;
}
```



To give your publication a little more detail, OpenSea and other marketplaces allow you to add custom "attributes" to your metadata that will show up underneath each of your assets. Remember a publication only becomes an NFT if collected. 

These are the attributes for the item, which will show up on the OpenSea and others NFT trading websites on the item. 

## image - required only optional if you use `animation_url` instead

### type

`Url` which is a schema type for string.

We have brought in a new type called `media` which supports more than just images which we will cover down below but as publications can be NFTs if collected, you must still supply the NFT image link else it will not render an image on opensea if collected by someone. This is the NFT visual the person will be collecting. 

Some rules to follow which will allow this to work all the time:

- Remember people can upload many images/videos/audio items to media as this is the more social aspect of the metadata but the NFT image itself must only be 1. Make sure you always supply it as what you want the users to see in their wallets when they collect your publication. 

- If you are uploading a video or audio to be collected that needs to go in `animation_url` but the cover for it needs to go in `image` as well. 

## imageMimeType - required if image is supplied

### type

`imageMimeType` which is a schema type for string

### Supported mime types for images

currently supporting image mime types:

- image/gif
- image/jpeg
- image/png
- image/tiff
- image/x-ms-bmp
- image/svg+xml
- image/webp

Sometimes the IPFS link which is passed to the image metadata does not contain the content header for the image. This can cause some issues rendering; to protect against this, when you upload an image make sure you put its mime type in this property as well. This will mean all UIs who build on lens can always render it on their UI. 

## media - required if the content is null

### type

`MetadataMedia[]`

```ts
export interface PublicationMetadataMedia {
  item: Url;
  /**
   * This is the mime type of media
   */
  type?: MimeType | null;
  
  /**
   * The alt tags for accessibility
   */
  altTag?: string | null;

  /**
   * The cover for any video or audio you attached
   */
  cover?: string | null;
}
```



### Supported mime types for images/audio/videos

#### Images

- image/gif
- image/jpeg
- image/png
- image/tiff
- image/x-ms-bmp
- image/svg+xml
- image/webp

#### Videos

- video/webm
- video/mp4
- video/x-m4v
- video/ogv
- video/ogg

#### Audio

- audio/wav
- audio/mpeg
- audio/ogg

You can upload an array of images/videos/audios you wish to share with your audience.

## animation_url - required only optional if you use `image` instead

### type

`Url` which is a schema type for string

A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.

Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.

## appId - optional

### type

`string`

You may want to tag the publication with an `appId` this will then allow you to filter on that `appId` for publications on the [Publication](doc:publication-1) queries.