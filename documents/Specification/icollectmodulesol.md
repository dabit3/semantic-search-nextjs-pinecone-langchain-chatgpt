---
title: "Collect Modules"
slug: "icollectmodulesol"
hidden: false
createdAt: "2022-01-28T04:09:59.646Z"
updatedAt: "2023-02-26T14:30:33.056Z"
---
# Collect Module Interface

This is the interface all Lens Protocol Compatible Collect modules must implement.

## initializePublicationCollectModule()

`function initializePublicationCollectModule(uint256 profileId, uint256 pubId, bytes calldata data) external returns (bytes memory);`

| Parameter Name | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| profileId      | uint256 | The token ID of the profile publishing the publication |
| pubId          | uint256 | The associated publication's LensHub publication ID    |
| data           | bytes   | Arbitrary data passed by the profile creator           |

This function initializes data for a given publication being published. This can only be called by the LensHub contract.

It returns an ABI encoded byte array encapsulating the execution's state changes. This will be emitted by the hub alongside the collect modules address and should be consumed by the front ends.

## processCollect()

`function processCollect(uint256 referrerProfileId, address collector, uint256 profileId, uint256 pubId, bytes calldata data) external;`

| Parameter Name    | Type    | Description                                                                 |
| ----------------- | ------- | --------------------------------------------------------------------------- |
| referrerProfileId | uint256 | The token ID of the profile associated with the publication being collected |
| collector         | address | The address collecting the publication                                      |
| pubId             | uint256 | The LensHub publication ID associated with the publication being collected  |
| data              | bytes   | Arbitrary data passed by the collector to be decoded                        |

This function processes a collect action for a given publication; this can only be called by the Lens Hub contract.

# Whitelisted Collect Modules

## Revert Collect Module

The [Revert Collect Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/collect/RevertCollectModule.sol) causes all collect actions on a given post to fail, thus making the post uncollectible.

## Free Collect Module

The [Free Collect Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/collect/FreeCollectModule.sol) allows any profile to collect the publication this module is attached to.

## Fee Collect Module

The [Fee Collect Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/collect/FeeCollectModule.sol) allows for any follower to collect the associated publication provided they pay a fee set by the poster. This fee must be denominated in a whitelisted currency. Additionally, the poster can specify a portion of the fee that goes to a user who mirrors this publication, should the collect action be executed via their mirrored post.

Lastly, governance can add a treasury fee, which will send a portion of the collect fee to a designated treasury address.

## Limited Fee Collect Module

The [Limited Fee Collect Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/collect/LimitedFeeCollectModule.sol) allows for any follower to collect the associated publication, provided they pay a fee, up to a specific limit of mints. As with the Fee Collect Module, the fee must be denominated in a whitelisted currency, a mirror fee can be specified, and governance can direct a treasury fee to a designated treasury address.

## Timed Fee Collect Module

The [Timed Fee Collect Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/collect/TimedFeeCollectModule.sol) allows for any follower to collect the associated publication, provided they pay a fee, up to a specific time limit. The present whitelisted Timed Fee Collect module only has a 24-hour time limit to reduce gas usage and optimize efficiency. 

As with the Fee Collect Module, the fee must be denominated in a whitelisted currency, a referral fee can be specified, and governance can direct a treasury fee to a designated treasury address.

Note, if uninitialized, no fee will be specified. Only the time limit will be checked, providing functionality similar to the Free Collect Module with a time limit for mint added.

## Limited Timed Fee Collect Module

The [Limited Timed Fee Collect Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/collect/LimitedTimedFeeCollectModule.sol) allows for any follower to collect the associate publication, provided they pay a fee, up to a specific time limit and mint cap. It is essentially a combination of the Timed Fee Collect Module and the Limited Fee Collect Module.

As with the base Fee Collect Module, the fee must be denominated in a whitelisted currency. A referral fee can be specified, and governance can direct a treasury fee to a designated treasury address.

Additionally, as with the Timed Fee Collect Module, no fee will be specified if uninitialized. Only the time limit and mint cap will be checked, providing functionality similar to the Free Collect Module with a time limit for mint and mint cap added.

## Multi Recipient Fee Collect Module

This module supports splitting the collect fees between multiple recipients. It also supports timed and limited fee collects optionally, so you can use it to support almost every use case. You can specify fees for Charity's, Contributors, Co-creators, DAO's, Other contracts.

e.g.

- Contributor (sponsor,video editor)—20%
- Charity—10%
- DAO — 10%
- Creator—60%