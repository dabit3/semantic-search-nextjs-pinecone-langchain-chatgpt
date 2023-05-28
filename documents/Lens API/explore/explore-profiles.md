---
title: "Explore profiles"
slug: "explore-profiles"
hidden: false
createdAt: "2022-05-30T08:27:37.165Z"
updatedAt: "2023-03-14T10:18:47.727Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/explore/explore-profiles.ts>

This query returns a list of profiles based on the profile sort criteria you pass in.

# API Design

> 📘 Use the GraphQL schema...
> 
> One of the huge advantages of GraphQL is you have a schema that should explain how the request and response schema should look at what properties exist in that. In these docs we explore code examples and explain key concepts but we will not explain each property that exists in the response for example, as the schema already does that!

The example below uses `MOST_FOLLOWERS` sort criteria but you have many other options which are explained below.

```graphql Example operation
query ExploreProfiles {
  exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
    items {
      id
      name
      bio
      isDefault
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      handle
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          contractAddress
          amount {
            asset {
              name
              symbol
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
        type
        }
        ... on RevertFollowModuleSettings {
        type
        }
      }
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
    "exploreProfiles": {
      "items": [
        {
          "id": "0x21d5",
          "name": "Caio Vicentino",
          "bio": "Caio Vicentino no YouTube\nEmbaixador do MakerDAO no Brasil.\nDo Ceará pro Mundo.\nYield Hacker 🔥\n#DeFi #MAYC 6899, KODA 3375.\nCaiov.eth\nlinktr.ee/caiovicentino\nFortaleza, Ceará, Brasil.\n",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "location",
              "value": "Brazil"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://www.caioinveste.com.br/"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "caiovicentino"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "followNftAddress": null,
          "handle": "caiovicentino.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmNVCUvjTGLqUoJ6Nqfwc434RtKx7EWvkLdSdAAEg5EwkQ",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/Qmcg3uAXMDGvPsLuT3zQ2A92fuPAPCFgWyt4oMFAuL5jZq",
              "mimeType": null
            }
          },
          "ownedBy": "0xB6ad42D615759E50C8087849a2F6f0E2032f7085",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 1188,
            "totalFollowing": 9,
            "totalPosts": 23,
            "totalComments": 14,
            "totalMirrors": 6,
            "totalPublications": 43,
            "totalCollects": 161
          },
          "followModule": null
        },
        {
          "id": "0x10",
          "name": "Daniel",
          "bio": "Senior Software Developer | Blockchain enthusiast  | working at \n@AaveAave  &  @LensProtocol  & much more :D\n- My Roots are my own",
          "isDefault": true,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensFrens"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "location",
              "value": "Metaverse"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "website",
              "value": "https://damarnez.me"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "twitter",
              "value": "damarnez"
            }
          ],
          "metadata": null,
          "handle": "damarnez.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmR6913vGvoLHjqZ4BMtYDLSxD3p7iscSCYkQTPTL6vRv7",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmcYCCtSyQyQ8j39nKQfNiMbkLuC6C73dV5uQP7vpm9mj7",
              "mimeType": null
            }
          },
          "ownedBy": "0x88a769db5055B046c9A45Db621978bbEC65c8c5b",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 1122,
            "totalFollowing": 30,
            "totalPosts": 6,
            "totalComments": 1,
            "totalMirrors": 0,
            "totalPublications": 7,
            "totalCollects": 52
          },
          "followModule": null
        },
        {
          "id": "0x05",
          "name": null,
          "bio": null,
          "isDefault": true,
          "attributes": [],
          "metadata": null,
          "handle": "stani.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmcxGEZ1Qqiw4EHqJTee8tPZBesvppuy7swFnRFMoM1Ka9",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0x2E21f5d32841cf8C7da805185A041400bF15f21A",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 1067,
            "totalFollowing": 157,
            "totalPosts": 30,
            "totalComments": 31,
            "totalMirrors": 2,
            "totalPublications": 63,
            "totalCollects": 1222
          },
          "followModule": {
            "type": "ProfileFollowModule"
          }
        },
        {
          "id": "0x27",
          "name": "jim",
          "bio": "experiments @ aave",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://0xjim.xyz"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "0xjim"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "0xjim.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmSJnNcdrPNvtaRnxsHBeMcVW6Q2NfBSDHs8bzJa9EaXoU",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0x705A42EcC5dF243BF9298f1D091b89761522a796",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 821,
            "totalFollowing": 7,
            "totalPosts": 2,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 2,
            "totalCollects": 19
          },
          "followModule": null
        },
        {
          "id": "0x01",
          "name": "LensProtocol.eth 🌿",
          "bio": "A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://lens.xyz"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "lensprotocol"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "lensprotocol",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
              "mimeType": null
            }
          },
          "ownedBy": "0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 788,
            "totalFollowing": 0,
            "totalPosts": 6,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 6,
            "totalCollects": 267
          },
          "followModule": {
            "type": "ProfileFollowModule"
          }
        },
        {
          "id": "0x0d",
          "name": "Yoginth",
          "bio": "요기 • Creator of @lenster.lens 🌸 • Bullish on Ξ • BTS Fanboi ⟬⟭ • he/him 🌳",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "location",
              "value": "India"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://yogi.codes"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "yogicodes"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "yoginth.lens",
          "picture": {
            "contractAddress": "0x6466B863353851F2ae866167610449B31A385df7",
            "tokenId": "26396376898576019325902668567942607247753500533935235934491478860533906538497",
            "uri": "https://statics-polygon-lens.s3.eu-west-1.amazonaws.com/profile/nft-0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3_polygon_0x6466B863353851F2ae866167610449B31A385df7_26396376898576019325902668567942607247753500533935235934491478860533906538497.png",
            "chainId": 137,
            "verified": true
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmR7vBHZm78hsymxYFkQBV4UC42Y4iGyHgyFwisMu9S66B",
              "mimeType": null
            }
          },
          "ownedBy": "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3",
          "dispatcher": {
            "address": "0x57B7bf6f792a6181Ec5aFB88cE7bcE330a9d1b67",
            "canUseRelay": false
          },
          "stats": {
            "totalFollowers": 779,
            "totalFollowing": 31,
            "totalPosts": 16,
            "totalComments": 89,
            "totalMirrors": 31,
            "totalPublications": 136,
            "totalCollects": 257
          },
          "followModule": {
            "type": "ProfileFollowModule"
          }
        },
        {
          "id": "0xf5",
          "name": "Miguel Piedrafita",
          "bio": "20. Purple-haired developer @ Worldcoin, core ConstitutionDAO. I talk about crypto, code, privacy & more. he/him",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "location",
              "value": "Madrid, Spain"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://miguelpiedrafita.com"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "m1guelpf"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "m1guelpf.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmaiB8mqrYnNTEnjEL4TCfrkBDjZv6QQ9uh5FjTHa7Prmq",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmXjPMWt5qC7yYtMCMRqpwwu6VgGdc4Qrapncw3xnGGpCh",
              "mimeType": null
            }
          },
          "ownedBy": "0xE340b00B6B622C136fFA5CFf130eC8edCdDCb39D",
          "dispatcher": {
            "address": "0x57B7bf6f792a6181Ec5aFB88cE7bcE330a9d1b67",
            "canUseRelay": false
          },
          "stats": {
            "totalFollowers": 450,
            "totalFollowing": 28,
            "totalPosts": 23,
            "totalComments": 20,
            "totalMirrors": 2,
            "totalPublications": 45,
            "totalCollects": 159
          },
          "followModule": {
            "type": "ProfileFollowModule"
          }
        },
        {
          "id": "0x0c",
          "name": "Lenster",
          "bio": "Lenster is a decentralized, and permissionless social media app built with @lensprotocol 🌿",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://lenster.xyz"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "lensterxyz"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "lenster.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmUGKJZDgiMtPs6D9QqtuVmFPw5DTzvz6Tyb3HQYy9L5A3",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmPWMh27K5J7pQphSyesrYjr1tm1fjqtU4x8h7QyqqSazw",
              "mimeType": null
            }
          },
          "ownedBy": "0xd3B307753097430FaEdFdb89809610bF8e8f3203",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 447,
            "totalFollowing": 1,
            "totalPosts": 4,
            "totalComments": 1,
            "totalMirrors": 4,
            "totalPublications": 9,
            "totalCollects": 110
          },
          "followModule": {
            "type": "ProfileFollowModule"
          }
        },
        {
          "id": "0x012c",
          "name": "airdrop hunter",
          "bio": "my best airdrops in the past few years, including:$UNI, $ENS, $dYdX,$BICO $INCH, $SNX,  $ILV, $NOTE, $RSS3,$OP",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "creatorfundincubator.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmZvb1JKG2BA7mz39ieQEAvBD1T9nSc2sEgGj7d1p6UEGW",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0x84c0430F3564520dCde45C3dFD7cEb79372e4fA3",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 441,
            "totalFollowing": 1957,
            "totalPosts": 76,
            "totalComments": 469,
            "totalMirrors": 0,
            "totalPublications": 545,
            "totalCollects": 14
          },
          "followModule": null
        },
        {
          "id": "0x0160",
          "name": "ETHGlobal",
          "bio": "Growing the Ethereum ecosystem.",
          "isDefault": true,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensFrens"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "location",
              "value": "Decentralized"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "website",
              "value": "https://ethglobal.com"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "twitter",
              "value": "ethglobal"
            }
          ],
          "metadata": null,
          "handle": "ethglobal.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmPhtJNJ29iADT4NqnvDJKiZR4ie3cx2oEhwJAcD7rMMC3",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0xe993486B257Cd1481aef74b3B909A2627Fc8d305",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 390,
            "totalFollowing": 9,
            "totalPosts": 6,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 6,
            "totalCollects": 15
          },
          "followModule": null
        },
        {
          "id": "0x011d",
          "name": "Marc Zeller",
          "bio": null,
          "isDefault": true,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensFrens"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "location",
              "value": "Gotchiverse"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "twitter",
              "value": "lemiscate"
            }
          ],
          "metadata": null,
          "handle": "aavechan.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmfZkcDnYtWwRgYtvpZWwNjwdn7ScP4AHnobu5w2EDf4ot",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 333,
            "totalFollowing": 8,
            "totalPosts": 0,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 0,
            "totalCollects": 0
          },
          "followModule": null
        },
        {
          "id": "0x0a20",
          "name": "Jeremy",
          "bio": "Entered the encryption industry in 2015, started mining Ethereum in 2016, and has been building; Web3.0 has come, let us join hands to build a better future!",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "location",
              "value": "Singapore"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://www.fortunetree-sg.com/"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "FortuneTrees"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "fortunetrees.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmTkcegVLUy7YL6Wqz5Gv4y9fDdb2T1yKB6VjtubJ481Vf",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmTkcegVLUy7YL6Wqz5Gv4y9fDdb2T1yKB6VjtubJ481Vf",
              "mimeType": null
            }
          },
          "ownedBy": "0x1A8167907256ECE255be4563c141C88EE16427CA",
          "dispatcher": {
            "address": "0x57B7bf6f792a6181Ec5aFB88cE7bcE330a9d1b67",
            "canUseRelay": false
          },
          "stats": {
            "totalFollowers": 331,
            "totalFollowing": 11,
            "totalPosts": 700,
            "totalComments": 10,
            "totalMirrors": 8,
            "totalPublications": 718,
            "totalCollects": 49
          },
          "followModule": null
        },
        {
          "id": "0x1cef",
          "name": "David Hoffman ",
          "bio": "Just setting my lens profile ",
          "isDefault": false,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensClaimingApp"
            }
          ],
          "metadata": null,
          "handle": "trustlessstate.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmVqqiMiXCfbSHk43ufgTMcGQwmjBujiUmJDQdYbzZi7Ju",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0x3555d1E058E971d48c4266bF2264ebFc553d3F90",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 296,
            "totalFollowing": 7,
            "totalPosts": 2,
            "totalComments": 3,
            "totalMirrors": 0,
            "totalPublications": 5,
            "totalCollects": 29
          },
          "followModule": null
        },
        {
          "id": "0x0193",
          "name": "beautiful destinations",
          "bio": "Inspiring people to connect and make a positive impact through travel. 🌏 We are a climate-positive company that advocates sustainable tourism. ♻️",
          "isDefault": false,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "tiffanyatrump.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmakeGFkpkAvwbvoxApkFbpphJHvwzadcfKnjXJbQQRxWR",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmWxUijYK2bHBFFnPC26uG6N2xof2aXp1iKZAiCCMfAwQK",
              "mimeType": null
            }
          },
          "ownedBy": "0xbd7B2C3E167A1FfbDa56917e13f0802aFFC326d5",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 296,
            "totalFollowing": 811,
            "totalPosts": 31,
            "totalComments": 88,
            "totalMirrors": 1,
            "totalPublications": 120,
            "totalCollects": 7
          },
          "followModule": null
        },
        {
          "id": "0x8e",
          "name": "Christina",
          "bio": "Stay curious 🌎 // Building the Future at Lens 🌿 / Head of Growth // Prev music + NFTs  TikTok / Bytedance (before it was on your 📱)  ",
          "isDefault": false,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "0xchristina"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "christina.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmawgZknFmZpU97tKEfBJKxwYZpkvZLQRkddHwpsuU2Asn",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmW5CNz3r63hzfBhRzXpaP2R4HHqb4jXStut6DzmeycroL",
              "mimeType": null
            }
          },
          "ownedBy": "0xA7d53695aF1FD11E0b75d37695290C102D59D743",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 248,
            "totalFollowing": 98,
            "totalPosts": 9,
            "totalComments": 25,
            "totalMirrors": 6,
            "totalPublications": 40,
            "totalCollects": 94
          },
          "followModule": null
        },
        {
          "id": "0x02",
          "name": "Aave",
          "bio": "We built Aave Protocol, an open source and non-custodial liquidity protocol. #DeFi #FlashLoans $AAVE http://aave.com/discord http://instagram.com/aave.aave",
          "isDefault": true,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensFrens"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "location",
              "value": "London, England"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "website",
              "value": "https://aave.com"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "twitter",
              "value": "aaveaave"
            }
          ],
          "metadata": null,
          "handle": "aaveaave.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmeG11YaqCAirSXPhiN6qLNDqMsnED8WLJLgv2bhtE3QaS",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmXCNuoC4CfttCefwU4y8HemdD39921DfFmJGFo9kAqwWc",
              "mimeType": null
            }
          },
          "ownedBy": "0x0550730EDb1948d3170113FF4FA0e4770fA47401",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 246,
            "totalFollowing": 1,
            "totalPosts": 2,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 2,
            "totalCollects": 19
          },
          "followModule": {
            "type": "ProfileFollowModule"
          }
        },
        {
          "id": "0x0143",
          "name": "Fei",
          "bio": "Biochemist. 🇦🇷\nCrypto Enthusiast. Going bankless. Researcher. \nCurrent state: +25 browser tabs open",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "location",
              "value": "Buenos Aires, Argentina"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://app.poap.xyz/scan/feiwian.eth"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "Monocito_"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "feiwian.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/Qmd1dX3SBdFUxEJGfEBt3v2PB8NKvRwz2f4oz43ytBxhZP",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmUt8TcXx4QDEkW29uEhHqgYTRqE3DmGHXSrhukgkkUYLd",
              "mimeType": null
            }
          },
          "ownedBy": "0xb00Cc766b7AdC1a34d72EA46a8d4bbdfBc5904F9",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 228,
            "totalFollowing": 61,
            "totalPosts": 12,
            "totalComments": 41,
            "totalMirrors": 8,
            "totalPublications": 61,
            "totalCollects": 226
          },
          "followModule": null
        },
        {
          "id": "0xf7",
          "name": "链上达人",
          "bio": "Hi，bro",
          "isDefault": false,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensFrens"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "location",
              "value": "China"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "twitter",
              "value": "@wenxue600"
            }
          ],
          "metadata": null,
          "handle": "wenxue600.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmdqdLCenhB97Enb4Us3ZBfQqQcyryGCJWciTA26ZB6Yaz",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0x5b197E3eE6770518f6F2735274522F48aBd69864",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 225,
            "totalFollowing": 7,
            "totalPosts": 9,
            "totalComments": 7,
            "totalMirrors": 2,
            "totalPublications": 18,
            "totalCollects": 477
          },
          "followModule": null
        },
        {
          "id": "0x0210",
          "name": "Paris Rouzati",
          "bio": "GP at IDEO VC crypto. Doing things with We3 + rAAVE. Dog mom, pasta lover, CryptoToadz fan. 🐻‍❄️ 🍩 👩🏻‍💻 ☁️ ",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "location",
              "value": "🌌"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "parisrouz"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "paris.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmWn5CgWGR5A3oGATAPoamqb2QPyxPFeDnGpybG6ZdxpY9",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/Qmd3LNbqtyxhdmfZ6VU71vER7wrXFnoKAR6Fi2KV63yLPX",
              "mimeType": null
            }
          },
          "ownedBy": "0xA83444576F86C8B59A542eC2F286a19aB12c2666",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 221,
            "totalFollowing": 39,
            "totalPosts": 7,
            "totalComments": 21,
            "totalMirrors": 0,
            "totalPublications": 28,
            "totalCollects": 60
          },
          "followModule": null
        },
        {
          "id": "0x26e5",
          "name": "Sismo",
          "bio": "We develop the Sismo Protocol issuing ZK attestations for reputation aggregation and privacy preserving access control.",
          "isDefault": false,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensFrens"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "website",
              "value": "https://sismo.io"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "twitter",
              "value": "Sismo_eth"
            }
          ],
          "metadata": null,
          "handle": "sismo.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmVnR5v3tMuFfqDUmAKZAn4jhNcTgSwsj6jYTSN5aGow1Y",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmduXoXUTJ6q1LM2M4GeqQCBpB1zjLMMXJoHWsKUZAYU6Z",
              "mimeType": null
            }
          },
          "ownedBy": "0xB0A179C459484885D1875009110F3cE3064867B9",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 210,
            "totalFollowing": 0,
            "totalPosts": 0,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 0,
            "totalCollects": 0
          },
          "followModule": null
        },
        {
          "id": "0x28a2",
          "name": "nader dabit",
          "bio": "teacher, author, software developer building in web3",
          "isDefault": false,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "dabit3"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "nader.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmTfwKddZeHTWyvjbBK6LwrTpLrHwvGxBa9QbgkAiH8S84",
              "mimeType": null
            }
          },
          "ownedBy": "0xB2Ebc9b3a788aFB1E942eD65B59E9E49A1eE500D",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 204,
            "totalFollowing": 67,
            "totalPosts": 2,
            "totalComments": 1,
            "totalMirrors": 2,
            "totalPublications": 5,
            "totalCollects": 16
          },
          "followModule": null
        },
        {
          "id": "0x28f2",
          "name": "WOMEN IN WEB3",
          "bio": "A DAO-2B that invests in womxn who simply wants to explore web3 rabbit holes, in order to find their dream careers.",
          "isDefault": false,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensClaimingApp"
            }
          ],
          "metadata": null,
          "handle": "womeninweb3.lens",
          "picture": null,
          "coverPicture": null,
          "ownedBy": "0x9b27cCf7ff2039Ca56fAC29C51519F08d5e87530",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 198,
            "totalFollowing": 0,
            "totalPosts": 0,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 0,
            "totalCollects": 0
          },
          "followModule": null
        },
        {
          "id": "0x1c19",
          "name": "Gabriel",
          "bio": "GM CT",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "clipto.io"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "gabrielhaines"
            },
            {
              "displayType": null,
              "traitType": "boolean",
              "key": "isBeta",
              "value": "true"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "gabriel.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmWDVt7vNoYkFvYSyBk8pdu9xSKiqt5PtYE4kaYNxnCgdA",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0xCFFE08BDf20918007f8Ab268C32f8756494fC8D8",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 194,
            "totalFollowing": 57,
            "totalPosts": 21,
            "totalComments": 28,
            "totalMirrors": 2,
            "totalPublications": 51,
            "totalCollects": 13
          },
          "followModule": null
        },
        {
          "id": "0x1a75",
          "name": "cryptocurrency(🌿,🌿)",
          "bio": "🦇🔊enthusiast WAGMI",
          "isDefault": false,
          "attributes": [
            {
              "displayType": "string",
              "traitType": null,
              "key": "app",
              "value": "LensFrens"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "website",
              "value": "https://twitter.com/monpmer"
            },
            {
              "displayType": "string",
              "traitType": null,
              "key": "twitter",
              "value": "@monpmer"
            }
          ],
          "metadata": null,
          "handle": "monpmer.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmVoyfh2vzpzzkkg8etVwEYi7AL4KFGJ4Ncse7fkWHdjA2",
              "mimeType": null
            }
          },
          "coverPicture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmVoyfh2vzpzzkkg8etVwEYi7AL4KFGJ4Ncse7fkWHdjA2",
              "mimeType": null
            }
          },
          "ownedBy": "0x9eC6c8314b1F3c87b751852D515B05178d4A50B8",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 193,
            "totalFollowing": 119,
            "totalPosts": 2,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 2,
            "totalCollects": 0
          },
          "followModule": null
        },
        {
          "id": "0x1f4f",
          "name": "TonHor",
          "bio": "Web3 Builder. #MWAD",
          "isDefault": true,
          "attributes": [
            {
              "displayType": null,
              "traitType": "string",
              "key": "location",
              "value": "Web3"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "website",
              "value": "https://www.facebook.com/tonhor"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "twitter",
              "value": "tonhor"
            },
            {
              "displayType": null,
              "traitType": "string",
              "key": "app",
              "value": "Lenster"
            }
          ],
          "metadata": null,
          "handle": "tonhor.lens",
          "picture": {
            "original": {
              "url": "https://ipfs.infura.io/ipfs/QmNwSXkshxj95ezyZ7EKtvMy4A3d8giAJTnnDHaGvBbyLv",
              "mimeType": null
            }
          },
          "coverPicture": null,
          "ownedBy": "0xfb10EFE8d84E73061ABDfa5F87f26aFC1f0a98f5",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 186,
            "totalFollowing": 2,
            "totalPosts": 3,
            "totalComments": 3,
            "totalMirrors": 0,
            "totalPublications": 6,
            "totalCollects": 1
          },
          "followModule": null
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":25}",
        "totalCount": 12112
      }
    }
  }
}
```



You will see the paging result behavior repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property. 

## Request

Let's look at the query options we can use here to get a lot of data for different things. 

### sortCriteria

You can filter the profiles using any of the below:

```typescript
export enum ProfileSortCriteria {
  CREATED_ON = 'CREATED_ON',
  MOST_FOLLOWERS = 'MOST_FOLLOWERS',
  LATEST_CREATED = 'LATEST_CREATED',
  MOST_POSTS = 'MOST_POSTS',
  MOST_COMMENTS = 'MOST_COMMENTS',
  MOST_MIRRORS = 'MOST_MIRRORS',
  MOST_PUBLICATION = 'MOST_PUBLICATION',
  MOST_COLLECTS = 'MOST_COLLECTS',
}
```



## 

## 

## Using LensClient SDK

```typescript
import { ProfileSortCriteria } from "@lens-protocol/client";

lensClient.explore.profiles({
  sortCriteria: ProfileSortCriteria.MostFollowers
})
```