---
title: "Set profile metadata"
slug: "create-set-update-profile-metadata-typed-data"
hidden: false
createdAt: "2022-02-17T11:39:09.059Z"
updatedAt: "2023-03-15T18:08:04.628Z"
---
This API call allows you to get the typed data to then call the `withSig` method to set your profile metadata for your profile on lens.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API, the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always-failing transaction, the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions.

All the metadata of the profile is stored on-chain in a URL/IPFS link that points to the metadata just how NFTs work. This means updating profile details is a transaction. 

# Profile Metadata Structure

```ts
export enum MetadataDisplayType {
  number = 'number',
  string = 'string',
  date = 'date',
}

export enum MetadataVersions {
  one = '1.0.0',
}

export interface AttributeData {
  displayType?: MetadataDisplayType;
  traitType?: string;
  value: string;
  key: string;
}

export interface ProfileMetadata {
   /**
   * The metadata version.
   */
  version: MetadataVersions;

  /**
   * The metadata id can be anything but if your uploading to ipfs
   * you will want it to be random.. using uuid could be an option!
   */
  metadata_id: string;

  /**
   * The display name for the profile
   */
  name: string | null;

  /**
   * The bio for the profile
   */
  bio: string | null;

  /**
   * Cover picture
   */
  cover_picture: string | null;

  /**
   * Any custom attributes can be added here to save state for a profile
   */
  attributes: AttributeData[];
}
```



anything you put in `attributes` will be extracted out of the metadata and put into the profile schema under `attributes`

# API Design

```javascript Example operation
mutation CreateSetProfileMetadataTypedData {
  createSetProfileMetadataTypedData(request: { 
      profileId: "0x01", 
      metadata: "ipfs://Qmeu6u6Ta5qeCf6mw3zVoe9pMus96cX6eZT6dnRQKDStBL" 
  }) {
    id
      expiresAt
      typedData {
        types {
          SetProfileMetadataURIWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          metadata
        }
      }
  }
}
```
```javascript Example response
{
  "data": {
    "createSetProfileMetadataTypedData": {
      "id": "015c12ab-b9b3-4cec-8d43-35b186565542",
      "expiresAt": "2022-04-21T09:13:58.000Z",
      "typedData": {
        "types": {
          "SetProfileMetadataURIWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "metadata",
              "type": "string"
            },
            {
              "name": "nonce",
              "type": "uint256"
            },
            {
              "name": "deadline",
              "type": "uint256"
            }
          ]
        },
        "domain": {
          "name": "LensPeriphery",
          "chainId": 80001,
          "version": "1",
          "verifyingContract": "0x702C22BFCD705c42B46Df8512b51311a2B5e6036"
        },
        "value": {
          "nonce": 0,
          "deadline": 1650532438,
          "profileId": "0x01",
          "metadata": "ipfs://Qmeu6u6Ta5qeCf6mw3zVoe9pMus96cX6eZT6dnRQKDStBL"
        }
      }
    }
  }
}
```
```javascript Query interface
type Mutation {
  createSetProfileMetadataTypedData(request: CreatePublicSetProfileMetadataURIRequest!): CreateSetProfileMetadataURIBroadcastItemResult!
}
```
```javascript Request
input CreatePublicSetProfileMetadataURIRequest {
  # Profile id
  profileId: ProfileId!

  # The metadata uploaded somewhere passing in the url to reach it
  metadata: Url!
}
```
```javascript Response
# The eip 712 typed data domain
type EIP712TypedDataDomain {
  # The name of the typed data domain
  name: String!

  # The chainId
  chainId: ChainId!

  # The version
  version: String!

  # The verifying contract
  verifyingContract: ContractAddress!
}

# The broadcast item
type CreateSetProfileMetadataURIBroadcastItemResult {
  # This broadcast item ID
  id: BroadcastId!

  # The date the broadcast item expiries
  expiresAt: DateTime!

  # The typed data
  typedData: CreateSetProfileMetadataURIEIP712TypedData!
}

# The set follow nft uri eip 712 typed data
type CreateSetProfileMetadataURIEIP712TypedData {
  # The types
  types: CreateSetProfileMetadataURIEIP712TypedDataTypes!

  # The typed data domain
  domain: EIP712TypedDataDomain!

  # The values
  value: CreateSetProfileMetadataURIEIP712TypedDataValue!
}

# The set follow nft uri eip 712 typed data types
type CreateSetProfileMetadataURIEIP712TypedDataTypes {
  SetProfileMetadataURIWithSig: [EIP712TypedDataField!]!
}

# The set follow nft uri eip 712 typed data value
type CreateSetProfileMetadataURIEIP712TypedDataValue {
  nonce: Nonce!
  deadline: UnixTimestamp!
  profileId: ProfileId!
  metadata: Url!
}

input CreatePublicSetProfileMetadataURIRequest {
  # Profile id
  profileId: ProfileId!

  # The metadata uploaded somewhere passing in the url to reach it
  metadata: Url!
}
```



## Request

Let's touch on this request so it's super clear. 

### profiled - required

This is mandatory.

### metadata

This is where your new metadata for your profile is stored

## Putting it together

<https://github.com/lens-protocol/api-examples/blob/master/src/profile/set-profile-metadata.ts> shows you a live running example of how you would generate the signed typed data from the API and send it through the `withSig` methods. 

# Gasless

> 🚧 If you are on mumbai anyone can use gasless but if your on polygon only whitelisted apps can currently use this

You have 2 options when doing gasless you have `broadcast` and also the `dispatcher`. The dispatcher supports a subset of methods that allows you to do actions without signing, these actions are protocol calls that can not drain funds from any wallet making them classed as safe actions, not all methods are supported by the dispatcher. Posting is one of those allowed dispatcher methods. You can set up a dispatcher for the user using <https://docs.lens.xyz/docs/create-set-dispatcher-typed-data> and then broadcast that transaction which is described in that document. 

> 📘 Full code example of gasless
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/set-profile-metadata-gasless.ts>

## Broadcast

This doc <https://docs.lens.xyz/docs/broadcast-transaction> explains how you would broadcast a transaction with the demo example in there. You basically use all of the examples in the GitHub code snippet but instead of calling the `withSig` methods on the hub directly, you pass the signature into the broadcast call. This is all shown in the full code GitHub example above.

## Using dispatcher

This takes in the same request as the `withSig` method so nothing needs to change in that regard. You then can track the `txId` to see what it is indexed. Look at the code examples for more low-level detail.

```javascript Example operation
mutation CreateSetProfileMetadataViaDispatcher {
  createSetProfileMetadataViaDispatcher(request: { 
      profileId: "0x01", 
      metadata: "ipfs://Qmeu6u6Ta5qeCf6mw3zVoe9pMus96cX6eZT6dnRQKDStBL" 
  }) {
    ... on RelayerResult {
      txHash
      txId
    }
    ... on RelayError {
      reason
    }
  }
}
```
```javascript Example result
{
  "data": {
    "createSetProfileMetadataViaDispatcher": {
      "txHash": "0xc37eed339fb06320906fdb0a0078ae8e5e7d6f1496e01084489180cd3cb3abe6",
      "txId": "83ae3af8-220c-4e9d-be7c-6cdf3b50fa44"
    }
  }
}
```



# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.



# 

# Using LensClient SDK

```typescript
const typedDataResult = await lensClient.profile.createSetProfileMetadataTypedData({
  metadata: "urlToMetadataFile",
  profileId: "0x0635",
});

// or 

const relayerResult = await lensClient.profile.createSetProfileMetadataViaDispatcher({
  metadata: "urlToMetadataFile",
  profileId: "0x0635",
});
```