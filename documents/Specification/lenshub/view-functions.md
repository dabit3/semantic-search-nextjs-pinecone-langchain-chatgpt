---
title: "View Functions"
slug: "view-functions"
excerpt: "View functions in the LensHub.sol contract"
hidden: false
createdAt: "2022-01-27T18:03:51.731Z"
updatedAt: "2022-02-10T01:26:54.858Z"
---
### isFollowModuleWhitelisted()

`function isFollowModuleWhitelisted(address followModule) external view returns (bool);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| followModule | address | The follow module to fetch whitelist status for |

**Returns**

| Type | Description |
| --- | --- |
| bool | Whether the queried follow module is whitelisted |

This function returns whether a follow module is whitelisted.

It should...

1. Return `true` if a follow module is whitelisted, `false` otherwise.

### isReferenceModuleWhitelisted()

`function isReferenceModuleWhitelisted(address referenceModule) external view returns (bool);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| referenceModule | address | The reference module to fetch whitelist status for |

**Returns**

| Type | Description |
| --- | --- |
| bool | Whether the queried reference module is whitelisted |

This function returns whether a reference module is whitelisted.

It should...

1. Return `true` if a reference module is whitelisted, `false` otherwise.

### isCollectModuleWhitelisted()

`function isCollectModuleWhitelisted(address collectModule) external view returns (bool);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| collectModule | address | The collect module to fetch whitelist status for |

**Returns**

| Type | Description |
| --- | --- |
| bool | Whether the queried collect module is whitelisted |

This function returns whether a collect module is whitelisted.

It should...

1. Return `true` if a collect module is whitelisted, `false` otherwise.

### getGovernance()

`function getGovernance() external view returns (address);`

**Returns**

| Type | Description |
| --- | --- |
| address | The current governance address |

This function returns the current governance address.

It should...

1. Return the current governance address.

### getDispatcher()

`function getDispatcher(uint256 profileId) external view returns (address);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile to fetch the dispatcher for |

**Returns**

| Type | Description |
| --- | --- |
| address | The dispatcher for the queried address, if any |

This function returns the dispatcher for the given profile if any.

It should...

1. Return the dispatcher address set for a given profile if it exists (which can be the zero address).
2. Return the zero address if the profile does not exist

### getPubCount()

`function getPubCount(uint256 profileId) external view returns (uint256);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile to fetch the publication count for |

**Returns**

| Type | Description |
| --- | --- |
| uint256 | The publication count for the given profile, or zero |

This function returns the publication count for the given profile.

It should...

1. Return the publication count for the given profile if the profile exists (which can be zero).
2. Return zero if the profile does not exist.

### getFollowNFT()

`function getFollowNFT(uint256 profileId) external view returns (address);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile to fetch the follow NFT for |

**Returns**

| Type | Description |
| --- | --- |
| address | The follow NFT mapped to the given profile, if any |

This function returns the follow NFT for the given profile, if any.

It should...

1. Return the follow NFT for the given profile if the profile exists (which can be the zero address).
2. Return the zero address if the profile does not exist.

### getCollectNFT()

`function getCollectNFT(uint256 profileId, uint256 pubId) external view returns (address);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication to fetch the collect NFT for |
| pubId | uint256 | The publication ID to fetch the collect NFT for. |

**Returns**

| Type | Description |
| --- | --- |
| address | The collect NFT mapped to the given publication if any |

This function returns the collect NFT for the given publication, if any.

It should...

1. Return the collect NFT for the given publication if the publication exists (which can be the zero address).
2. Return the zero address if the publication does not exist.

### getFollowNFTURI()

`function getFollowNFTURI(uint256 profileId) external view returns (string memory);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile to fetch the follow NFT URI for |

**Returns**

| Type | Description |
| --- | --- |
| string memory | The follow NFT URI mapped to the given profile |

This function returns the follow NFT URI for the given profile.

It should...

1. Return the follow NFT URI for the given profile (which can be an empty string).

### getFollowModule()

`function getFollowModule(uint256 profileId) external view returns (address);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile to fetch the follow module for |

**Returns**

| Type | Description |
| --- | --- |
| address | The follow module mapped to the given profile, if any |

This function returns the follow module for the given profile, if any.

It should...

1. Return the follow module for the given profile if the profile exists (which can be the zero address).
2. Return the zero address if the profile does not exist.

### getCollectModule()

`function getCollectModule(uint256 profileId, uint256 pubId) external view returns (address);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication to fetch the collect module for. |
| pubId | uint256 | The publication ID to fetch the collect module for |

**Returns**

| Type | Description |
| --- | --- |
| address | The collect module mapped to the given publication |

This function returns the collect module for the given publication. Note that a publication should not have the zero address as a collect module.

It should...

1. Return the collect module for the given publication if the publication exists.
2. Return the zero address if the publication does not exist.

### getReferenceModule()

`function getReferenceModule(uint256 profileId, uint256 pubId) external view returns (address);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication to fetch the reference module for. |
| pubId | uint256 | The publication ID to fetch the reference module for |

**Returns**

| Type | Description |
| --- | --- |
| address | The reference module mapped to the given publication, if any |

This function returns the reference module for the given publication, if any.

It should...

1. Return the reference module for the given publication if the publication exists (which can be the zero address).
2. Return the zero address if the publication does not exist.

### getHandle()

`function getHandle(uint256 profileId) external view returns (string memory);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID to fetch the handle for |

**Returns**

| Type | Description |
| --- | --- |
| string | The handle mapped to the given profile, if any |

This function returns the handle for the given profile.

It should...

1. Return the handle for the given profile if the profile exists.
2. Return an empty string if the profile does not exist.

### getPubPointer()

`function getPubPointer(uint256 profileId, uint256 pubId) external view returns (uint256, uint256);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication to fetch the publication pointer fo |
| pubId | uint256 | The publication ID to fetch the publication pointer for |

**Returns**

| Type | Description |
| --- | --- |
| uint256 | The profile ID pointed by the given publication, if any |
| uint256  | The publication ID pointed by the given publication, if any |

This function returns the publication pointer mapped to the given publication, if any. Pointers only exist for mirrors and comments; they indicate the publication being "mirrored" or "commented" on and should never be non-zero for posts.

It should...

1. Return the profile and publication IDs pointed by the given publication if the publication exists (which can both be zero, but neither should ever be zero if the other is zero)
2. Return both values as zero if the publication does not exist

### getContentURI()

`function getContentURI(uint256 profileId, uint256 pubId) external view returns (string memory);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication to fetch the content URI for. |
| pubId | uint256 | The publication ID to fetch the content URI for |

**Returns**

| Type | Description |
| --- | --- |
| string | The URI mapped to the given publication, if any |

This function returns the content URI mapped to the given publication, if any. Note that content URIs only exist for posts and comments and should always be empty for mirrors.

It should...

1. Return the content URI mapped to the given publication if the publication exists (which can be an empty string)
2. Return the content URI mapped to the pointed publication if the given publication is a mirror.
3. Return an empty string if the publication does not exist

### getProfileIdByHandle()

`function getProfileIdByHandle(string calldata handle) external view returns (uint256);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| handle | string | The handle to use to query the profile ID |

**Returns**

| Type | Description |
| --- | --- |
| uint256 | The profile ID of the profile with the given handle, if any |

This function returns the profile ID of the profile mapped to a given handle, if any.

It should...

1. Return the profile ID of the profile mapped to the given handle.
2. Return zero if there is no profile with this handle.

### getProfile()

`function getProfile(uint256 profileId) external view returns (DataTypes.ProfileStruct memory);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID to query the profile struct for |

**Returns**

| Struct Member Name | Type | Description |
| --- | --- | --- |
| pubCount | uint256 | The publication count associated with this profile |
| followModule | address | The follow module associated with this profile, if any |
| followNFT | address | The follow NFT associated with this profile, if any |
| handle | string | The handle associated with this profile |
| imageURI | string | The URI associated with this profile's image |
| followNFTURI | string | The URI associated with this profile's follow NFT |

This function returns the profile struct of the profile mapped to a given token ID.

It should...

1. Return the profile struct for a given profile if the profile exists.
2. Return an empty struct if the profile doesn't exist.

### getPub()

`function getPub(uint256 profileId, uint256 pubId) external view returns (DataTypes.PublicationStruct memory);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication to fetch the publication struct for. |
| pubId | uint256 | The publication ID to fetch the publication struct for |

**Returns**

| Struct Member Name | Type | Description |
| --- | --- | --- |
| ProfileIdPointed | uint256 | The profile ID of the profile that created the publication pointed to by this publication, if any |
| PubIdPointed | uint256 | The publication ID pointed to by this publication, if any |
| contentURI | string | The content URI mapped to this publication, if any |
| referenceModule | address | The reference module mapped to this publication, if any |
| collectModule | address | The collect module mapped to this publication |
| collectNFT | address | The collect NFT mapped to this publication, if any |

This function returns the publication struct for a given profile ID and publication ID.

It should...

1. Return the publication struct if the publication exists.
2. Return an empty struct if the publication does not exist.

### getPubType()

`function getPubType(uint256 profileId, uint256 pubId) external view returns (DataTypes.PubType);`

| Parameter Name | Type | Description |
| --- | --- | --- |
| profileId | uint256 | The profile ID of the profile that created the publication to fetch the publication type for |

**Returns**

| Enum Member Name | Type | Description |
| --- | --- | --- |
| Post | enum member (technically uint8) | An indicator stating that the queried publication is a post |
| Comment | enum member (technically uint8) | An indicator stating that the queried publication is a comment  |
| Mirror | enum member (technically uint8) | An indicator stating that the queried publication is a mirror |
| Nonexistant | enum member (technically uint8) | An indicator stating that the queried publication does not exist |

This function returns the publication type for a given profile ID and publication ID.

It should...

1. Return one of the `PubType` enum members: `Post`, `Comment` or `Mirror` if the publication exists.
2. Return the `PubType` enum member `Nonexistant` if the publication does not exist.