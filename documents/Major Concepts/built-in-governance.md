---
title: "Built-In Governance"
slug: "built-in-governance"
excerpt: "Follow NFTs include built-in governance mechanisms -- any profile can spin up a DAO in minutes!"
hidden: true
createdAt: "2022-02-02T19:43:41.080Z"
updatedAt: "2022-02-08T14:58:09.292Z"
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b884716-illustration_governance.svg",
        "illustration_governance.svg",
        536,
        240,
        "#00501e"
      ]
    }
  ]
}
[/block]
## Follow NFT Overview
When following a profile, followers obtain a `FollowNFT,` which is the core building block of the Lens Protocol social graph! From a technical perspective, these NFTs contain governance-specific logic that allows for the following:
* Power delegation (via `delegate()`)
* Power delegation by meta-transaction (via `delegateBySig()`)
* Fetching power at a specific block number (via `getPowerByBlockNumber()`)
* Fetching total delegated supply at a specific block number (via `getDelegatedSupplyByBlockNumber()`)

Note that by default, delegation is inactive, so followers need to delegate, either to themselves or to another trusted user to partake in governance!

Now that's cool and all... But how do you *use* this to build a *DAO?*
## Just DAO It!
To spin up a DAO, all you've got to do is deploy a contract that interfaces with the Follow NFT's built-in functionality. It should allow for proposal creation and interface with the given profile's Follow NFTs to read governance power at the appropriate blocks for voting -- that's it!

In a nutshell, a governance contract would need to handle...
* Proposal creation
* Voting with FollowNFTs at the given past snapshot (facilitated by the aforementioned FollowNFT functions!)
* Proposal Queuing
* Proposal execution

But this is just a basic list of requirements and only scratches the surface of what's possible!