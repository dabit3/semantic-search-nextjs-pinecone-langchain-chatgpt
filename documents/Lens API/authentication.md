---
title: "Authentication"
slug: "authentication"
hidden: false
createdAt: "2022-02-17T11:50:11.701Z"
updatedAt: "2023-04-11T16:40:09.375Z"
---
## Endpoints

Authentication is used on the API on some API endpoints. In the docs, we notify you when you're looking at an endpoint that needs authentication. We use JWT tokens as our authentication layer and use the user's Ethereum wallet to verify ownership. This token can also be used in your own server-side application if you wish as you can use the [Verify JWT](doc:verify-jwt) endpoint to make sure the JWT token is valid on your server itself, this is explained in greater detail below.

Our authentication resolver contains:

- [Login](doc:login) 
- [Refresh JWT](doc:refresh-jwt) 
- [Verify JWT](doc:verify-jwt)

### 

### 

## Using LensClient SDK

Example of how to authenticate a LensClient instance. 

```typescript TypeScript
import { LensClient, development } from "@lens-protocol/client";
import { ethers } from "ethers";

const lensClient = new LensClient({
  environment: development,
});

const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY);
const address = await wallet.getAddress();

const challenge = await lensClient.authentication.generateChallenge(address);
const signature = await wallet.signMessage(challenge);

await lensClient.authentication.authenticate(address, signature);

// check the state with
await lensClient.authentication.isAuthenticated()
```