---
title: "Developers FAQ"
slug: "faq"
hidden: false
createdAt: "2022-05-16T11:47:48.265Z"
updatedAt: "2022-12-01T11:36:16.651Z"
---
## I am developing but have some doubts, where can I discuss these?

The best place to ask any dev related questions is the discord channel [here](https://discord.gg/lensprotocol)  
Head to the developer & QA section and a team member will be able to help you! 

## I want to apply for a grant to build on Lens Protocol, how can I do this?

You can learn more about the Lens Protocol grants program [here](https://www.notion.so/aave/Grants-Application-eec79f59fbad4e34b51acc3c936073a2). You can apply for a grant by filling out [this form](https://airtable.com/shrUkRIxqcKgS05dX). 

## If I have queries about grants, integrations, and partnerships, where’s the best place to direct them?

You can direct such queries to [ecosystem@lens.xyz](mailto:ecosystem@lens.xyz) 

## Where can I get Lens API?

You can find Lens API [here](https://docs.lens.dev/docs/api-links).

## Are there developer resources for Windows?

We do not offer formal support yet for non-UNIX based machines. You might want to try to work with WSL2 or move to UNIX based environment.

## Who pays the network-related “gas fees” for transactions on Lens Protocol?

It depends. Users can pay their own gas fees for any transactions on the Lens Protocol. However, certain interfaces might use a relayer to allow “gas free” usage of the network for Lens Protocol transactions or may even subsidize part of the gas fees. 

## How do I unfollow a profile?

To unfollow a profile, you either need to burn or transfer the specific follow NFT from your wallet. To burn it, send it to the address 0x00..00.

## How can I track the follow actions of a list of addresses?

To do this, you will need to listen to the follow events and save them every time the action happens. You will also need to look out for each profile’s follower NFTs to see when someone unfollows (aka burns) or otherwise use the API to get it from there. 

## How do I follow profiles that have specific follow module logic?

You can just call createFollowTypedData and it will map it all for you. You can find an example [here](https://docs.lens.dev/docs/create-follow-typed-data).

## How do I apply to have my address enabled to mint profiles?

The reason profile creation is protected by an allowlist for now is to allow as many users as possible to claim the handle they would like and deter mass claiming. It also allows users to reserve certain usernames and other names they own on web3. Once everyone on the allowlist has claimed their handle and the process of claiming is more mature, it may be possible that the allowlist could be revoked to allow anyone to create a profile. 

## How do comments point to each other?

Comments are linked to their publication and can have an unlimited depth of pointers. When creating a comment, it is pointed to a publication which allows the UI interface to define the structure of how these publications are shown and loaded. Each comment has reference to the pointer so you can always get back to the start recursively. 

## Which API categories require the auth token?

To see which categories, require the auth token, visit Lens protocol docs [here](https://docs.lens.dev/docs/introduction) to see at the top whether it is required or not. 

## Can any kind of address be used to post publications or contracts?

Any Ethereum address can post publications. Therefore, a contract can post if they own the profile. There is a feature on the contracts called “dispatcher” which allows you to put an Ethereum address on the allowlist which then enables that address to post publications and perform other actions on behalf of the owner. 

## Do we have to supply the publication ID when creating a comment?

Yes, you need to provide a publication ID but this will be specific to your profile. For example, your first publication might be id 1, second id 2, etc. 

## Do we need to use Lens native NFT contracts, or can we deploy on other testing and mainnet networks?

For testing purposes you can, and it is highly encouraged to use the Lens testnet deployment on Mumbai. You can also deploy your own version locally or on whichever testnet or mainnet you prefer, but if you do so, there won’t be API support.

## How could a mirrored post be displayed?

Mirrors are the Lens equivalent to reposting or re-amplifying exisiting content. For example, if Karen sees Chad's post and wants to repost it, this action is called a "mirroring" on Lens. You can store additional data to the post you are mirroring, meaning you can also provide commentary. For example, if Karen mirrors Chad's post, she can also add to the post by herself adding "Love this post, Chad!"

## Is It possible to build any type of application on Lens even if there are other similar applications (for example, if there is one messaging application, can I build another?)

The possibilities of building on top of Lens are infinite and whilst the chances of duplicate applications being built are there, each will have its own unique metric. Just make sure you do not infringe on anyone else’s IP when you’re building.

## Do you have to follow a profile to collect its publications?

Not necessarily; it depends on the logic of the collect module.

## Is there an API call to edit publications?

No, it is not possible to edit publications directly. However, If the content URI points to some editable storage, then you can edit publications via updating what the URI returns.

## Is it possible to register an NFT profile?

Profile NFTs are resolved for you with on-chain svgs; you cannot set your own profile NFT as handles (usernames). Your profile picture is taken from the image set into the NFT. 

## Can Lens Protocol be used to develop a social platform that is 90% audio?

Yes, Lens is a protocol that defines how social content can be relational on chain. Any form of content—text, audio, or video—can be used with Lens Protocol. 

## I got the error HANDLE_TAKEN whilst trying to create a profile. What do I do?

This error means that the handle you are requesting is already in use for another profile and you will need to request a different one. All handles are unique and cannot be duplicated. 

## How do I fetch all the profile IDs owned by a specific address?

You can do this by using the API call “get profile” and filtering by “owned by”. Find more details on this [here](https://docs.lens.dev/docs/get-profiles).

## Does the protocol collect fees?

The protocol has capacity to take fees, but this is currently disabled. 

## How does the publication’s format work?

It is required to conform to the metadata standards if you wish to use the API and have common ground with the UIs, you can find out more about this standard [here](https://docs.lens.dev/docs/metadata-standards). The standard outlined allows the publication NFTs to be supported on Open Sea and other marketplaces. That said, the protocol has no constraints on this standard so if you wanted to set your own standard that is fine. However, if you do this, it may not work on other UIs and may also not be compatible with the API, therefore it is heavily advised that you use our standards for compatibility across all Dapps. 

## Do profiles follow other profiles, or what about other types of interactions?

No, in Lens Protocol the specific wallet is the one following profiles and holding the Follow NFTs that represent this. The follow interaction is not based on a profile but on a specific wallet. Other interactions such as posts, mirrors, and comments will be performed by profiles.

## What is the default profile variable for and how do I set up a different profile per interaction?

Because an address can hold multiple profiles and there are address-based interactions such as follow or collect, the default profile variable allows the owner to select one profile as its default. This gives interfaces the ability to shape how such interactions are displayed based on the default profile rather than just an address. For example, a profile may want to display the interaction of Alice following Bob rather than Alice’s address which followed Bob. You can use the set default profile function to choose a new profile to interact with by default. To do this, view the code for the specific command [here](https://docs.lens.dev/docs/create-set-default-profile-typed-data).

## How can I adapt the core protocol?

It isn’t possible to change the core protocol, but you can create follow, reference, and collect modules and even extend the protocol by building contracts on top of it. 

## How can I set up where the collected fees are directed?

It depends on how the collect module set for the publication has been built. For example, one collect module could let the publisher decide which address or addresses will receive the fees, but another could have a fixed fee recipient or other logic.

## Where is the data created by Lens Protocol’s interactions stored?

Lens Protocol is agnostic of the content storage; it can be stored on decentralized, immutable solutions such as IPFS or in centralized services, depending on the use case. In the future, this could open room for the possibility of hosting content in a storage service that has not yet been invented!