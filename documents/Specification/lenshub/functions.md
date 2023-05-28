---
title: "State Changing Functions"
slug: "functions"
excerpt: "State changing functions in the LensHub.sol contract"
hidden: false
createdAt: "2022-01-18T23:28:11.514Z"
updatedAt: "2022-11-08T09:39:25.944Z"
---
## Meta-Transactions
All "`withSig`" meta-transaction functions have been omitted from this document, as they allow for the same functionality as their standard counterparts, only via EIP-712 meta-transactions. Also, the requirements in this specification are not presented in any order pertaining to security.

## initialize()

`function initialize(string calldata name, string calldata symbol, address newGovernance) external;.`

| Parameter Name | Type | Description |
| --- | --- | --- |
| name | string | The name to give to the Lens profile NFT. |
| symbol | string | The symbol to give to the Lens profile NFT. |
| newGovernance | address | The new governance address to set. |

This function initializes the proxy contract. 

It should...

1. Set the ERC721 name for the Lens profile NFT.
2. Set the ERC721 symbol for the Lens profile NFT.
3. Set the governance address.
4. Set the protocol state to `ProtocolState.Paused.`
5. Only be called once, unless the `REVISION` was incremented in a new implementation.
6. Not being called on the implementation (this has no security benefit in this specific context, but is a best practice).

## setGovernance()

`function setGovernance(address newGovernance) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| newGovernance | address | The new governance address to set |

This function sets the governance address. Note that we do not implement a built-in timelock or a 2-step governance change because it is assumed that the governance role will implement the necessary mechanisms.

It should...

1. Set the governance address.
2. Only be called by the current governance address.

## setEmergencyAdmin()

`function setEmergencyAdmin(address newEmergencyAdmin) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| newEmergencyAdmin | address | The new emergency admin address to set |

This function sets the emergency admin.

It should...

1. Set the emergency admin address.
2. Only be called by the current governance address.

## setState()

`function setState(DataTypes.ProtocolState state) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| state | Enum: DataTypes.ProtocolState | The ProtocolState to set. |

This function sets the current protocol state, between `ProtocolState.Paused`, `ProtocolState.PublishingPaused` and `ProtocolState.Unpaused`.

It should...

1. Set the protocol state.
2. Only be called by the current governance or emergency admin addresses.

## whitelistProfileCreator() 

`function whitelistProfileCreator(address profileCreator, bool whitelist) external`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileCreator | address | The profile creator to whitelist. |
| whitelist | bool | Whether to add or remove the profile creator from the whitelist |

This function sets whether a profile creator is whitelist, allowing or disallowing profile creation from that address.

It should...

1. Set whether or not a profile creator is whitelisted.
2. Only be called by the current governance address.

## whitelistFollowModule()

`function whitelistFollowModule(address followModule, bool whitelist) external`

| Parameter Name | Type | Description |
| --- | --- | --- |
| followModule | address | The follow module address to whitelist |
| whitelist | bool | Whether to add or remove the module from the whitelist |

This function sets whether a follow module is whitelisted, allowing or disallowing profiles to use it.

It should...

1. Set whether or not a follow module is whitelisted.
2. Only be called by the current governance address.
3. Not invalidate follow modules previously used then removed from the whitelist.

## whitelistReferenceModule()

`function whitelistReferenceModule(address referenceModule, bool whitelist) external`

| Parameter Name | Type | Description |
| --- | --- | --- |
| referenceModule | address | The reference module address to whitelist |
| whitelist | bool | Whether to add or remove the module from the whitelist |

This function whitelists a reference module, allowing new publications to use it.

It should...

1. Set whether or not a reference module is whitelisted.
2. Only be called by the current governance address.
3. Not invalidate reference modules that were previously used then removed from the whitelist.

## whitelistCollectModule()

`function whitelistCollectModule(address collectModule, bool whitelist) external`

| Parameter Name | Type | Description |
| --- | --- | --- |
| collectModule | address | The collect module address to whitelist |
| whitelist | bool | Whether to add or remove the module from the whitelist |

This function whitelists a collect module, allowing new publications to use it.

It should...

1. Set whether or not a collect module is whitelisted.
2. Only be called by the current governance address.
3. Not invalidate collect modules that were previously used then removed from the whitelist.

## createProfile()

`function createProfile(DataTypes.CreateProfileData calldata vars) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| to | address | The address to mint the profile to |
| handle | string | The handle to set for the new profile |
| imageURI | string | The URI to set for the new profile's image |
| followModule | address | The follow module to set for the new profile or the zero address |
| followModuleInitData | bytes | Arbitrary data to be decoded in the follow module for initialization |
| followNFTURI | string | The URI to set for the profile's follow NFT |

This function creates a profile.

It should...

1. Revert if the handle is already taken.
2. Revert if the handle contains characters that are not standard, Latin lowercase alphabet characters, or digits from 0 to 9.
3. Revert if the follow module selected is not whitelisted and not the zero address.
4. Revert if the follow module data is invalid when decoded in the follow module.
5. Revert if the caller is not a whitelisted profile creator.
6. Mint a profile NFT to the 'to' address with the id equal to the profile ID Counter + 1.
7. Increment the profile ID counter.
8. Map the handle, image URI and follow NFT URI to the profile NFT token ID (profileId).
9. Map the profile NFT token ID to the handle hash.
10. Set and initialize the selected follow module with the given data for the given profile.

## setFollowModule()

`function setFollowModule(uint256 profileId, address followModule, bytes calldata followModuleData) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The token ID of the profile to set the follow module for |
| followModule | address | The follow module to set for the profile |
| followModuleData | bytes | The arbitrary data to be decoded in the selected follow module for initialization |

This function sets the follow module for the specified profile.

It should...

1. Revert if the caller is not the profile owner.
2. Revert if the follow module selected is not whitelisted.
3. Revert if the follow module data is invalid when decoded in the follow module.
4. Set and initialize the selected follow module with the given data for the given profile.

## setDispatcher()

`function setDispatcher(uint256 profileId, address dispatcher) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The token ID of the profile to set the dispatcher for |
| dispatcher | address | The dispatcher to set for the profile |

This function sets the dispatcher for a given profile. Note that a profile's dispatcher can publish and set the URI on behalf of the profile above. Dispatchers should be invalidated if the profile NFT is owned by an address other than the one that set the dispatcher.

It should...

1. Revert if the caller is not the profile owner.
2. Set the dispatcher for the given profile.

## setProfileImageURI()

`function setProfileImageURI(uint256 profileId, string calldata imageURI) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The token ID of the profile to set the URI for. |
| imageURI | string | The URI to set for the profile image. |

This function sets the profile image URI, used to build the on-chain SVG returned on calls to `tokenURI()` in the hub.

It should...

1. Revert if the caller is not the profile owner or the profile's dispatcher.
2. Set the image URI for the given profile.

## setFollowNFTURI()

`function setFollowNFTURI(uint256 profileId, string calldata followNFTURI) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The token ID of the profile to set the follow NFT URI for |
| followNFTURI | string | The URI to set for the follow NFT |

This function sets the given profile's follow NFT URI, which is returned on calls to `tokenURI()` on the follow NFT. This must return a URI that points to a standardized JSON metadata.

It should...

1. Revert if the caller is not the profile owner or the profile's dispatcher.
2. Set the follow NFT URI for the given profile's follow NFT.

## post()

`function post(DataTypes.PostData calldata vars) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID to publish the post to |
| contentURI | string | The URI to set for this publication |
| collectModule | address | The collect module to set for this publication |
| collectModuleData | bytes | The arbitrary data to be decoded in the selected collect module for publication initialization |
| referenceModule | address | The reference module to set for this publication |
| referenceModuleData | bytes | The arbitrary data to be decoded in the selected reference module for publication initialization |

This function publishes a post to the given profile. 

It should...

1. Revert if the caller is not the profile owner or the profile's dispatcher.
2. Revert if the collect module is not whitelisted.
3. Revert if the reference module is not whitelisted and not the zero address.
4. Revert if the collect module data is invalid when decoded in the collect module.
5. Revert if the reference module data is invalid when decoded in the reference module.
6. Create a publication mapped to the profile via the latest profile publication ID counter + 1.
    1. The publication should have no pointer; all other fields should be non-zero, bar the reference module (though an empty URI is pointless, possible).
7. Increment the profile's publication ID counter.
8. Set and initialize the selected collect module with the given data for the given publication.
9. If it is not the zero address, set and initialize the selected reference module with the given data for the given publication.

## comment()

`function comment(DataTypes.CommentData calldata vars) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID to publish the comment to |
| contentURI | string | The URI to set for this publication |
| profileIdPointed | uint256 | The profile ID to point the comment to |
| pubIdPointed | uint256 | The publication ID to point the comment to |
| collectModule | address | The collect module to set for this publication |
| collectModuleData | bytes | The arbitrary data to be decoded in the selected collect module for publication initialization |
| referenceModule | address | The reference module to set for this publication |
| referenceModuleData | bytes | The arbitrary data to be decoded in the selected reference module for publication initialization |

This function publishes a comment to the given profile. 

It should...

1. Revert if the caller is not the profile owner or the profile's dispatcher.
2. Revert if the collect module is not whitelisted.
3. Revert if the reference module is not whitelisted and not the zero address.
4. Revert if the collect module data is invalid when decoded in the collect module.
5. Revert if the reference module data is invalid when decoded in the reference module.
6. Create a publication with a pointer to the specified publication being "commented on" mapped to the profile via the latest profile publication ID counter + 1.
    1. All publication fields should be non-zero, bar the reference module (though an empty URI is pointless, but possible).
7. Execute any reference module logic mapped to the pointed publication (even if it is a mirror).
8. Increment the profile's publication ID counter.
9. Set and initialize the selected collect module with the given data for the given publication.
10. If it is not the zero address, set and initialize the selected reference module with the given data for the given publication.

## commentWithSig()
`function commentWithSig(DataTypes.CommentWithSigData calldata vars) external;`

CommentWithSigData Struct Params:

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID to publish the comment to |
| contentURI | string | The URI to set for this publication |
| profileIdPointed | uint256 | The profile ID to point the comment to |
| pubIdPointed | uint256 | The publication ID to point the comment to |
| collectModule | address | The collect module to set for this publication |
| collectModuleData | bytes | The arbitrary data to be decoded in the selected collect module for publication initialization |
| referenceModule | address | The reference module to set for this publication |
| referenceModuleData | bytes | The arbitrary data to be decoded in the selected reference module for publication initialization |
| sig | EIP712Signature | The EIP712Signature struct containing the profile owner's signature |

Message Params and Types used for EIP712 signature passed above:

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID to publish the comment to |
| contentURI | string | The URI to set for this publication |
| profileIdPointed | uint256 | The profile ID to point the comment to |
| pubIdPointed | uint256 | The publication ID to point the comment to |
| collectModule | address | The collect module to set for this publication |
| collectModuleData | bytes | The arbitrary data to be decoded in the selected collect module for publication initialization |
| referenceModule | address | The reference module to set for this publication |
| referenceModuleData | bytes | The arbitrary data to be decoded in the selected reference module for publication initialization |
| nonce | uint256 | The profile owner signature nonce |
| deadline | uint256 | The unix timestamp by when signature expires |


This function publishes a comment to the given profile signed by the owner or dispatcher of the profile.

It should...

1. Revert if the recovered signature is not of the profile owner or the profile's dispatcher.
2. Revert if the signature deadline is before the `block.timestamp` in which tx is included.
3. Revert if the signature is not compliant with EIP712 and based on the current contract and chain ID.
4. Revert if the collect module is not whitelisted.
5. Revert if the reference module is not whitelisted and not the zero address.
6. Revert if the collect module data is invalid when decoded in the collect module.
7. Revert if the reference module data is invalid when decoded in the reference module.
8. Create a publication with a pointer to the specified publication being "commented on" mapped to the profile via the latest profile publication ID counter + 1.
    1. All publication fields should be non-zero, bar the reference module (though an empty URI is pointless, but possible).
9. Execute any reference module logic mapped to the pointed publication (even if it is a mirror)
10. Increment the profile's publication ID counter.
11. Set and initialize the selected collect module with the given data for the given publication.
12. If it is not the zero address, set and initialize the selected reference module with the given data for the given publication.

## mirror()

`function mirror(DataTypes.MirrorData calldata vars) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID to publish the mirror to |
| profileIdPointed | uint256 | The profile ID to point the mirror to |
| pubIdPointed | uint256 | The publication ID to point the mirror to |
| referenceModuleData | bytes | The arbitrary data passed to the reference module |
| referenceModule | address | The reference module to set for this publication |
| referenceModuleInitData | bytes | The arbitrary data to be decoded in the selected reference module for publication initialization |

This function publishes a mirror to the given profile. 

It should...

1. Revert if the caller is not the profile owner or the profile's dispatcher.
2. Revert if the reference module is not whitelisted and not the zero address.
3. Revert if the reference module data is invalid when decoded in the reference module.
4. Create a publication with a pointer to the specified publication being "mirrored" mapped to the profile via the latest profile publication ID counter + 1.
    1. The publication should have no content URI and no collect module, all other fields should be non-zero, bar the reference module.
5. Execute any reference module logic mapped to the pointed publication (**if it is a mirror, execute the logic on the original publication being mirrored in the first place**).
6. Increment the profile's publication ID counter.
7. If it is not the zero address, set and initialize the selected reference module with the given data for the given publication.

## burn()

`function burn(uint256 profileId) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the token to burn. |

This function burns a profile NFT. Burned profiles should not be able to be followed.

It should...

1. Revert if the caller is not the profile owner.
2. Burn the profile NFT.
3. Prevent the burned profile from being followed.
4. Have no effect on previous publications made by the burned profile.
5. Have no effect on the profile ID counter (i.e. the next profile created should have an ID that is unaffected whether profiles were or were not burned previously).
6. Release the handle mapped to the previous publication, allowing it to be claimed by a new profile.

## follow()

`function follow(uint256[] calldata profileIds, bytes[] calldata datas) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileIds | uint256[] | The array of profile IDs to follow |
| datas | bytes[] | The array of arbitrary data to pass to each profile being followed's follow module |

This function follows the given profiles, minting one of each profile's follow NFTs to the follower. Note that there is no issue with following the same profile multiple times.

It should...

1. Revert if the `profileIds` and `datas` arrays are of different length.
2. Revert if a profile ID passed as input does not have a corresponding profile (a profile followed does not exist).
3. Execute any follow module logic mapped to the profile being followed, if any, passing the data parameter at the same index as the profile ID in the input arrays.
4. If it does not exist for the given profile, clone the follow NFT implementation and initialize it.
5. Mint follow NFTs for each profile to the follower with ID equal to the given follow NFT's token ID counter + 1 in each case.
6. Increment the token ID counter in each follow NFT.

## collect()

`function collect(uint256 profileId, uint256 pubId, bytes calldata data) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication being collected |
| pubId | uint256 | The publication ID of the publication being collected |
| data | bytes | The arbitrary data being passed to the publication's collect module |

This function collects the given publication.

It should...

1. Revert if the profile ID passed as input does not have a corresponding profile (the profile does not exist).
2. Revert if the publication ID passed as input does not have a corresponding publication (the publication does not exist).
3. Execute collect module logic mapped to the publication being collected, passing the data parameter as input.
4. If it does not exist for the given publication, clone the collect NFT implementation and initialize it.
5. Mint a collect NFT pointing to the publication to the follower with ID equal to the given collect NFT's token ID counter + 1.
6. Increment the token ID counter in the collect NFT.

## emitFollowNFTTransferEvent()

`function emitFollowNFTTransferEvent(uint256 profileId, uint256 followNFTId, address from, address to) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID mapped to the follow NFT being transferred. |
| followNFTId | uint256 | The follow NFT ID of the follow NFT being transferred. |
| from | address | The address the follow NFT is being transferred from. |
| to | address  | The address the follow NFT is being transferred to. |

This function emits an event when a follow NFT is transferred, to be more easily consumed by clients.

It should...

1. Revert if the caller is not the follow NFT mapped to the given profile ID.
2. Only be called when a follow NFT is being transferred via `beforeTokenTransfer().`

## emitCollectNFTTransferEvent()

`function emitCollectNFTTransferEvent(uint256 profileId, uint256 pubId, uint256 collectNFTId, address from, address to) external;`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID mapped to the collect NFT being transferred |
| pubId | uint256 | The publication ID mapped to the collect NFT being transferred |
| collectNFTId | uint256 | The collect NFT ID of the collect NFT being transferred |
| from | address | The address the collect NFT is being transferred from |
| to | address  | The address the collect NFT is being transferred to |

This function emits an event when a follow NFT is transferred, to be more easily consumed by clients.

It should...

1. Revert if the caller is not the collect NFT mapped to the given profile ID and publication ID.
2. Only be called when a collect NFT is being transferred via `beforeTokenTransfer().`