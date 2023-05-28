---
title: "Unpausing the Protocol"
slug: "unpausing-the-protocol"
excerpt: "Unpause the protocol with your custom Hardhat task!\n##### Jump to [Recap](#recap) to get the full source code 🌿"
hidden: false
createdAt: "2022-01-13T03:52:39.789Z"
updatedAt: "2022-08-17T17:53:25.288Z"
---
Creating The Custom Task 
------------------------

The repository's `hardhat.config.ts` is set up to import all tasks in the `tasks/` directory, which means all we've got to do to start interacting with our local deployment is create a new task.

Create a file `unpause.ts` in the `tasks/` directory and open it up in your editor of choice. The first thing you'll want to do is import some modules. 

Since we're working with hardhat tasks, we can use the instance of `ethers` injected into the Hardhat runtime environment, we won't be needing to import it in this specific task, but it's used behind the scenes. We'll also be using [typechain](https://www.npmjs.com/package/typechain), which creates convenient typescript bindings that we can connect to our deployed contracts.

Below are all the imports we'll need to set the protocol state (i.e., Unpause it); we'll explain how we use each one down the line.

```
import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { ProtocolState, waitForTx, initEnv, getAddrs } from './helpers/utils';
```

Next, we've got to create the hardhat task (which will automatically be imported in our Hardhat config file if this `custom` file exists). Our actual code to be executed will be a callback function in the tasks' `setAction` property.

```
task('unpause', 'unpauses the protocol').setAction(async ({}, hre) => {});
```

Getting Ready to Interact With Our Local Deployment
---------------------------------------------------

Alright, so we've created our Hardhat task. Now we've got to instantiate our signers (a wallet that can sign and send transactions) and begin interacting with the protocol! Our local deployment uses the default signers connected to the injected `ethers` instance and automatically maps them to different protocol roles. 

For our purposes, the 0-indexed account is the deployer, the 1-indexed account is the governance address, the 2-indexed account is the treasury, and the 3-indexed account is our general-purpose user. We also need to know the addresses of our deployed contracts, so let's use [fs](https://nodejs.dev/learn/the-nodejs-fs-module) to read the addresses JSON file and store that too.

The following functions are **not** in the same task file but are imported from the `./tasks/helpers/utils.ts` file. It's just worth noting how it works. 

```
// NOTE: These functions are in tasks/helpers/utils.ts and imported into our task file!

export async function initEnv(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress[]> {
  const ethers = hre.ethers; // This allows us to access the hre (Hardhat runtime environment)'s injected ethers instance easily

  const accounts = await ethers.getSigners(); // This returns an array of the default signers connected to the hre's ethers instance
  const governance = accounts[1]; // We'll use this signer to, for example, unpause the protocol
  const treasury = accounts[2]; // This is the treasury address, which we won't use
  const user = accounts[3]; // We'll use this signer as our general purpose user

  return [governance, treasury, user];
}

export function getAddrs(): any {
  const json = fs.readFileSync('addresses.json', 'utf8'); // Read the 'addresses.json' file
  const addrs = JSON.parse(json); // Parse the JSON into an object 
  return addrs;
}
```

We're just going to call the above helper functions to fetch the data we need in our task. We only want the governance and addresses object:

```
...
  const [governance] = await initEnv(hre);
  const addrs = getAddrs();
...
```

The last thing we've got to instantiate is our interface to the contract itself, there are many ways to do this, but we're going to use our imported type chain binding, and we'll start by connecting it to our governance signer.

Let's add the following line inside our task's callback function:

```
...
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
...
```

Executing a Transaction
-----------------------

So far, we've created a new Hardhat task, instantiated our signers, and instantiated an interface to our contract. We're just about ready to start sending transactions!

Before we start creating a profile, we've got a little housekeeping to do, and this will serve as a great test to see if everything's set up correctly. 

Upon deployment, the protocol is paused by default. Let's go ahead and unpause it by adding the following lines to our tasks' callback function:

```
...
  console.log(await lensHub.getState());
  await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  console.log(await lensHub.getState());
...
```

Note that we're typically using a wrapper instead of just sending the transaction; this simply ensures that we wait for the transaction to be mined before proceeding. 

As a quick side note, the smart contract ABI (Application Binary Interface) treats enums as regular unsigned integers, which also happens with our JavaScript/typescript code; so the `ProtocolState` enum is just a set of integers behind the scenes!

Recap
-----

Create file `tasks/unpause.ts` with the following code:

```
import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { ProtocolState, waitForTx, initEnv, getAddrs } from './helpers/utils';

task('unpause', 'unpauses the protocol').setAction(async ({}, hre) => {
  const [governance] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
  console.log(await lensHub.getState());
  await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  console.log(await lensHub.getState());
});
```

And now it's the moment of truth! Go ahead and run it with the following command:

```
$ npx hardhat unpause --network localhost
```

if things go well, we should have the following output in our terminal:

```
2
0
```

This is great! 2 is the value for `ProtocolState.Paused` and 0 is the value for `ProtocolState.Unpaused`.

Next up, we will create a new task to whitelist the user and create our first profile!