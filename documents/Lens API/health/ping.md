---
title: "Ping"
slug: "ping"
hidden: false
createdAt: "2022-02-18T08:35:45.162Z"
updatedAt: "2022-09-23T15:13:49.719Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/health/ping.ts>

This returns if the API is online.

# API details

```javascript Example operation
query Query {
  ping
}
```
```javascript Example response
{
  "data": {
    "ping": "pong"
  }
}
```
```javascript Query interface
ping: String!
```
```text Response
String!
```