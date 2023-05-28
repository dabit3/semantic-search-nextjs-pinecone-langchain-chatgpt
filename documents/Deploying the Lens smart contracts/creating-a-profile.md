---
title: "Creating a Profile"
slug: "creating-a-profile"
excerpt: "Create a full-fledged profile on your local Lens deployment!\n##### Jump to [Recap](#recap) to get the full source code 🌿"
hidden: false
createdAt: "2022-01-17T19:08:28.222Z"
updatedAt: "2022-08-17T17:53:42.067Z"
---
Creating The Custom Task
------------------------

Just like the previous step where we created a Hardhat task to unpause the protocol, we will create another task to create a profile. This allows us to publish new posts, comments, and mirrors on-chain!

First, let's create a new `create-profile.ts` file in our `tasks/` directory. Then, we've only got a few things to import:

```
import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';
```

Furthermore, we'll create our task and initialize our environment like so:

```
task('create-profile', 'creates a profile').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
});
```

We'll need the governance signer because Lens uses a profile creator whitelist. Let's go ahead and whitelist the user; then, we can dive into the fun stuff and create our profile!

```
...
  await waitForTx(lensHub.whitelistProfileCreator(user.address, true));
...
```

Creating the Profile
--------------------

We've whitelisted the user to create profiles; all that's left now is to create the profile itself. Let's first take a look at the input struct required for profile creation (from `contracts/libraries/Datatypes.sol`):

```
// NOTE: This struct is defined in the contracts/libraries/Datatypes.sol library

    /**
     * @notice A struct containing the parameters required for the `createProfile()` function.
     *
     * @param to The address receiving the profile.
     * @param handle The handle to set for the profile, must be unique and non-empty.
     * @param imageURI The URI to set for the profile image.
     * @param followModule The follow module to use, can be the zero address.
     * @param followModuleInitData The follow module initialization data, if any.
     * @param followNFTURI The URI to use for the follow NFT.
     */
    struct CreateProfileData {
        address to;
        string handle;
        string imageURI;
        address followModule;
        bytes followModuleInitData;
        string followNFTURI;
    }
```

With that out of the way, let's go ahead and build our input struct. We want the profile NFT recipient to be ourselves (the user), our handle and URI can be mock values, and we don't want a follow module so that anyone can follow us:

```
...
  const inputStruct: CreateProfileDataStruct = {
    to: user.address,
    handle: 'zer0dot',
    imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
  };
...
```

Lastly, we've just got to send the transaction! We will connect the `lensHub` contract instance to our user and send the transaction with the input struct provided above. We'll also include some checks, so we know it worked on the console:

```
...
  await waitForTx(lensHub.connect(user).createProfile(inputStruct));

  console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
  console.log(
    `Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`
  );
  console.log(
    `Profile ID by handle: ${await lensHub.getProfileIdByHandle(
      'zer0dot'
    )}, user address (should be the same): ${user.address}`
  );
...
```

Recap
-----

Create the file `tasks/create-profile.ts` with the following code:

```
import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('create-profile', 'creates a profile').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

  const inputStruct: CreateProfileDataStruct = {
    to: user.address,
    handle: 'zer0dot',
    imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
  };

  await waitForTx(lensHub.connect(user).createProfile(inputStruct));

  console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
  console.log(
    `Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`
  );
  console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('zer0dot')}`);
});

```

With all that done, there's just one thing left to do-- let's run the task with the following command:

```
$ npx hardhat create-profile --network localhost
```

If all is well, we should have an output like so:

```
Total supply (should be 1): 1
Profile owner: 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
Profile ID by the handle: 1
```

Congratulations! You've successfully created a profile and received a profile NFT; now, the possibilities are endless. But we're not done yet! Next up, we're going to dig into publishing a post!