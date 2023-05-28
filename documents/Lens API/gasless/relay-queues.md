---
title: "Relay queues tracking"
slug: "relay-queues"
hidden: false
createdAt: "2023-04-12T13:04:22.684Z"
updatedAt: "2023-04-13T12:57:53.955Z"
---
The relay can sometimes get very busy as we scale. We will keep adding new relays to load and balance them out. This query is great for debugging to see the size of each queue if you ever see any delays in it being submitted on-chain. 

This API call can sometimes take 10-20 seconds if you are not using the cache, as it has to speak to the defender, which is not fast. It will respond instantly if you are saved the cache. This data is cached for 5 minutes at a time.

If this fails due to Defender DB being unable to work it out, you can just retry. We do not suggest anyone to use this for any production code, it purely exists to get visibility for queues.

# API Design

```graphql Example operation
query RelayQueues {
  relayQueues {
    relayer
    address
    queue
  }
}
```
```javascript Example response
{
  "data": {
    "relayQueues": [
      {
        "relayer": "CREATE_PROFILE",
        "address": "0xe7Af8325aA443F7678B651d4f0De23663E818691",
        "queue": 0
      },
      {
        "relayer": "DISPATCHER_1",
        "address": "0xD1FecCF6881970105dfb2b654054174007f0e07E",
        "queue": 17
      },
      {
        "relayer": "DISPATCHER_10",
        "address": "0x761010EFc8826fFdcb8Ad005BD935698ed38DfE7",
        "queue": 5
      },
      {
        "relayer": "DISPATCHER_2",
        "address": "0xC9FA5F824530b0DB3Df97820ded190F849b9bc0d",
        "queue": 5
      },
      {
        "relayer": "DISPATCHER_3",
        "address": "0xca674628a04dA98D12147EF8bE7c3663bc0820Ff",
        "queue": 2
      },
      {
        "relayer": "DISPATCHER_4",
        "address": "0x999119915b0d11aE86087F03E312aCC1C2aC750E",
        "queue": 2
      },
      {
        "relayer": "DISPATCHER_5",
        "address": "0x3530c7CAc2E47F27bA82a5d0D3671181171292DB",
        "queue": 4
      },
      {
        "relayer": "DISPATCHER_6",
        "address": "0x112b57A293d99b79Fe360Af042bb3bfFc824Ab3a",
        "queue": 4
      },
      {
        "relayer": "DISPATCHER_7",
        "address": "0x25418Bcf53dAe1167cD5d0cad34Eec31C0C37E41",
        "queue": 6
      },
      {
        "relayer": "DISPATCHER_8",
        "address": "0xeCE7edDc02FB8F0010420D0d76911826b1536655",
        "queue": 4
      },
      {
        "relayer": "DISPATCHER_9",
        "address": "0x76D4fFdA8c66864FA07f0a285B8E01E11b4Bb7b3",
        "queue": 2
      },
      {
        "relayer": "PROXY_ACTION_COLLECT_1",
        "address": "0xBa4ae59edF4b34974dD6b19c89646b09AB1E044d",
        "queue": 1
      },
      {
        "relayer": "PROXY_ACTION_COLLECT_2",
        "address": "0x77582a98132c2BE11a6C0F85Ca6361555A030A68",
        "queue": 1
      },
      {
        "relayer": "PROXY_ACTION_COLLECT_3",
        "address": "0x75fAe78Ce542DE64824DF2e60e2828bC2A2d953c",
        "queue": 4
      },
      {
        "relayer": "PROXY_ACTION_COLLECT_4",
        "address": "0x765F899Cc972768cd0440e7aaB112C26afbEE7cA",
        "queue": 5
      },
      {
        "relayer": "PROXY_ACTION_COLLECT_5",
        "address": "0x479b18C5c5cd07777D97c523983779Bb6b4f8312",
        "queue": 6
      },
      {
        "relayer": "PROXY_ACTION_COLLECT_6",
        "address": "0x9FE3c6449Dd952b16FD452B096EFb7f50a895ADc",
        "queue": 7
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_1",
        "address": "0x900caB7bB11Ae04B943496FD6Ae686Fb15f4d98E",
        "queue": 0
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_10",
        "address": "0xB2989c99C673510d04b9A7202108164DC03e89c7",
        "queue": 2
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_2",
        "address": "0x6204BFAa0f5be46F0D3DeA4334E66523a973086b",
        "queue": 1
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_3",
        "address": "0xaC5314FC0cD30064C6BD143f74aA724c0C69FD40",
        "queue": 1
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_4",
        "address": "0xdB400AbFa13E11a93a6b631Ebad2F15BA4bC43DA",
        "queue": 3
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_5",
        "address": "0x9A286e7f4c3245b812fadCD2c00bC818b9a754a0",
        "queue": 3
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_6",
        "address": "0xD209b5957a3eaB13008a18179E44f97ab34269d2",
        "queue": 3
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_7",
        "address": "0x9C8297dfDBD09330cF6AA458639aAEC29090d9c5",
        "queue": 3
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_8",
        "address": "0xf1a42d1975826b6beCBCaF6Cd105eecE26bc5C76",
        "queue": 3
      },
      {
        "relayer": "PROXY_ACTION_FOLLOW_9",
        "address": "0x886E88c733AbBf5400b54766569b077088348ffE",
        "queue": 3
      },
      {
        "relayer": "WITH_SIG_1",
        "address": "0x10773553e2144379c63fc69Ad357217acc79917e",
        "queue": 9
      },
      {
        "relayer": "WITH_SIG_2",
        "address": "0x5B24683d4AD155EDA4782C8b6930B2C065014c32",
        "queue": 17
      },
      {
        "relayer": "WITH_SIG_3",
        "address": "0xe6aB66Ca47b9c6CF5a0269786E6aF86a44FF8c49",
        "queue": 27
      }
    ]
  }
}
```