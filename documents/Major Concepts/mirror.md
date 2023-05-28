---
title: "Mirror"
slug: "mirror"
hidden: false
createdAt: "2022-01-25T21:55:14.960Z"
updatedAt: "2022-02-06T18:23:53.893Z"
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8320c1f-illustration_mirror.svg",
        "illustration_mirror.svg",
        328,
        240,
        "#00501e"
      ]
    }
  ]
}
[/block]
Mirrors are the curation tool of the Lens Protocol. They are the protocol's equivalent to reposting or re-amplifying content. Mirrors are treated the same as [publications](doc:publication) with a few additional checks and a few more minor features.

Since mirrors reference other publications, they are subject to the conditions of the original publication's Reference Module. If a publication has a reference module that limits mirrors only to accounts that follow the original poster, and the mirroring account does not hold a Follow NFT, the transaction to mirror will fail.

Since mirrors only repost existing content, they do not have a ContentURI field and therefore cannot be collected and do not have a Collect Module of their own. Mirrors can have their own reference module, which can define what accounts will be able to mirror or comment on the mirror.