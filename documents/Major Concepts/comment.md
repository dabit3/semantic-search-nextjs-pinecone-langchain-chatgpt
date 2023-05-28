---
title: "Comment"
slug: "comment"
hidden: false
createdAt: "2022-01-25T21:56:48.157Z"
updatedAt: "2022-02-06T18:20:40.770Z"
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6527e50-illustration_comment.svg",
        "illustration_comment.svg",
        328,
        240,
        "#00501e"
      ]
    }
  ]
}
[/block]
Comments allow users to provide additional commentary on other publications. They are treated the same as base [Publications](doc:publication) with extra checks and features. Like publications, comments live in the user's [Profile NFT](doc:profile) and therefore are wholly owned by the user.

Since comments reference other publications, they are subject to the original publication's Reference Module conditions. If a publication has a reference module that limits comments only to accounts who [follow](doc:follow) the original poster, and the commenter does not hold a Follow NFT, the transaction to comment will fail.

Just like regular publications, comments also have Collect and Reference Modules. Collect modules define how a comment can be minted into an NFT that references the comment's ContentURI. The Reference module contains logic that determines who can comment or mirror the new comment.