---
title: "On chain identity"
slug: "on-chain-identity"
hidden: false
createdAt: "2022-09-23T11:55:32.540Z"
updatedAt: "2022-11-09T10:31:54.373Z"
---
Every profile has an owner and with that, we are building up an on-chain identity for these profiles. This allows you to do powerful things like knowing if that profile has a human behind it, showing the ens name, and a lot more. We keep building this and adding to this further soon enough. The on-chain identity object is not in all profile examples to not bloat the request. 

# API design

please note the example below doesn't pick all the content out of the publication it just shows you the field used to get that back.

```graphql Example operation
query Profile {
  profile(request: { profileId: "0x06" }) {
    onChainIdentity {
      ens {
        name
      }
      proofOfHumanity
      sybilDotOrg {
        verified
        source {
          twitter {
            handle
          }
        }
      }
      worldcoin {
        isHuman
      }
    }
  }
}
```
```json Example response
{
  "data": {
    "profile": {
      "onChainIdentity": {
        "ens": {
          "name": "svg.eth"
        },
        "proofOfHumanity": true,
        "sybilDotOrg": {
          "verified": false,
          "source": {
            "twitter": {
              "handle": null
            }
          }
        },
        "worldcoin": {
          "isHuman": true
        }
      }
    }
  }
}
```



## Response

### ens

- Returns you the ens if the profile owner has one

### proofOfHumanity

- The POH status of the profile owner

### sybilDotOrg

<https://raw.githubusercontent.com/Uniswap/sybil-list/master/verified.json>

- The Sybil status of the profile owner

### worldcoin

- The worldcoin status of the profile owner