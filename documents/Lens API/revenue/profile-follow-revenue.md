---
title: "Profile follow revenue"
slug: "profile-follow-revenue"
hidden: false
createdAt: "2022-09-23T10:40:40.205Z"
updatedAt: "2023-03-14T13:43:47.607Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/revenue/profile-follow-revenue.ts>

This query returns the amounts earned on the requested profile for all follows. It will group them up by currency.

# API Design

```javascript Example operation
query ProfileFollowRevenue {
  profileFollowRevenue(request: { profileId: "0x15" }) {
    revenues {
      total {
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
}
```
```javascript Example response
{
  "data": {
    "profileFollowRevenue": {
      "revenues": [
        {
          "total": {
            "asset": {
              "name": "WETH",
              "symbol": "WETH",
              "decimals": 18,
              "address": "0x3C68CE8504087f89c640D02d133646d98e64ddd9"
            },
            "value": "0.31"
          }
        },
        {
          "total": {
            "asset": {
              "name": "Wrapped Matic",
              "symbol": "WMATIC",
              "decimals": 18,
              "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
            },
            "value": "190.0012"
          }
        }
      ]
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.revenue.profileFollow({ profileId: '0x0185' });
```