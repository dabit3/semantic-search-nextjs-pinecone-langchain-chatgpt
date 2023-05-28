---
title: "Testing a Module"
slug: "testing-a-module"
excerpt: "Deploy and interact with your module locally!"
hidden: false
createdAt: "2022-02-04T21:46:55.302Z"
updatedAt: "2022-05-31T14:45:03.609Z"
---
[block:callout]
{
  "type": "info",
  "title": "Getting Set Up",
  "body": "If you don't yet know how to run the Docker container and interact with your own local blockchain, or if you find yourself a little confused, check out the walkthrough! \n\nThis tutorial also assumes your environment is set up and you're operating from within the Docker container."
}
[/block]
## Creating the Custom Task
Let's create a file called `test-module.ts` in the `tasks/` directory and add a few imports:
```
import { defaultAbiCoder } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import {
  FollowNFT__factory,
  LensHub__factory,
  SecretCodeFollowModule__factory,
} from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import {
  waitForTx,
  initEnv,
  getAddrs,
  ProtocolState,
  ZERO_ADDRESS,
  deployContract,
} from './helpers/utils';
```

If your linter is upset at the `SecretCodeFollowModule__factory`, make sure you've compiled the contracts that should generate the missing typechain binding.

Next up, let's go ahead and start writing our task. We're going to want to unpause the protocol, whitelist the user for profile creation, and create a profile.
```
...
task('test-module', 'tests the SecretCodeFollowModule').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

  const inputStruct: CreateProfileDataStruct = {
    to: user.address,
    handle: 'zer0dot',
    imageURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  };
  await waitForTx(lensHub.connect(user).createProfile(inputStruct));
});
...
```
Note that we connected the hub to the user to create the profile. And with that, we're ready to deploy, whitelist, set and finally test the follow module!

## Setting Up the New Module
In order to deploy a new contract, we're going to use the typechain factory, here's how:
```
...
  const secretCodeFollowModule = await deployContract(
    new SecretCodeFollowModule__factory(governance).deploy(lensHub.address)
  );
...
```

Note that we're using a custom wrapper function (`deployContract()`) that just ensures that the execution is paused until the contract is confirmed to have been deployed. 

To briefly explain what's going on here, we're constructing the factory with the governance signer and passing the hub address in the module's constructor at deployment.

Next up, we'll want to whitelist the module:
```
...
  await waitForTx(lensHub.whitelistFollowModule(secretCodeFollowModule.address, true));
...
```

Now we're on to the last step before we put it to the test, let's set this new module as our follow module:
```
...
  const data = defaultAbiCoder.encode(['uint256'], ['42069']);
  await waitForTx(lensHub.connect(user).setFollowModule(1, secretCodeFollowModule.address, data));
...
```
Here's where we're using that `defaultAbiCoder` we imported earlier since we've got to pass encoded data to be decoded in the follow module's initialization.

One more thing: if you're running this on a chain you've interacted with before, make sure you're specifying the correct profile ID in our case, this is 1, since this is the only profile in existence!

Finally, we're ready to test out our new module!

## Testing the New Module
If everything went well, we know that if we pass the same number we encoded in our `data` parameter earlier, the follow should be successful. 

Let's go ahead and use a `try {} catch {}` statement to validate the unsuccessful case, and then validate the successful case. We'll log the same data as we did in the walkthrough section for following:

```
...
  const badData = defaultAbiCoder.encode(['uint256'], ['1337']);
  
  try {
    await waitForTx(lensHub.connect(user).follow([1], [badData]));
  } catch (e) {
    console.log(`Expected failure occurred! Error: ${e}`);
  }
  await waitForTx(lensHub.connect(user).follow([1], [data]));

  const followNFTAddr = await lensHub.getFollowNFT(1);
  const followNFT = FollowNFT__factory.connect(followNFTAddr, user);

  const totalSupply = await followNFT.totalSupply();
  const ownerOf = await followNFT.ownerOf(1);

  console.log(`Follow NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Follow NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
  );
...
```

Alright, that about wraps it up!

## Recap
Before we execute our hardhat task, let's take a quick look at what the `test-module.ts` file looks like in its entirety:

```
import { defaultAbiCoder } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import {
  FollowNFT__factory,
  LensHub__factory,
  SecretCodeFollowModule__factory,
} from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import {
  deployContract,
  getAddrs,
  initEnv,
  ProtocolState,
  waitForTx,
  ZERO_ADDRESS,
} from './helpers/utils';

task('test-module', 'tests the SecretCodeFollowModule').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

  const inputStruct: CreateProfileDataStruct = {
    to: user.address,
    handle: 'zer0dot',
    imageURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    followModule: ZERO_ADDRESS,
    followModuleInitData: [],
    followNFTURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  };
  await waitForTx(lensHub.connect(user).createProfile(inputStruct));

  const secretCodeFollowModule = await deployContract(
    new SecretCodeFollowModule__factory(governance).deploy(lensHub.address)
  );
  await waitForTx(lensHub.whitelistFollowModule(secretCodeFollowModule.address, true));

  const data = defaultAbiCoder.encode(['uint256'], ['42069']);
  await waitForTx(lensHub.connect(user).setFollowModule(1, secretCodeFollowModule.address, data));

  const badData = defaultAbiCoder.encode(['uint256'], ['1337']);
  
  try {
    await waitForTx(lensHub.connect(user).follow([1], [badData]));
  } catch (e) {
    console.log(`Expected failure occurred! Error: ${e}`);
  }
  await waitForTx(lensHub.connect(user).follow([1], [data]));

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

As a quick rundown, we've unpaused the protocol, created a profile, deployed a new follow module, whitelisted it, set it as the follow module for our profile and tested it. 
[block:callout]
{
  "type": "info",
  "title": "On Testing",
  "body": "In this example, we used a rudimentary `try {} catch {}` statement to test our functionality, this isn't actually recommended (we use Waffle and Chai with Hardhat). For a more in-depth look at how these contracts are tested, check out the `test/` directory and [Hardhat's testing documentation!](https://hardhat.org/guides/waffle-testing.html)"
}
[/block]
Alright, it's all or nothing. You know the drill, let's run the task against our local chain (if you don't have one spun up, no worries--check out the walkthrough section).

Here goes:
```
$ npx hardhat test-module --network localhost
```

If everything went according to plan, here's what your terminal output should look like:
```
Expected failure occurred! Error: ProviderError: Error: VM Exception while processing transaction: reverted with custom error 'PasscodeInvalid()'
Follow NFT total supply (should be 1): 1
Follow NFT owner of ID 1: 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
```

And on that note, congratulations! You've successfully created and tested an entirely new module. This means you're now geared-up to start building and proposing your own custom modules to the Lens Protocol community.

Happy hacking!