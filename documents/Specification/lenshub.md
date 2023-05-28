---
title: "LensHub.sol"
slug: "lenshub"
hidden: false
createdAt: "2021-12-15T21:40:16.473Z"
updatedAt: "2022-02-04T20:05:39.122Z"
---
## Overview

This is the core entry point contract for essentially all interactions with the Lens Protocol. It is an upgradeable contract via the standard OpenZeppelin [TransparentUpgradeabilityProxy.](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/transparent/TransparentUpgradeableProxy.sol) This document elaborates on the functions of the implementation, assuming they are called via the proxy. Functions that take a struct as the sole input parameter will display struct members in the parameter table.

Note that as a design choice, all NFTs *should not* mint a token with `tokenId == 0` in any circumstance, as this is equivalent to an uninitialized variable.  Furthermore, ERC721 standard functions have been omitted from this document.