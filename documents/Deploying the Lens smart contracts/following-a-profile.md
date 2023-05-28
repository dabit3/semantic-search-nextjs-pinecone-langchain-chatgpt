---
title: "Following Profiles"
slug: "following-a-profile"
excerpt: "Follow your lonesome profile and get that Follow NFT!\n##### Jump to [Recap](#recap) to get the full source code 🌿"
hidden: false
createdAt: "2022-01-25T21:34:46.461Z"
updatedAt: "2022-08-17T17:55:24.533Z"
---
## Creating the Custom Task
You know the drill! Let's start by setting up our task in a new file called `follow.ts.` Note that we're also importing the `FollowNFT__factory` and initializing our `lensHub` to be connected with the user!
```
import { task } from 'hardhat/config';
import { LensHub__factory, FollowNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx } from './helpers/utils';

task('follow', 'follows a profile').setAction(async ({}, hre) => {
  const [, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);
});
```

## Following the Profile
Recall that we didn't use a follow module when we created our profile -- this means any wallet can follow our profile without worry! So, let's go ahead and follow our own profile:
```
...
   await waitForTx(lensHub.follow([1], [[]]));
...
```

To clarify what we're doing here, the `follow()` function takes two parameters, both of which are arrays:

1. The array of profile IDs to follow and...
2. The array of arbitrary data to pass to corresponding follow modules.

In our case, we want to follow the profile with ID "1" and pass no data since there's no follow module. The reason we need nested brackets *(this weird thing: `[[]]`)* is that the contracts ensure that both input arrays are of equal length. We need to pass one empty data parameter in our array.

Finally, let's add some logging to check if everything worked as intended. First, we'll fetch the follow NFT address; then we'll connect the `FollowNFT__factory` to it and fetch some relevant data:
```
...
  const followNFTAddr = await lensHub.getFollowNFT(1); // Retrieve the follow NFT for a given profile ID
  const followNFT = FollowNFT__factory.connect(followNFTAddr, user); // Connect our typechain bindings

  const totalSupply = await followNFT.totalSupply(); // Fetch the total supply
  const ownerOf = await followNFT.ownerOf(1); // Fetch the owner of the follow NFT with id 1 (NFT IDs in Lens start at 1, not 0!)

  console.log(`Follow NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Follow NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
  );
...
```

## Recap
Create file `tasks/follow.ts` with the following code:

```
import { task } from 'hardhat/config';
import { LensHub__factory, FollowNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx } from './helpers/utils';

task('follow', 'follows a profile').setAction(async ({}, hre) => {
  const [, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);

  await waitForTx(lensHub.follow([1], [[]]));

  const followNFTAddr = await lensHub.getFollowNFT(1);
  const followNFT = FollowNFT__factory.connect(followNFTAddr, user);

  const totalSupply = await followNFT.totalSupply();
  const ownerOf = await followNFT.ownerOf(1);

  console.log(`Follow NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Follow NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
  );
});
```

Not too shabby, right? Now, the moment we've been waiting for… Let's give it a shot:
```
$ npx hardhat follow --network localhost
```

If nothing broke (which, granted, it often does in programming), your terminal output should look a little something like this:
```
Follow NFT total supply (should be 1): 1
Follow NFT owner of ID 1: 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
```

Alright! We've managed to follow the profile. As a quick recap, we've successfully spun up our own blockchain, deployed the protocol locally, created a profile, published a post, and followed the profile; pretty sweet, huh? The next step is to collect the post!