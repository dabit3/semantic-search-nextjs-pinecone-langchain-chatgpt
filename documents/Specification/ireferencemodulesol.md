---
title: "Reference Modules"
slug: "ireferencemodulesol"
hidden: false
createdAt: "2022-01-28T04:09:42.504Z"
updatedAt: "2023-01-11T12:16:21.482Z"
---
Reference Module Interface
==========================

This is the interface all Lens Protocol Compatible Reference modules must implement.

initializeReferenceModule()
---------------------------

`function initializeReferenceModule(uint256 profileId, uint256 pubId, bytes calldata data) external returns (bytes memory);`

| Parameter Name | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| profileId      | uint256 | The token ID of the profile publishing the publication |
| pubId          | uint256 | The associated publication's LensHub publication ID    |
| data           | bytes   | Arbitrary data passed by the profile creator           |

This function initializes data for a given publication being published. This can only be called by the hub.

It returns an ABI encoded byte array encapsulating the execution's state changes. This will be emitted by the hub alongside the collect module's address and consumed by the front ends.

processComment()
----------------

`function processComment(uint256 profileId, uint256 profileIdPointed, uint256 pubIdPointed) external;`

| Parameter Name   | Type    | Description                                                                    |
| ---------------- | ------- | ------------------------------------------------------------------------------ |
| profileId        | uint256 | The token ID of the profile associated with the publication being published    |
| profileIdPointed | uint256 | The profile ID of the profile associated with the publication being referenced |
| pubIdPointed     | uint256 | The publication ID of the publication being referenced                         |

This function processes a comment action referencing a given publication. This function can only be called by the LensHub contract.

processMirror()
---------------

`function processMirror(uint256 profileId, uint256 profileIdPointed, uint256 pubIdPointed) external;`

| Parameter Name   | Type    | Description                                                                    |
| ---------------- | ------- | ------------------------------------------------------------------------------ |
| profileId        | uint256 | The token ID of the profile associated with the publication being published    |
| profileIdPointed | uint256 | The profile ID of the profile associated with the publication being referenced |
| pubIdPointed     | uint256 | The publication ID of the publication being referenced                         |

This function processes a mirror action referencing a given publication. This function can only be called by the LensHub contract.

Whitelisted Reference Modules
=============================

Follower Only Reference Module
------------------------------

The [Follower Only Reference Module](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/core/modules/reference/FollowerOnlyReferenceModule.sol) ensures that only a profile is allowed to mirror or comment on content if that wallet contains the FollowNFT of the profile that posted the comment they are mirroring or commenting on.