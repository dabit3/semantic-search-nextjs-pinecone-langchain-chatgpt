---
title: "Profile"
slug: "profile"
hidden: false
createdAt: "2022-01-25T21:54:55.714Z"
updatedAt: "2023-04-27T23:19:15.993Z"
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5ab3179-illustration_cultivate.svg",
        "illustration_cultivate.svg",
        372,
        340,
        "#00501e"
      ]
    }
  ]
}
[/block]
The Profile NFT is the main object in the Lens Protocol. It is ownership over this NFT that gives you control of your content. Individual addresses own ProfileNFTs, and an address can contain multiple ProfileNFTs. What differentiates the Lens Profile NFT from other on-chain identities is the ability to post [Publications](doc:publication) to it. The Profile NFT contains the history of all of the posts, [mirrors](doc:mirror), [comments](doc:comment), and other content you generate.

Additionally, Profile NFTs contain a [FollowModule](doc:follow). This module contains the logic that allows different accounts to be issued Follow NFTs to record their relationship to the main profile on-chain.

Profiles can only be minted by addresses that have been whitelisted by governance. This ensures that, given the low-fee environment present on Polygon, the namespace is not reserved by squatters. If you are building an application on Lens that requires the minting of Profiles, please join the [Discord](https://discord.gg/lensprotocol) and get in touch!