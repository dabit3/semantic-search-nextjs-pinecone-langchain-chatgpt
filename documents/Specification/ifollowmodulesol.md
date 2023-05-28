---
title: "Follow Modules"
slug: "ifollowmodulesol"
hidden: false
createdAt: "2022-01-28T04:02:45.919Z"
updatedAt: "2022-08-16T19:53:42.953Z"
---
Follow Module Interface
=======================

This is the interface all Lens Protocol Compatible Follow modules must implement.

initializeFollowModule()
------------------------

`function initializeFollowModule(uint256 profileId, bytes calldata data) external;`

| Parameter Name | Type    | Description                                                      |
| -------------- | ------- | ---------------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile to initialize this follow module for |
| data           | bytes   | Arbitrary data passed by the profile creator                     |

This function initializes the follow module for a given Lens profile. The hub contract can only call this.

processFollow()
---------------

`function processFollow(address follower, uint256 profileId, bytes calldata data) external;`

| Parameter Name | Type    | Description                                |
| -------------- | ------- | ------------------------------------------ |
| follower       | address | The follower address                       |
| profileId      | uint256 | The token ID of the profile being followed |
| data           | bytes   | Arbitrary data passed by the follower      |

This function processes a given follow; this can only be called from the LensHub contract.

followModuleTransferHook()
--------------------------

`followModuleTransferHook(uint256 profileId, address from, address to, uint256 followNFTTokenId) external;`

| Parameter Name   | Type    | Description                                                                   |
| ---------------- | ------- | ----------------------------------------------------------------------------- |
| profileId        | uint256 | The token ID of the profile associated with the follow NFT being transferred. |
| from             | address | The address sending the follow NFT                                            |
| to               | address | The address receiving the follow NFT                                          |
| followNFTTokenId | uint256 | The token ID of the follow NFT being transferred                              |

This is a transfer hook that is called upon follow NFT transfer in `beforeTokenTransfer.` This can only be called from the LensHub contract. 

NOTE: Special care needs to be taken here: It is possible that follow NFTs were issued before this module was initialized if the profile's follow module was previously different. This transfer hook should consider this, especially when the module holds state associated with individual follow NFTs.

function validateFollow()
-------------------------

`function validateFollow(uint256 profileId, address follower, uint256 followNFTTokenId) external view;`

| Parameter Name   | Type    | Description                                             |
| ---------------- | ------- | ------------------------------------------------------- |
| profileId        | uint256 | The token ID of the profile to validate the follow for. |
| follower         | address | The follower address to validate the follow for.        |
| followNFTTokenId | uint256 | The followNFT token ID to validate the follow for.      |

This is a helper function that could be used in conjunction with specific collect modules.

NOTE: This function IS meant to replace a check on follower NFT ownership.

NOTE: It is assumed that not all collect modules are aware of the token ID to pass. In these cases, this should receive a `followNFTTokenId` of 0, which is impossible regardless.

One example of a use case for this would be a subscription-based following system:  
      1. The collect module:  
          - Decodes a follower NFT token ID from user-passed data.  
          - Fetches the follow module from the hub.  
          - Calls `validateFollow` passing the profile ID, follower & follower token ID.  
      2. The follow module:  
          - Validates the subscription status for that given NFT, reverting on an invalid subscription.

Whitelisted Follow Modules
==========================

Approval Follow Module
----------------------

The [Approval Follow Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/follow/ApprovalFollowModule.sol) only allows addresses that are approved for a profile by the profile owner to follow. Users can use the `approve()` function to add/remove addresses from the Approved Array. the `isApproved()` or `isApprovedArray()` functions allow applications to check which address(es) are approved by a given user.

Fee Follow Module
-----------------

The [Fee Follow Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/follow/FeeFollowModule.sol) only allows addresses to follow a given profile, so long as they pay a fee specified by the profile owner. Users can set the currency and amount required to be paid so long as the `currency` has been whitelisted by governance. Additionally, governance can adjust the `treasuryFee` variable to direct some of the follow fees to a specified treasury address.