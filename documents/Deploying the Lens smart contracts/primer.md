---
title: "Primer"
slug: "primer"
excerpt: "A quick summary as to what to expect from this guide."
hidden: false
createdAt: "2022-01-12T23:52:06.590Z"
updatedAt: "2023-01-13T21:23:18.852Z"
---
![](https://files.readme.io/27b2bc4-illustration_tend.svg "illustration_tend.svg")

## Summary

This section walks you through how to deploy the entire protocol in a local hardhat network and write some custom tasks to interact with it.

> For developers looking to build with the existing Lens deployment on Polygon, they should instead view the [API documentation](https://docs.lens.xyz/docs/introduction) and the [Quickstart Guide](https://docs.lens.xyz/docs/developer-quickstart).

We'll first start with the repository and environment setup. You'll learn how to create a profile from scratch, publish a post, follow, collect, and even create your own custom module. We'll be using [ethers](https://www.npmjs.com/package/ethers), [hardhat](https://hardhat.org/), and [typescript](https://www.typescriptlang.org/) to interact with the protocol.

> 📘 Before You Get Started
> 
> You're going to need to have [Git](https://git-scm.com/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system (this helps keep consistency between development machines and reduces OS/versioning errors!)