---
title: "Quick Setup"
slug: "quick-setup"
excerpt: "Get set up and hit the ground running in a matter of minutes!"
hidden: false
createdAt: "2022-01-13T22:02:31.920Z"
updatedAt: "2023-04-25T14:55:23.496Z"
---
## Setting up Your Local Repository

To set things up, we're going first to clone the [repository,](https://github.com/lens-protocol/lens-protocol) set up the environment, and finally, build and enter our Docker container!

As mentioned previously, you'll need Git and Docker Compose.

### 1. Clone the Repository

```
git clone git@github.com:lens-protocol/core.git
```



### 2. Create Your `.env` File

(Note: It can be blank for local development!)

```
cd core
touch .env 
```



### 3. Start Docker Compose

**Note:** This is only tested on Unix-based systems, Docker facilitates development, but users can still opt not to use it. Windows users, if running into trouble, can consider setting up the [WSL](https://docs.microsoft.com/en-us/windows/wsl/about).

```
export USERID=$UID && docker-compose build && docker-compose run --name lens contracts-env bash
```



Alright, next up, we're going to spin up our own local blockchain and deploy the entire protocol on it.

***



#### Enter The Container in Another Terminal

Open up an **additional terminal** and execute the following command:

```
docker exec -it lens bash
```



#### Clean container

To clean up leftover running containers, just execute the following command:

```
USERID=$UID docker-compose down
```