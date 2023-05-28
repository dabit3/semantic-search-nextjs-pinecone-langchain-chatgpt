---
title: "Collecting Publications"
slug: "collecting-publications"
excerpt: "Collect your epic post and get your hands on a snazzy new Collect NFT!"
hidden: false
createdAt: "2022-01-26T19:43:55.830Z"
updatedAt: "2022-05-12T14:40:21.517Z"
---
## Creating the Custom Task
Let's go ahead and create a new task in a file called `collect.ts`. For this task, we'll be following the same initialization procedure as we did for the `follow` task, but we'll replace the `FollowNFT__factory` with a `CollectNFT__factory`, here's how that looks:
```
import { task } from 'hardhat/config';
import { LensHub__factory, CollectNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx,  } from './helpers/utils';

task('collect', 'collects a post').setAction(async ({}, hre) => {
  const [, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);
});
```

## Collecting the Post
Alright, it's time to collect our first post! Keep in mind that posts, comments, and mirrors can be collected, except collecting a mirror collects the mirrored post/comment with a referral.

Let's add the collect function call to our task:
```
...
  await waitForTx(lensHub.collect(1, 1, []));
...
```

Just so we're on the same page, this function takes three parameters:

1. The profile ID of the profile that created the publication we're collecting (in our case, 1),
2. The publication ID of the publication we're collecting and...
3. The arbitrary data to pass to the collect module.

In this situation, we're collecting the first publication from the first profile, so the first two parameters are both `1`. Next, we've got the data we want to pass to the collect module: recall that our publication's collect module is the `FreeCollectModule,` which doesn't require any data (it allows collects for free, and can be configured, at initialization, to require holding a profile's follow NFT to be able to collect, which has been done in our publication), so we'll pass an empty byte array, or `[]`.

The last thing we'll want to do is print out some information on the console to make sure everything worked as intended, and we've got our Collect NFT. We'll also validate that the collect NFT's URI corresponds to our post's content URI. Here's what that looks like:

```
...  
  const collectNFTAddr = await lensHub.getCollectNFT(1, 1);
  const collectNFT = CollectNFT__factory.connect(collectNFTAddr, user);

  const publicationContentURI = await lensHub.getContentURI(1, 1);
  const totalSupply = await collectNFT.totalSupply();
  const ownerOf = await collectNFT.ownerOf(1);
  const collectNFTURI = await collectNFT.tokenURI(1);

  console.log(`Collect NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Collect NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
  );
  console.log(
    `Collect NFT URI: ${collectNFTURI}, publication content URI (should be the same): ${publicationContentURI}`
  );
...
```

## Recap
Alright! We're almost there; let's take a look at how our `collect.ts` file looks in its entirety:
```
import { task } from 'hardhat/config';
import { LensHub__factory, CollectNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx } from './helpers/utils';

task('collect', 'collects a post').setAction(async ({}, hre) => {
  const [, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);

  await waitForTx(lensHub.collect(1, 1, []));

  const collectNFTAddr = await lensHub.getCollectNFT(1, 1);
  const collectNFT = CollectNFT__factory.connect(collectNFTAddr, user);

  const publicationContentURI = await lensHub.getContentURI(1, 1);
  const totalSupply = await collectNFT.totalSupply();
  const ownerOf = await collectNFT.ownerOf(1);
  const collectNFTURI = await collectNFT.tokenURI(1);

  console.log(`Collect NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Collect NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
  );
  console.log(
    `Collect NFT URI: ${collectNFTURI}, publication content URI (should be the same): ${publicationContentURI}`
  );
});
```

Now there's just one thing left to do:
```
npx hardhat collect --network localhost
```

If everything went according to plan, our terminal output should look a little something like this:
```
Collect NFT total supply (should be 1): 1
Collect NFT owner of ID 1: 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
Collect NFT URI: https://ipfs.fleek.co/ipfs/plantghostplantghostplantghostplantghostplantghostplantghos, publication content URI (should be the same): https://ipfs.fleek.co/ipfs/plantghostplantghostplantghostplantghostplantghostplantghos
```

Congratulations!  At this point in the walkthrough, you've managed to complete every essential interaction with the Lens Protocol. You've created your profile, interacted with it, and validated that things are how they should be!

Now, it's time to graduate to building on top of the protocol by creating an entirely new follow module.