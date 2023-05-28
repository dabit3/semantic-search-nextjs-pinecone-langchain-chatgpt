---
title: "Get Users NFTs"
slug: "get-users-nfts"
hidden: false
createdAt: "2022-02-18T11:25:35.980Z"
updatedAt: "2023-03-14T12:41:27.671Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/nfts/get-users-nfts.ts>

This query allows you to find what NFTs a user owns. It also allows you to query what they own by contract address to sees which specific NFTs a user owns in a given collection. We use Moralis API to get the NFT data. 

# API details

- If you are using testnet this endpoint will only allow you to query `polygon Mumbai (chainId: 80001)`
- If you are using mainnet this endpoint will only allow you to query `ethereum mainnet (chainId: 1)` and `polygon mainnet (chainId: 137)`

Below is the overview of the entire interface but we dig into specific queries below.

```javascript Example response
{
  "data": {
    "nfts": {
      "items": [
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5742",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5741",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5740",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5739",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5738",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5737",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Tubby Cats",
          "contractAddress": "0xCa7cA7BcC765F77339bE2d648BA53ce9c8a262bD",
          "symbol": "TUBBY",
          "tokenId": "4193",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Tubby Cats",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmWEsF23zM2C1afa6G9XwgBhqJsPH9CyQTDpToap1MD4Un",
          "originalContent": {
            "uri": "ipfs://QmXRJbXFUHPbHy6hLcVtrcUiEiWyPtXSGjgsH5RexMwMmd",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Tubby Cats",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "6518",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6518",
          "originalContent": {
            "uri": "ipfs://QmTL41cWQGXXVEfvy9YiRfmx9NmEoQoiQVtVoSeWrrVDwS",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "3Landers",
          "contractAddress": "0xb4d06d46A8285F4EC79Fd294F78a881799d8cEd9",
          "symbol": "3L",
          "tokenId": "4766",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "3Landers",
          "description": "3Landers is a collectible NFT project centered around community, adventure, and collaboration.",
          "contentURI": "https://ipfs.io/ipfs/QmNWziXfkdZRTY6ZQHkHGUe8smUCNGPT4umrpQ8KVjqNDB/",
          "originalContent": {
            "uri": "https://ipfs.io/ipfs/Qmb2t58xgmTFaZUxgPV1tfBkD1zP4avYf55RKevdCAHGSH/",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "3Landers",
          "ercType": "ERC721"
        },
        {
          "contractName": "3Landers",
          "contractAddress": "0xb4d06d46A8285F4EC79Fd294F78a881799d8cEd9",
          "symbol": "3L",
          "tokenId": "4765",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "3Landers",
          "description": "3Landers is a collectible NFT project centered around community, adventure, and collaboration.",
          "contentURI": "https://ipfs.io/ipfs/QmNWziXfkdZRTY6ZQHkHGUe8smUCNGPT4umrpQ8KVjqNDB/",
          "originalContent": {
            "uri": "https://ipfs.io/ipfs/Qmb2t58xgmTFaZUxgPV1tfBkD1zP4avYf55RKevdCAHGSH/",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "3Landers",
          "ercType": "ERC721"
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":10}",
        "totalCount": 4023
      }
    }
  }
}
```
```javascript Query interface
type Query { 
	nfts(request: NFTsRequest!): NFTsResult!
}
```
```javascript Request
input NFTsRequest {
  limit: Int
  
  cursor: Cursor

  # Filter by owner address
  ownerAddress: EthereumAddress!

  # Filter by contract address
  contractAddress: ContractAddress

  # Chain Ids
  chainIds: [ChainId!]!
}

# ChainId custom scalar type
scalar ChainId

# Ethereum address custom scalar type
scalar EthereumAddress

# Contract address custom scalar type
scalar ContractAddress

# Cursor custom scalar type
scalar Cursor
```
```javascript Response
# Paginated nft results
type NFTsResult {
  items: [NFT!]!
  pageInfo: PaginatedResultInfo!
}

# The nft type
type NFT {
  # aka us CryptoKitties
  contractName: String!

  # aka 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
  contractAddress: ContractAddress!

  # aka RARI
  symbol: String!

  # aka "13"
  tokenId: String!

  # aka { address: 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e, amount:"2" }
  owners: [Owner!]!

  # aka "Beard Coffee"
  name: String!

  # aka "Hey cutie! I m Beard Coffee. ....
  description: String!

  # aka "https://api.criptokitt..."
  contentURI: String!

  # aka "{ uri:"https://ipfs....", metaType:"image/png" }"
  originalContent: NFTContent!

  # aka "1"
  chainId: ChainId!

  # aka "CryptoKitties"
  collectionName: String!

  # aka "ERC721"
  ercType: String!
}

# The nft type
type Owner {
  # number of tokens owner
  amount: Float!

  # aka 0x057Ec652A4F150f7FF94f089A38008f49a0DF88e
  address: EthereumAddress!
}

# The NFT content uri
type NFTContent {
  # The token uri  nft
  uri: String!

  # The meta type content
  metaType: String!
}
  
# The paginated result info
type PaginatedResultInfo {
  # Cursor to query the actual results
  prev: Cursor

  # Cursor to query next results
  next: Cursor

  # The total number of entities the pagination iterates over. e.g. For a query that requests all nfts with more than 10 likes, this field gives the total amount of nfts with more than 10 likes, not the total amount of nfts
  totalCount: Int!
}
  
# Cursor custom scalar type
scalar Cursor

# ChainId custom scalar type
scalar ChainId
```



You will see the paging result behavior repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property. 

Now you see the base query let's look at how we can use different request parameters to request different NFTs for the user.

## Get all NFTs a wallet address owns

To do this just set the `ownerAddress` to the ethereum address you want to query for their NFTs.

```javascript Example operation
query Nfts($request: NFTsRequest!) {
  nfts(request: {
    ownerAddress: "0x54be3a794282c030b15e43ae2bb182e14c409c5e",
    limit: 10,
    chainIds: [1]
  }) {
    items {
      contractName
      contractAddress
      symbol
      tokenId
      owners {
        amount
        address
      }
      name
      description
      contentURI
      originalContent {
        uri
        metaType
      }
      chainId
      collectionName
      ercType
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
```
```javascript Example response
{
  "data": {
    "nfts": {
      "items": [
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5742",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5741",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5740",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5739",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5738",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Origin Stories 1",
          "contractAddress": "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
          "symbol": "ORIGIN1",
          "tokenId": "5737",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Origin Stories 1: Mad Clown, Sad Town",
          "description": "Before she was a tough-as-nails lead member of the PUNKS crew, Courtney had humble beginnings. Okay, she was always tough as nails, but to follow her dreams she had to carve her own path. Coming from a small town, Courtney had to go it alone, overcome major fears and doubts, and finally take a major leap of faith to make it in… ORIGIN CITY.",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmRpVH1xubDpNJ5RUqjnhE9DLU99R44NtZqs1s59pH7qBB",
          "originalContent": {
            "uri": "ipfs://QmP7vzEULM45qZkYnTdejrDhprEM9xmCNHztaNgffEZvcm",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Origin Stories 1",
          "ercType": "ERC721"
        },
        {
          "contractName": "Tubby Cats",
          "contractAddress": "0xCa7cA7BcC765F77339bE2d648BA53ce9c8a262bD",
          "symbol": "TUBBY",
          "tokenId": "4193",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "Tubby Cats",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmWEsF23zM2C1afa6G9XwgBhqJsPH9CyQTDpToap1MD4Un",
          "originalContent": {
            "uri": "ipfs://QmXRJbXFUHPbHy6hLcVtrcUiEiWyPtXSGjgsH5RexMwMmd",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "Tubby Cats",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "6518",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6518",
          "originalContent": {
            "uri": "ipfs://QmTL41cWQGXXVEfvy9YiRfmx9NmEoQoiQVtVoSeWrrVDwS",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "3Landers",
          "contractAddress": "0xb4d06d46A8285F4EC79Fd294F78a881799d8cEd9",
          "symbol": "3L",
          "tokenId": "4766",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "3Landers",
          "description": "3Landers is a collectible NFT project centered around community, adventure, and collaboration.",
          "contentURI": "https://ipfs.io/ipfs/QmNWziXfkdZRTY6ZQHkHGUe8smUCNGPT4umrpQ8KVjqNDB/",
          "originalContent": {
            "uri": "https://ipfs.io/ipfs/Qmb2t58xgmTFaZUxgPV1tfBkD1zP4avYf55RKevdCAHGSH/",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "3Landers",
          "ercType": "ERC721"
        },
        {
          "contractName": "3Landers",
          "contractAddress": "0xb4d06d46A8285F4EC79Fd294F78a881799d8cEd9",
          "symbol": "3L",
          "tokenId": "4765",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "3Landers",
          "description": "3Landers is a collectible NFT project centered around community, adventure, and collaboration.",
          "contentURI": "https://ipfs.io/ipfs/QmNWziXfkdZRTY6ZQHkHGUe8smUCNGPT4umrpQ8KVjqNDB/",
          "originalContent": {
            "uri": "https://ipfs.io/ipfs/Qmb2t58xgmTFaZUxgPV1tfBkD1zP4avYf55RKevdCAHGSH/",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "3Landers",
          "ercType": "ERC721"
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":10}",
        "totalCount": 4023
      }
    }
  }
}
```



## Get NFTs of a collection a wallet address owns

To do this just set the `ownerAddress` to the ethereum address you want to query for their NFTs and set the `contractAddress` of the NFT you wish to filter it on.

```javascript Example operation
query Nfts($request: NFTsRequest!) {
  nfts(request: {
    ownerAddress: "0x54be3a794282c030b15e43ae2bb182e14c409c5e",
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    limit: 10,
    chainIds: [1]
  }) {
    items {
      contractName
      contractAddress
      symbol
      tokenId
      owners {
        amount
        address
      }
      name
      description
      contentURI
      originalContent {
        uri
        metaType
      }
      chainId
      collectionName
      ercType
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
```
```javascript Example response
{
  "data": {
    "nfts": {
      "items": [
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "6518",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6518",
          "originalContent": {
            "uri": "ipfs://QmTL41cWQGXXVEfvy9YiRfmx9NmEoQoiQVtVoSeWrrVDwS",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "2368",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2368",
          "originalContent": {
            "uri": "ipfs://QmbViGww8GWBHc1RnM4RgSCKavU1Ukh87X4dYFG9zhD9cY",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "5152",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/5152",
          "originalContent": {
            "uri": "ipfs://QmbTXzuujmgoAJAXTffnqybGVM6rxRsph3T2Hwi299X3h5",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "3531",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/3531",
          "originalContent": {
            "uri": "ipfs://QmNmhacgx7MZEtunTQTGZHYADREpQM4EJ3GmdkrbjwqTAJ",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "1044",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1044",
          "originalContent": {
            "uri": "ipfs://QmS3mcnRtjeUX7a1HAG5hMbPetQMjWSWhmD57AiPm4wPFo",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "188",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/188",
          "originalContent": {
            "uri": "ipfs://QmPnPEAdMUovvZTCPpyZJJhyGuVLq6YVyZj88tJbjqQiwn",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "1212",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1212",
          "originalContent": {
            "uri": "ipfs://QmNRKUobxikfymw5386TRysoFyNUJpr4D4EatoTiiJftJc",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "809",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/809",
          "originalContent": {
            "uri": "ipfs://QmV7G7p1sxv8Udzouo8qacBVMmPEWrMMb5JVsSRZSRyzkp",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "6865",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/6865",
          "originalContent": {
            "uri": "ipfs://QmU8ebqh7qL2WFBkoKAdAkNEzTEHuZfAcU5FMeJb3Nn3Jq",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        },
        {
          "contractName": "BoredApeYachtClub",
          "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
          "symbol": "BAYC",
          "tokenId": "865",
          "owners": [
            {
              "amount": 1,
              "address": "0x54BE3a794282C030b15E43aE2bB182E14c409C5e"
            }
          ],
          "name": "BoredApeYachtClub",
          "description": "",
          "contentURI": "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/865",
          "originalContent": {
            "uri": "ipfs://QmQ2AJzdeXXBTBdxNaT4wHDXymekcGMZBrQaXd7gHKhUrp",
            "metaType": "unknown"
          },
          "chainId": 1,
          "collectionName": "BoredApeYachtClub",
          "ercType": "ERC721"
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":10}",
        "totalCount": 109
      }
    }
  }
}
```



# 

# Using LensClient SDK

Example use.

```typescript
const result = await lensClient.nfts.fetch({
  chainIds: [80001],
  ownerAddress: '0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6',
  limit: 10,
}),

```