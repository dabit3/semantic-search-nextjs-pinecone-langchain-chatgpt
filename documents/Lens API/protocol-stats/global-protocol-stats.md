---
title: "Global protocol stats"
slug: "global-protocol-stats"
hidden: false
createdAt: "2022-03-23T10:40:55.030Z"
updatedAt: "2023-03-14T13:00:54.722Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/protocol-stats/global-protocol-stats.ts>

This query returns to you the global protocol stats of key metrics.

# API Design

```javascript Example operation
query GlobalProtocolStats {
  globalProtocolStats(request: null) {
    totalProfiles
    totalBurntProfiles
    totalPosts
    totalMirrors
    totalComments
    totalCollects
    totalFollows
    totalRevenue {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
  }
}
```
```javascript Example response
{
  "data": {
    "globalProtocolStats": {
      "totalProfiles": 291,
      "totalBurntProfiles": 10,
      "totalPosts": 186,
      "totalMirrors": 23,
      "totalComments": 59,
      "totalCollects": 19,
      "totalFollows": 85,
      "totalRevenue": [
        {
          "asset": {
            "name": "Wrapped Matic",
            "symbol": "WMATIC",
            "decimals": 18,
            "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
          },
          "value": "6.94648"
        }
      ]
    }
  }
}
```
```javascript Query interface
type Query {
	globalProtocolStats(request: GlobalProtocolStatsRequest): GlobalProtocolStats!
}
```
```javascript Request
input GlobalProtocolStatsRequest {
  # Unix time from timestamp - if not supplied it will go from 0 timestamp
  fromTimestamp: UnixTimestamp

  # Unix time to timestamp - if not supplied it go to the present timestamp
  toTimestamp: UnixTimestamp

  # The App Id
  sources: [Sources!]
}
```
```javascript Response
type GlobalProtocolStats {
  totalProfiles: Int!
  totalBurntProfiles: Int!
  totalPosts: Int!
  totalMirrors: Int!
  totalComments: Int!
  totalCollects: Int!
  totalFollows: Int!
  totalRevenue: [Erc20Amount!]!
}
```



## Request

Let's look at the query options we can use here to get for different things. 

```javascript get global stats
{
    // if this is not supplied it will not have a from cap
    // it is a unix timestamp
    "fromTimestamp": 1642934933,
    // if this is not supplied it will not have a to cap
    // it is a unix timestamp
    "toTimestamp": 1648032533
    // also dont forget you can filter these stats on sources
    // this will adjust the posts, mirrors and comments stats
    // "sources": ["lost-place-dapp"]
 }
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.stats.fetch({
  fromTimestamp: 1642934933,
  toTimestamp: 1648032533,
  sources: ['someAppId']
});
```