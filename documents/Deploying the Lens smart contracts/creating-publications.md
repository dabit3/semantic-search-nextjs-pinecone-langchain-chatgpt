---
title: "Publishing Posts"
slug: "creating-publications"
excerpt: "Publish your first post and in doing so, learn to publish whatever you like!\n##### Jump to [Recap](#recap) to get the full source code 🌿"
hidden: false
createdAt: "2022-01-17T21:38:03.900Z"
updatedAt: "2022-10-27T22:38:45.486Z"
---
## Creating the Custom Task

I'm sure you're used to it by now; we'll start by creating a new file called `post.ts` in the `tasks/` directory. 

We'll also include our usual imports and basic initialization. We're also going to be using the `FreeCollectModule,` which allows any follower to collect our post for free into perpetuity. Here's what the file should look like:

```
import { defaultAbiCoder } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { PostDataStruct } from '../typechain-types/LensHub';
import { getAddrs, initEnv, waitForTx, ZERO_ADDRESS } from './helpers/utils';

task('post', 'publishes a post')
  .setAction(async ({}, hre) => {
    const [governance, , user] = await initEnv(hre);
    const addrs = getAddrs();
    const freeCollectModuleAddr = addrs['free collect module'];
    const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
  });

```



## Whitelisting the Collect Module

The protocol only allows whitelisted collect modules to be used in posts and comments (mirrors don't have a collect module associated with them), so we've got to whitelist our free collect module:

```
...
  await waitForTx(lensHub.whitelistCollectModule(freeCollectModuleAddr, true));
...
```



## Creating the Post

Now that we've whitelisted the collect module, we're ready to create our post! Like profile creation, publishing functions (in our case, we're only looking at `post()`) use an input data struct. Here's what the data struct we need looks like (from `contracts/libraries/Datatypes.sol`):

```
// NOTE: This struct is defined in the contracts/libraries/Datatypes.sol library

    /**
     * @notice A struct containing the parameters required for the `post()` function.
     *
     * @param profileId The token ID of the profile to publish to.
     * @param contentURI The URI to set for this new publication.
     * @param collectModule The collect module to set for this new publication.
     * @param collectModuleInitData The data to pass to the collect module's initialization.
     * @param referenceModule The reference module to set for the given publication, must be whitelisted.
     * @param referenceModuleInitData The data to be passed to the reference module for initialization.
     */
    struct PostData {
        uint256 profileId;
        string contentURI;
        address collectModule;
        bytes collectModuleInitData;
        address referenceModule;
        bytes referenceModuleInitData;
    }
```



Now we're ready to move forward with building our input struct! We want the profile ID to be 1 since we own the only profile in existence. The content URI can be mocked. The collect module will be the newly whitelisted `FreeCollectModule,` which takes no data, and lastly, the reference module and its associated data field are free.

>  In production you will want to make sure the content saved for the `contentURI` conforms to the metadata standards outlined [here](https://docs.lens.xyz/docs/metadata-standards).

Here's how that should look:

```
...
  const inputStruct: PostDataStruct = {
    profileId: 1,
    contentURI: 'https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz',
    collectModule: freeCollectModuleAddr,
    collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
  };
...
```



Alright, now we're just about ready to execute the transaction. Like profile creation, we'll connect the `lensHub` instance to our `user` signer and send the transaction! To be sure, we're also going to add some logging to ensure everything works exactly how we expect it to:

```
...
  await waitForTx(lensHub.connect(user).post(inputStruct));
  console.log(await lensHub.getPub(1, 1));
...
```



## Recap

Create file `tasks/post.ts` with the following code:

```
import { defaultAbiCoder } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { PostDataStruct } from '../typechain-types/LensHub';
import { getAddrs, initEnv, waitForTx, ZERO_ADDRESS } from './helpers/utils';

task('post', 'publishes a post').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const freeCollectModuleAddr = addrs['free collect module'];
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  await waitForTx(lensHub.whitelistCollectModule(freeCollectModuleAddr, true));

  const inputStruct: PostDataStruct = {
    profileId: 1,
    contentURI: 'https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz',
    collectModule: freeCollectModuleAddr,
    collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
  };

  await waitForTx(lensHub.connect(user).post(inputStruct));
  console.log(await lensHub.getPub(1, 1));
});
```



Finally, let's go ahead and run the task:

```
$ npx hardhat post --network localhost
```



If everything went according to plan, the console should output something like this:

```
[
  BigNumber { _hex: '0x00', _isBigNumber: true },
  BigNumber { _hex: '0x00', _isBigNumber: true },
  'https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz',
  '0x0000000000000000000000000000000000000000',
  '0x20Ce94F404343aD2752A2D01b43fa407db9E0D00',
  '0x0000000000000000000000000000000000000000',
  profileIdPointed: BigNumber { _hex: '0x00', _isBigNumber: true },
  pubIdPointed: BigNumber { _hex: '0x00', _isBigNumber: true },
  contentURI: 'https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz',
  referenceModule: '0x0000000000000000000000000000000000000000',
  collectModule: '0x20Ce94F404343aD2752A2D01b43fa407db9E0D00',
  collectNFT: '0x0000000000000000000000000000000000000000'
]
```



Awesome! That checks out -- we've created our first profile and published our first post. Now, naturally, our profile and post are a bit lonely, out there in the void, so let's move forward with following our profile and collecting the post!