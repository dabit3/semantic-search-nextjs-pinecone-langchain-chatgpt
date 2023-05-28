---
title: "Publication"
slug: "publication"
hidden: false
createdAt: "2022-01-25T21:55:19.920Z"
updatedAt: "2022-10-02T16:15:13.149Z"
---
![](https://files.readme.io/bf7d31b-illustration_post.svg "illustration_post.svg")



Publications are the lifeblood of the Lens Protocol. They are all of the original content, comments, and mirrors produced by creators, curators, and users alike. Publications come in three primary types: posts, comments, and mirrors. Posts are the base object, with mirror and comment providing additional functionality. To learn more about [Mirrors](doc:mirror) and [Comments](doc:comment) please go to their respective documentation pages.

Publications are posted directly to a user's [ProfileNFTs](doc:profile); this ensures that all content created by a user remains user-owned and in their wallet. Publications are **NOT** NFT's.

Publications have a ContentURI which points to the specific content the publication contains, this can point to text, an image, a video, or other arbitrary content stored on either a decentralized protocol such as [IPFS](https://ipfs.io/) or [Arweave](https://www.arweave.org/), or a centralized storage provider like AWS S3.

Publications also have two attached modules, a Collect Module, and a Reference Module. The [Collect Module](doc:collect) contains the logic that allows other users to mint your publication into an NFT. This NFT will reference the original Publication's URI. The Reference Module controls references to the publication itself. It contains the logic that determines who can [comment](doc:comment) and [mirror](doc:mirror) the publication.