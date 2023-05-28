---
title: "Creating a Module"
slug: "creating-a-module"
excerpt: "Build your first module!"
hidden: false
createdAt: "2022-02-04T20:16:45.318Z"
updatedAt: "2022-02-07T13:06:51.974Z"
---
[block:callout]
{
  "type": "info",
  "body": "This tutorial assumes that:\n\na) you are working with the Lens Protocol repository and have your environment set up correctly. See the \"Walkthrough\" section for more, and...\nb) You are at least *vaguely* familiar with solidity smart contract development or programming in general.",
  "title": "Getting Set Up"
}
[/block]
## Creating the Contract
So here's the plan: We're going to create a follow module that only allows users to follow if they include a special code. Of course, this is just for fun, and in practice, this makes no sense as the code would inherently be **public** on the blockchain. But, humor me for a bit!

Let's start off by creating a file called `SecretCodeFollowModule.sol` in the `contracts/core/modules/follow/` directory. We're working with `solidity 0.8.10`, so we'll use that as our [pragma](https://docs.soliditylang.org/en/v0.8.10/layout-of-source-files.html#pragmas). 

Since we're building a follow module, let's import the interface (which is basically a "blueprint" detailing every function we should include). We're also importing another contract that implements one of the interface's functions for us, and one that exposes the hub contract as an immutable with a modifier.

```
pragma solidity 0.8.10;

import {IFollowModule} from '../../../interfaces/IFollowModule.sol';
import {ModuleBase} from '../ModuleBase.sol';
import {FollowValidatorFollowModuleBase} from './FollowValidatorFollowModuleBase.sol';

```

Next up, let's define our contract. We'll inherit from the imported interface:
```
...
contract SecretCodeFollowModule is IFollowModule {
    
}
```

At this point, your linter or compiler is probably pretty upset, and with good reason! We're inheriting from an interface, but we aren't implementing any of the functions. The interface is like an outline, we've got to fill in the blanks now, and implement our functions!

That's right, it's time to actually build the contract. :sunglasses: 
[block:callout]
{
  "type": "info",
  "title": "Privacy On-Chain",
  "body": "This is just an example, keep in mind that nothing published on-chain is ever private, including our passcodes here. Even *before* something is pushed on-chain, it's visible unless you use a special privacy-preserving provider that obscures transaction pool transactions, but that's beyond the scope of this guide!"
}
[/block]
##  Implementing Follow Module Functions
So, if we take a quick look at the `IFollowModule` interface (or in the specification section on the left), we can see the different functions we've got to implement to have our follow module ready. These are:

1. `InitializeFollowModule()` which is called when a profile sets this module as its follow module.
2. `ProcessFollow()` which is called when a user attempts to follow a given profile with this module set as its follow module.
3. `FollowModuleTransferHook()` which is called when a FollowNFT associated with a profile that has this module set as its follow module is transferred (we won't be needing to do anything here) and...
4. `ValidateFollow()` which is called to validate whether a follow is still valid (**Note:** this is implemented by the `FollowValidatorFollowModuleBase` contract, so we don't have to worry about it!)

Before we copy over the functions, let's go ahead and include a constructor. All we've got to do is construct the `ModuleBase` contract, which is inherited from the `FollowValidatorFollowModuleBase`, which we in turn inherit from:
```
...
    constructor(address hub) ModuleBase(hub) {}
...
```

Great! Now we can access the immutable hub address via an address variable called `HUB`! We've also got access to a modifier `onlyHub()`, which we'll use for our one state-changing function.

Before we get ahead of ourselves, let's appease our angry linter and finally copy over the interface functions in our contract, adding empty brackets (which is equivalent to implementing no logic) and the `onlyHub` modifier to our `initializeFollowModule` implementation so only the hub can call it:
```
...
    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {}

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external override {}

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}
...
```

Sweet! At this point, we've appeased our compiler overlord, and it's time to start implementing our logic!

## Implementing Custom Logic
Alright, so here's how this module is going to work:
1. Allow profile owners to set a secret number as a passcode on follow module initialization
2. Only allow users to follow if they pass the correct passcode

We're going to need some additional features to satisfy the criteria outlined above. First, somewhere to store the passcodes; second, a way for profile owners to set them on initialization; and third, a way to validate that users attempting to follow pass the correct passcode.

Let's go back above our constructor and create a new mapping called `_passcodeByProfile` and a new error (which we'll throw when users pass the wrong passcode) called `PasscodeInvalid()`:

```
...
contract SecretCodeFollowModule is IFollowModule, FollowValidatorFollowModuleBase {
    error PasscodeInvalid();

    mapping(uint256 => uint256) internal _passcodeByProfile;

    constructor...
```

This mapping we just created will use profile IDs as keys and their respective passcodes as values. Simple enough! Now it's time to build our initialization mechanism, for which we'll use the `initializeFollowModule()` function:
```
...
    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        uint256 passcode = abi.decode(data, (uint256));
        _passcodeByProfile[profileId] = passcode;
        return data;
    }
...
``` 
As a quick explanation, first we decode the passcode from the arbitrary data (passed by the profile owner), then we set it as the profile's passcode.

At this point, you might be wondering about why this function returns a `bytes memory` parameter. This is basically any state-altering data that should be emitted by an event. In our case, we'll just pass the original data as that includes the passcode which we're using to alter state.

We're almost there! The last step is to validate that users pass the correct passcode when attempting to follow. Since this function does *not* modify state, but reads from it, we can restrict its visibility to `view`, too:
```
...
    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external view override {
        uint256 passcode = abi.decode(data, (uint256));
        if (passcode != _passcodeByProfile[profileId]) revert PasscodeInvalid();
    }
...
```

To go over what we just built, the first line decodes the passcode from the arbitrary data (passed by the user attempting to follow) and the second line reverts the execution if it's not the right passcode.
[block:callout]
{
  "type": "info",
  "title": "Solidity Tip",
  "body": "As good practice, it's always a good idea to restrict function scope as much as possible within reason. Solidity functions that don't modify state but read from it should be marked `view`, and functions that neither read nor modify state should be marked `pure`. In this case, you might have noticed that the `followModuleTransferHook()` can be marked pure, too, although this serves no purpose as the function is empty."
}
[/block]
## Recap
And that's it! You've successfully created your own follow module. Let's take a look at our full `SecretCodeFollowModule.sol` file:
```
pragma solidity 0.8.10;

import {IFollowModule} from '../../../interfaces/IFollowModule.sol';
import {ModuleBase} from '../ModuleBase.sol';
import {FollowValidatorFollowModuleBase} from './FollowValidatorFollowModuleBase.sol';

contract SecretCodeFollowModule is IFollowModule, FollowValidatorFollowModuleBase {
    error PasscodeInvalid();

    mapping(uint256 => uint256) internal _passcodeByProfile;

    constructor(address hub) ModuleBase(hub) {}

    function initializeFollowModule(uint256 profileId, bytes calldata data)
        external
        override
        onlyHub
        returns (bytes memory)
    {
        uint256 passcode = abi.decode(data, (uint256));
        _passcodeByProfile[profileId] = passcode;
        return data;
    }

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external view override {
        uint256 passcode = abi.decode(data, (uint256));
        if (passcode != _passcodeByProfile[profileId]) revert PasscodeInvalid();
    }

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}
}
```

Before we move on the testing, let's make sure everything compiles:

**Note:** This assumes you're inside the`contracts-env` container! If you're not sure how that works, check out the walkthrough!
```
$ npm run compile
```

Assuming nothing broke, let's go ahead and write a Hardhat task testing that everything works as intended. It's time to put this shiny new module to good use!