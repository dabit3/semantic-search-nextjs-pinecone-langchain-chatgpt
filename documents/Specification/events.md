---
title: "Events"
slug: "events"
hidden: false
createdAt: "2022-01-31T19:03:58.177Z"
updatedAt: "2022-08-16T19:54:31.440Z"
---
Event Emissions
---------------

Events are emitted at every state-changing function call, in addition to standard [ERC721 events.](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/4f8af2dceb0fbc36cb32eb2cc14f80c340b9022e/contracts/token/ERC721/IERC721.sol) Events often include the timestamp as a specific parameter, which allows for direct consumption using a bloom filter without needing to fetch block context on every event.

Furthermore, collect and follow NFT transfers hook into an event emitter on the LensHub, which simplifies event consumption by tracking NFT transfers without indexing numerous follow and collect NFTs.

The [Events library](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/libraries/Events.sol) contains a convenient list of all custom Lens Protocol events as well as explanations for each. It also references the [DataTypes library.](https://github.com/lens-protocol/lens-protocol/blob/main/contracts/libraries/DataTypes.sol)

See the events emitted below:

### BaseInitialized

`event BaseInitialized(string name, string symbol, uint256 timestamp);`

Emitted when the NFT contract's name and symbol are set at initialization by [initialize()](doc:functions#initialize)

| Parameter Name | Type    | Description                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| name           | string  | The name given to the Lens profile NFT                       |
| symbol         | string  | The symbol given to the Lens profile NFT                     |
| timestamp      | uint256 | The block timestamp at which the NFT contract is initialized |

### StateSet

`event StateSet(address indexed caller, DataTypes.ProtocolState indexed prevState, DataTypes.ProtocolState indexed newState, uint256 timestamp);`

Emitted when the hub state is set by [setState()](doc:functions#setstate) 

| Parameter Name | Type                          | Description                                                                     |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------- |
| caller         | address                       | The caller who sets the state                                                   |
| prevState      | Enum: DataTypes.ProtocolState | The previous protocol state. Enum of `Paused,` `PublishingPaused` or `Unpaused` |
| newState       | Enum: DataTypes.ProtocolState | The newly set state. Enum of `Paused,` `PublishingPaused` or `Unpaused`         |
| timestamp      | uint256                       | The block timestamp at which state is set                                       |

### GovernanceSet

`event GovernanceSet(address indexed caller, address indexed prevGovernance, address indexed newGovernance, uint256 timestamp);.`

Emitted when the governance address is changed by [setGovernance()](doc:functions#setgovernance) 

| Parameter Name | Type    | Description                                                                                                               |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| caller         | address | The caller who set the governance address. Mostly previous governance address, but cannot guarantee due to upgradeability |
| prevGovernance | address | The previous governance address                                                                                           |
| newGovernance  | address | The new governance address set                                                                                            |
| timestamp      | uint256 | The block timestamp at which governance is set                                                                            |

### EmergencyAdminSet

`event EmergencyAdminSet(address indexed caller, address indexed oldEmergencyAdmin, address indexed newEmergencyAdmin, uint256 timestamp);`

Emitted when the emergency admin is changed by [setEmergencyAdmin()](doc:functions#setemergencyadmin)

| Parameter Name    | Type    | Description                                                                                                                    |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| caller            | address | The caller who set the emergency admin address. Mostly previous governance address, but cannot guarantee due to upgradeability |
| oldEmergencyAdmin | address | The previous emergency admin address                                                                                           |
| newEmergencyAdmin | address | The new emergency admin address set                                                                                            |
| timestamp         | uint256 | The block timestamp at which emergency admin is set                                                                            |

### ProfileCreatorWhitelisted

`event ProfileCreatorWhitelisted(address indexed profileCreator, bool indexed whitelisted, uint256 timestamp);`

Emitted when a profile creator is added to or removed from the whitelist by [whitelistProfileCreator()](doc:functions#whitelistprofilecreator)

| Parameter Name | Type    | Description                                                                      |
| -------------- | ------- | -------------------------------------------------------------------------------- |
| profileCreator | address | The address of the profile creator                                               |
| whitelisted    | bool    | 1 => profile creator is being added, 0 => profile creator is being removed       |
| timestamp      | uint256 | The block timestamp at which profile creator is added/removed from the whitelist |

### FollowModuleWhitelisted

`event FollowModuleWhitelisted(address indexed followModule, bool indexed whitelisted, uint256 timestamp);`

Emitted when a follow module is added to or removed from the whitelist by [whitelistFollowModule()](doc:functions#whitelistfollowmodule)

| Parameter Name | Type    | Description                                                                    |
| -------------- | ------- | ------------------------------------------------------------------------------ |
| followModule   | address | The address of the follow module                                               |
| whitelisted    | bool    | 1 => follow module is being added, 0 => follow module is being removed         |
| timestamp      | uint256 | The block timestamp at which follow module is added/removed from the whitelist |

### ReferenceModuleWhitelisted

` event ReferenceModuleWhitelisted(address indexed referenceModule, bool indexed whitelisted, uint256 timestamp);`

Emitted when a reference module is added to or removed from the whitelist by [whitelistReferenceModule()](doc:functions#whitelistreferencemodule)

| Parameter Name  | Type    | Description                                                                       |
| --------------- | ------- | --------------------------------------------------------------------------------- |
| referenceModule | address | The address of the reference module                                               |
| whitelisted     | bool    | 1 => reference module is being added, 0 => reference module is being removed      |
| timestamp       | uint256 | The block timestamp at which the reference module is added/removed from whitelist |

### CollectModuleWhitelisted

`event CollectModuleWhitelisted(address indexed collectModule, bool indexed whitelisted, uint256 timestamp);`

Emitted when a collect module is added to or removed from the whitelist by [whitelistCollectModule()](doc:functions#whitelistcollectmodule)

| Parameter Name | Type    | Description                                                                     |
| -------------- | ------- | ------------------------------------------------------------------------------- |
| collectModule  | address | The address of the collect module.                                              |
| whitelisted    | bool    | 1 => collect module is being added, 0 => collect module is being removed        |
| timestamp      | uint256 | The block timestamp at which the collect module is added/removed from whitelist |

### ProfileCreated

`event ProfileCreated(uint256 indexed profileId, address indexed creator, address indexed to, string handle, string imageURI, address followModule, bytes followModuleReturnData, string followNFTURI, uint256 timestamp);`

| Parameter Name         | Type                                                            | Description                                                                                                            |
| ---------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| profileId              | uint256                                                         | The newly created profile's token ID                                                                                   |
| creator                | The profile creator created the token with the given profile ID |                                                                                                                        |
| to                     | address                                                         | The address to which the profile with the given profile ID is minted to                                                |
| handle                 | string                                                          | The handle set for the profile                                                                                         |
| imageURI               | string                                                          | The image uri set for the profile                                                                                      |
| followModule           | address                                                         | The profile's newly set follow module. This can be the zero address                                                    |
| followModuleReturnData | bytes                                                           | The data returned from the follow module's initialization. This is abi encoded and depends on the follow module chosen |
| followNFTURI           | string                                                          | The uri set for follow NFT                                                                                             |
| timestamp              | uint256                                                         | The block timestamp at which profile NFT is created                                                                    |

### DispatcherSet

` event DispatcherSet(uint256 indexed profileId, address indexed dispatcher, uint256 timestamp);`

Emitted when a dispatcher is set for a specific profile by [setDispatcher()](doc:functions#setdispatcher)

| Parameter Name | Type    | Description                                                 |
| -------------- | ------- | ----------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile for which the dispatcher is set |
| dispatcher     | address | The dispatcher is set for the given profile                 |
| timestamp      | uint256 | The block timestamp at which the dispatcher is set          |

### ProfileImageURISet

`event ProfileImageURISet(uint256 indexed profileId, string imageURI, uint256 timestamp);`

Emitted when a profile's URI is set by [setProfileImageURI()](doc:functions#setprofileimageuri)

| Parameter Name | Type    | Description                                          |
| -------------- | ------- | ---------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile for which the URI is set |
| imageURI       | string  | The URI set for the given profile                    |
| timestamp      | uint256 | The block timestamp at which URI is set              |

### FollowNFTURISet

`event FollowNFTURISet(uint256 indexed profileId, string followNFTURI, uint256 timestamp);`

Emitted when a follow NFT's URI is set by [setFollowNFTURI()](doc:functions#setfollownfturi)

| Parameter Name | Type    | Description                                                     |
| -------------- | ------- | --------------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile for which the follow NFT URI is set |
| followNFTURI   | string  | The follow NFT URI is set for the given profile                 |
| timestamp      | uint256 | The block timestamp at which NFT URI is set                     |

### FollowModuleSet

`event FollowModuleSet(uint256 indexed profileId, address followModule, bytes followModuleReturnData, uint256 timestamp);`

Emitted when a profile's follow module is set by [setFollowModule()](doc:functions#setfollowmodule)

| Parameter Name         | Type    | Description                                                                                                            |
| ---------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| profileId              | uint256 | The token ID of the profile                                                                                            |
| followModule           | address | The profile's newly set follow module. This CAN be the zero address                                                    |
| followModuleReturnData | address | The data returned from the follow module's initialization. This is abi encoded and depends on the follow module chosen |
| timestamp              | uint256 | The block timestamp at which follow module is set                                                                      |

### PostCreated

`event PostCreated(uint256 indexed profileId, uint256 indexed pubId, string contentURI, address collectModule, bytes collectModuleReturnData, address referenceModule, bytes referenceModuleReturnData, uint256 timestamp);`

Emitted when a "post" is published by either [post()](doc:functions#post) or [postWithSig()](<>)

| Parameter Name            | Type    | Description                                                                                                                                           |
| ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| profileId                 | uint256 | The token ID of the profile to which post is published                                                                                                |
| pubId                     | uint256 | The ID of the new post                                                                                                                                |
| contentURI                | string  | The URI mapped to this new post                                                                                                                       |
| collectModule             | address | The collect module is mapped to this new post. This CAN NOT be the zero address                                                                       |
| collectModuleReturnData   | bytes   | The data returned from the collect module's initialization for this given post. This is abi encoded, and totally depends on the collect module chosen |
| referenceModule           | address | The reference module set for this post                                                                                                                |
| referenceModuleReturnData | bytes   | The data returned from the reference module at initialization. This is abi encoded and totally depends on the reference module chosen                 |
| timestamp                 | uint256 | The block timestamp at which this new post is created                                                                                                 |

### CommentCreated

`event CommentCreated(uint256 indexed profileId, uint256 indexed pubId, string contentURI, uint256 profileIdPointed, uint256 pubIdPointed, address collectModule, bytes collectModuleReturnData, address referenceModule, bytes referenceModuleReturnData, uint256 timestamp);`

Emitted when a "comment" is published by either [comment()](doc:functions#comment) or [commentWithSig()](<>)

| Parameter Name            | Type    | Description                                                                                                                                             |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| profileId                 | uint256 | The profile token ID from which comment is published                                                                                                    |
| pubId                     | uint256 | The ID of the new comment                                                                                                                               |
| contentURI                | string  | The URI mapped to this new comment                                                                                                                      |
| profileIdPointed          | uint256 | The profile token ID that this comment points to                                                                                                        |
| pubIdPointed              | uint256 | The publication ID that this comment points to                                                                                                          |
| collectModule             | address | The collect module mapped to this new comment. This CANNOT be the zero address                                                                          |
| collectModuleReturnData   | bytes   | The data returned from the collect module's initialization for this given comment. This is abi encoded and totally depends on the collect module chosen |
| referenceModule           | address | The reference module set for this comment                                                                                                               |
| referenceModuleReturnData | bytes   | The data returned from the reference module at initialization. This is abi encoded and totally depends on the reference module chosen                   |
| timestamp                 | uint256 | The block timestamp at which this comment is created                                                                                                    |

### MirrorCreated

`event MirrorCreated(uint256 indexed profileId, uint256 indexed pubId, uint256 profileIdPointed, uint256 pubIdPointed, address referenceModule, bytes referenceModuleReturnData, uint256 timestamp);`

Emitted when a "mirror" is published by either [mirror()](doc:functions#mirror) or [mirrorWithSig()](<>)

| Parameter Name            | Type    | Description                                                                                                                           |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| profileId                 | uint256 | The profile token ID from which the mirror is published                                                                               |
| pubId                     | uint256 | The ID of the new mirror                                                                                                              |
| profileIdPointed          | uint256 | The profile token ID that this mirror points to                                                                                       |
| pubIdPointed              | uint256 | The publication ID that this mirror points to                                                                                         |
| referenceModule           | address | The reference module set for this publication.                                                                                        |
| referenceModuleReturnData | bytes   | The data returned from the reference module at initialization. This is abi encoded and totally depends on the reference module chosen |
| timestamp                 | uint256 | The block timestamp at which this mirror is created                                                                                   |

### FollowNFTDeployed

`event FollowNFTDeployed(uint256 indexed profileId, address indexed followNFT, uint256 timestamp);`

Emitted when a `followNFT` clone is deployed using a lazy deployment pattern i.e. in case Follow NFT contract does not already exist when either [follow()](doc:functions#follow) or [followWithSig()](<>) is called.

| Parameter Name | Type    | Description                                                       |
| -------------- | ------- | ----------------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile to which this followNFT is associated |
| followNFT      | address | The address of the newly deployed followNFT clone                 |
| timestamp      | uint256 | The current block timestamp                                       |

### CollectNFTDeployed

`event CollectNFTDeployed(uint256 indexed profileId, uint256 indexed pubId, address indexed collectNFT, uint256 timestamp);`

Emitted when a `collectNFT` clone is deployed using a lazy deployment pattern i.e. in case collect NFT contract does not already exist when either [collect()](doc:functions#collect) or [collectWithSig()](<>) is called.

| Parameter Name | Type    | Description                                                              |
| -------------- | ------- | ------------------------------------------------------------------------ |
| profileId      | uint256 | The profile ID of publisher                                              |
| pubId          | uint256 | The publication associated with the newly deployed collectNFT clone's ID |
| collectNFT     | address | The address of the newly deployed collectNFT clone                       |
| timestamp      | uint256 | The current block timestamp                                              |

### Collected

`event Collected(address indexed collector, uint256 indexed profileId, uint256 indexed pubId, uint256 rootProfileId, uint256 rootPubId, uint256 timestamp);`

Emitted upon a successful collect action by either [collect()](doc:functions#collect) or [collectWithSig()](<>)

| Parameter Name | Type    | Description                                                                                         |
| -------------- | ------- | --------------------------------------------------------------------------------------------------- |
| collector      | address | The address collecting the publication                                                              |
| profileId      | uint256 | The token ID of the profile that the collect was initiated towards, useful to differentiate mirrors |
| pubId          | uint256 | The publication ID that the collect was initiated towards, useful to differentiate mirrors          |
| rootProfileId  | uint256 | The profile token ID of the profile whose publication is being collected                            |
| rootPubId      | uint256 | The publication ID of the publication being collected                                               |
| timestamp      | uint256 | The current block timestamp                                                                         |

### FollowNFTTransferred

`event FollowNFTTransferred(uint256 indexed profileId, uint256 indexed followNFTId, address from, address to, uint256 timestamp);`

Emitted via callback when a followNFT is transferred.

| Parameter Name | Type    | Description                                                                 |
| -------------- | ------- | --------------------------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile associated with the followNFT being transferred |
| followNFTId    | uint256 | The ID of followNFT being transferred                                       |
| from           | address | The address the followNFT is being transferred from                         |
| to             | address | The address the followNFT is being transferred to                           |
| timestamp      | uint256 | The current block timestamp                                                 |

### CollectNFTTransferred

`event CollectNFTTransferred(uint256 indexed profileId, uint256 indexed pubId, uint256 indexed collectNFTId, address from, address to, uint256 timestamp);`

Emitted via callback when a collectNFT is transferred.

| Parameter Name | Type    | Description                                                                   |
| -------------- | ------- | ----------------------------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile associated with the collectNFT being transferred. |
| pubId          | uint256 | The publication ID associated with the collectNFT being transferred           |
| collectNFTId   | uint256 | The ID of the collectNFT being transferred                                    |
| from           | address | The address the collectNFT is being transferred from                          |
| to             | address | The address the collectNFT is being transferred to                            |
| timestamp      | uint256 | The current block timestamp                                                   |

Collect/Follow NFT-Specific
---------------------------

### FollowNFTInitialized

`event FollowNFTDelegatedPowerChanged(address delegate, uint256 newPower, uint256 timestamp);`

Emitted when a newly deployed follow NFT is initialized.

| Parameter Name | Type    | Description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile connected to this follow NFT |
| timestamp      | uint256 | The current block timestamp                              |

### FollowNFTDelegatedPowerChanged

`event FollowNFTDelegatedPowerChanged(address delegate, uint256 newPower, uint256 timestamp);`

Emitted when delegation power in a FollowNFT is changed.

| Parameter Name | Type    | Description                                     |
| -------------- | ------- | ----------------------------------------------- |
| delegate       | address | The delegate whose power has been changed       |
| newPower       | uint256 | The new governance power mapped to the delegate |
| timestamp      | uint256 | The current block timestamp                     |

### CollectNFTInitialized

`event CollectNFTInitialized(uint256 profileId, uint256 pubId, uint256 timestamp);`

 Emitted when a newly deployed collect NFT is initialized.

| Parameter Name | Type    | Description                                                                         |
| -------------- | ------- | ----------------------------------------------------------------------------------- |
| profileId      | uint256 | The token ID of the profile connected to the publication mapped to this collect NFT |
| pubId          | uint256 | The publication ID connected to the publication mapped to this collect NFT          |
| timestamp      | uint256 | The current block timestamp                                                         |

Module-Specific
---------------

### ModuleGlobalsGovernanceSet

`event ModuleGlobalsGovernanceSet(address indexed prevGovernance, address indexed newGovernance, uint256 timestamp);`

Emitted when the ModuleGlobals governance address is set.

| Parameter Name | Type    | Description                     |
| -------------- | ------- | ------------------------------- |
| prevGovernance | address | The previous governance address |
| newGovernance  | address | The new governance address set  |
| timestamp      | uint256 | The current block timestamp     |

### ModuleGlobalsTreasurySet

`event ModuleGlobalsTreasurySet(address indexed prevTreasury, address indexed newTreasury, uint256 timestamp);`

Emitted when the ModuleGlobals treasury address is set.

| Parameter Name | Type    | Description                   |
| -------------- | ------- | ----------------------------- |
| prevTreasury   | address | The previous treasury address |
| newTreasury    | address | The new treasury address set  |
| timestamp      | uint256 | The current block timestamp   |

### ModuleGlobalsTreasuryFeeSet

`event ModuleGlobalsTreasuryFeeSet(uint16 indexed prevTreasuryFee, uint16 indexed newTreasuryFee, uint256 timestamp);`

 Emitted when the ModuleGlobals treasury fee is set.

| Parameter Name  | Type    | Description                      |
| --------------- | ------- | -------------------------------- |
| prevTreasuryFee | uint16  | The previous treasury fee in BPS |
| newTreasuryFee  | uint16  | The new treasury fee in BPS      |
| timestamp       | uint256 | The current block timestamp      |

### ModuleGlobalsCurrencyWhitelisted

`event ModuleGlobalsCurrencyWhitelisted(address indexed currency, bool indexed prevWhitelisted, bool indexed whitelisted, uint256 timestamp);`

Emitted when a currency is added to or removed from the ModuleGlobals whitelist.

| Parameter Name  | Type    | Description                                                                            |
| --------------- | ------- | -------------------------------------------------------------------------------------- |
| currency        | address | The currency address                                                                   |
| prevWhitelisted | bool    | 1 => Currency was previously whitelisted, 0 => Currency was not previously whitelisted |
| whitelisted     | bool    | 1 => Currency whitelisted, 0 => Currency not whitelisted                               |
| timestamp       | uint256 | The current block timestamp                                                            |

### FeeModuleBaseConstructed

`event FeeModuleBaseConstructed(address indexed moduleGlobals, uint256 timestamp);`

Emitted when a module inheriting from the `FeeModuleBase` is constructed.

| Parameter Name | Type    | Description                             |
| -------------- | ------- | --------------------------------------- |
| moduleGlobals  | address | The ModuleGlobals contract address used |
| timestamp      | uint256 | The current block timestamp             |

### ModuleBaseConstructed

`event ModuleBaseConstructed(address indexed hub, uint256 timestamp);`

Emitted when a module inheriting from the `ModuleBase` is constructed.

| Parameter Name | Type    | Description                       |
| -------------- | ------- | --------------------------------- |
| hub            | address | The LensHub contract address used |
| timestamp      | uint256 | The current block timestamp       |

### FollowsApproved

`event FollowsApproved(address indexed owner, uint256 indexed profileId, address[] addresses, bool[] approved, uint256 timestamp);`

Emitted when one or multiple addresses are approved (or disapproved) for following in the `ApprovalFollowModule`.

| Parameter Name | Type       | Description                                                       |
| -------------- | ---------- | ----------------------------------------------------------------- |
| owner          | address    | The profile owner who executed the approval                       |
| profileId      | uint256    | The profile ID that the follow approvals are granted/revoked for  |
| addresses      | address\[] | The addresses that have had the follow approvals granted/revoked  |
| approved       | bool       | Whether each corresponding address is now approved or disapproved |
| timestamp      | uint256    | The current block timestamp                                       |