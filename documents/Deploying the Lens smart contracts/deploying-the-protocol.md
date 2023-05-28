---
title: "Deploying the Protocol"
slug: "deploying-the-protocol"
excerpt: "Spin up your own blockchain with Hardhat and locally deploy your own Lens Protocol!"
hidden: false
createdAt: "2022-01-13T22:21:43.351Z"
updatedAt: "2023-04-25T15:33:30.396Z"
---
## Spinning up Your Local Blockchain

Alright, so we've got two terminals running in the Docker container we're running with Docker Compose. We will be using the first one to run our local blockchain and the second one to deploy the protocol.  

Recall we're also using Hardhat, which provides a fantastic tool to spin up a local chain in mere seconds, complete with multiple mock pre-funded addresses to have fun with!

> 🚧 CREATE 2 NEW TERMINALS WITHOUT DOCKER
> 
> Leave the previous terminal you used for docker alone and create 2 new terminals for running the commands. Ending up with 3 terminals in total. But remember you don't need docker for the new terminals.

### Start the Blockchain (First terminal)

In the **first** terminal write:

```
$ npm install 
$ npm run compile
$ npx hardhat node
```



This compiles everything, then spins up a custom local blockchain using Hardhat.

### Deploy the Protocol  (Second terminal)

In the **second** terminal write:

```
$ npm run full-deploy-local
```



This executes the `full-deploy` Hardhat task (which you can find in the `tasks` directory) on the local hardhat network. Once that's done, you should see a list of all newly deployed addresses, don't worry about jotting it down as it's also copied to an `addresses.json` file in the repository's root directory. 

You'll also see all the executed transactions in the first terminal if you want to see what's happening behind the scenes. 

On that note, so far, we've spun up our local blockchain and deployed the entire protocol to it. It's time to create a profile and start interacting with it!