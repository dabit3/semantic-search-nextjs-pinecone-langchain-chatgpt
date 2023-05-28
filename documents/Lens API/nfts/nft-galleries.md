---
title: "NFT Galleries"
slug: "nft-galleries"
hidden: false
createdAt: "2023-01-18T09:56:04.753Z"
updatedAt: "2023-03-14T12:53:30.677Z"
---
# NFT Galleries

This new Lens API feature allows profiles to own curated NFT galleries. This is all off-chain, and helps you showcase your favorite NFTs to other Lens users.

## Get a user's NFT galleries

This endpoint is public and does not require any authentication

```graphql Example query
query GetUserGalleries {
	nftGalleries(request: {
		profileId: "0x01"
	}) {
		id
		name
		profileId
		items {
			contractName
			contractAddress
			symbol
			tokenId
			owners {
				address
				amount
			}
			name
			description
			originalContent {
				uri
				metaType
				animatedUrl
			}
			chainId
			collectionName
			ercType
		}	
	}
}
```
```json Example response
{
	items: [
		{
			id: "some uuid",
			name: "my favorite NFTs",
			profileId: "0x01",
			items: [
				{
					contractName: "NFT Collection contract",
					contractAddress: "0x1234123412341234123412341234123412341234",
					symbol: "FUN",
					tokenId: "1",
					owners: [{
						address: "0x0101010101010101010101010101010101010101",
						amount: 1
					}],
					name: "FUN NFTs #1",
					description: "A collection of fun NFTs",
					contentURI: "http://example.com/image.png",
					originalContent: {
						uri: "http://example.com/image.png",
						metaType: "image/png",
						animatedUrl: null
					},
					chainId: "137",
					collectionName: "FUN NFTs",
					ercType: "ERC721"
				}
			],
			createdAt: "2023-01-01T00:00:00",
			updatedAt: "2023-01-01T00:00:00",
		}		
	]
}
```



### Using LensClient SDK

```typescript
const result = await lensClient.nfts.fetchGalleries({
  profileId: '0x0185',
});
```



## Create a new NFT Gallery

This endpoint creates a new NFT gallery for a given profile, with its name and contents.  
NFTs are uniquely identified with a combination of `contractAddress`, `tokenId` and `chainId`. These are the minimum information required to fetch and populate the NFT information. You can find items by using the `nfts` query [here](doc:get-users-nfts). This mutation returns the `NftGalleryId` scalar upon completion.

_Note_: NFT Gallery creation will fail if you try to add NFTs you do not own.

```graphql Example query
mutation CreateNFTGallery {
	createNftGallery(request: {
		profileId: "0x01",
		name: "my favorite NFTs",
		items: [
			{
				contractAddress: "0x1234123412341234123412341234123412341234"
				tokenId: "1",
				chainId: 137
			}
		]
	})
}
```
```json Example response
{
	id: "some uuid",
	name: "my favorite NFTs",
	profileId: "0x01",
	items: [
		{
			contractName: "NFT Collection contract",
			contractAddress: "0x1234123412341234123412341234123412341234",
			symbol: "FUN",
			tokenId: "1",
			owners: [{
				address: "0x0101010101010101010101010101010101010101",
				amount: 1
			}],
			name: "FUN NFTs #1",
			description: "A collection of fun NFTs",
			contentURI: "http://example.com/image.png",
			originalContent: {
				uri: "http://example.com/image.png",
				metaType: "image/png",
				animatedUrl: null
			},
			chainId: "137",
			collectionName: "FUN NFTs",
			ercType: "ERC721"
		}
	],
	createdAt: "2023-01-01T00:00:00",
	updatedAt: "2023-01-01T00:00:00",
}
```



### Using LensClient SDK

```typescript
const result = await lensClient.nfts.createGallery({
  profileId: "0x01",
  name: "my favorite NFTs",
	items: [
		{
			contractAddress: "0x1234123412341234123412341234123412341234"
			tokenId: "1",
			chainId: 137
		}
	]
});
```



## Update NFT gallery name

Only the owning profile can change an NFT Gallery name

```graphql Example mutation
mutation UpdateNFTGalleryInfo {
	updateNftGalleryInfo(request: {
		profileId: "0x01",
		galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148",
		name: "new name"
	})
}

```
```graphql Example response
// returns null
```



### Using LensClient SDK

```typescript
const result = await lensClient.nfts.updateGalleryInfo({
  profileId: "0x01",
  galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148",
	name: "new name"
});
```



## Update NFT Gallery items

Owning profiles can add and/or remove items to an NFT gallery using the following mutation. All added items will be added to the end of the gallery content list.

```graphql Example mutation
mutation UpdateNFTGalleryItems {
	updateNftGalleryItems(request: {
		profileId: "0x01",
		galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148",
		toAdd: [{
			contractAddress: "0x1234123412341234123412341234123412341234"
			tokenId: "1",
			chainId: 137
		}],
		toRemove: [{
			contractAddress: "0x0001000100010001000100010001000100010001"
			tokenId: "2",
			chainId: 137
		}]
	})
}
```
```graphql Example response
// returns null
```



### Using LensClient SDK

```typescript
const result = await lensClient.nfts.updateGalleryItems({
	profileId: "0x01",
	galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148",
	toAdd: [{
		contractAddress: "0x1234123412341234123412341234123412341234"
		tokenId: "1",
		chainId: 137
	}],
	toRemove: [{
		contractAddress: "0x0001000100010001000100010001000100010001"
		tokenId: "2",
		chainId: 137
	}]
});
```



## Update NFT gallery item order

You can also rearrange the order of  NFT gallery contents in any frontend by using the following endpoint. It supports single or multiple updates in every call. Every update places the given NFT at the `newOrder` position by shifting items before and after it accordingly.

```graphql Example mutation
mutation UpdateNFTGalleryOrder {
	updateNftGalleryOrder(request: {
		profileId: "0x01",
		galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148",
		updates: [{
			contractAddress: "0x1234123412341234123412341234123412341234",
			tokenId: "1",
			chainId: 137,
			newOrder: 1
		}]
	})
}
```
```graphql Example response
// returns null
```



### Using LensClient SDK

```typescript
const result = await lensClient.nfts.updateGalleryOrder({
  profileId: "0x01",
	galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148",
	updates: [{
		contractAddress: "0x1234123412341234123412341234123412341234",
		tokenId: "1",
		chainId: 137,
		newOrder: 1
	}]
});
```



## Delete a gallery

Deletes the given gallery from your profile

```graphql Example mutation
mutation DeleteNFTGallery {
	deleteNftGallery(request: {
		profileId: "0x01",
		galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148"
	})
}
```
```graphql Example response
// returns null
```



### Using LensClient SDK

```typescript
const result = await lensClient.nfts.deleteGallery({
  profileId: "0x01",
	galleryId: "9aeb66b2-0d8f-4c33-951c-feedbb171148"
});
```