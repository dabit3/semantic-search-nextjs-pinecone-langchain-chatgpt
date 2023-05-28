---
title: "Introduction to Modules"
slug: "module-interfaces"
excerpt: "Learn to understand and work with modules!"
hidden: false
createdAt: "2022-02-03T22:58:05.149Z"
updatedAt: "2022-02-06T18:20:54.858Z"
---
## Getting Started
Modules are an integral part of the Lens Protocol: they allow profile owners to include unique, custom functionality on follow, collect and reference (i.e. mirrors and comments). This *vastly* opens the door to exciting new community-created features that greatly expand on the basic Lens Protocol social graph!

From a more technical perspective, modules are whitelisted smart contracts that adhere to a specified interface which are called at defined execution steps. In other terms, modules present code akin to "hooks" that are run at predetermined points.

With all that out of the way, this tutorial will guide you through the development and testing of your very own module! Although there are three different kinds of modules that you can build, their construction is fundamentally similar, so this should provide a good foundation. 

Let's start by digging into the three types of modules (for examples, check out the bottom of this page!)...

### Follow Modules
Follow modules are called when a user attempts to follow a profile. Profile owners can set their follow module at profile creation and can change it at any time thereafter. Profile owners can also opt to have no follow module, allowing anyone to follow them any number of times.

These modules allow for logic such as a "fee-on-follow" or even a "subscription" mechanism -- and frankly, basically anything else you can think up!

### Collect Modules
Collect modules are called when a user attempts to collect a given profile's publication. Unlike follow modules, these are set once at publication creation and are **immutable** once the publication is live! Furthermore, all publications must have a collect module attached to them.

There's a ton of stuff that can be built with collect modules -- just off the top of my head, aside from a simple "fee-on-collect" collect module, there's nothing stopping a collect module from holding evolving state. 

### Reference Modules
Reference modules are called when a profile attempts to reference a given profile's publication. Similar to collect modules, these are set once at publication creation and are **immutable** too! However, *unlike collect modules,* publications can opt to have no reference module, allowing any profile to comment on or mirror the publication.

Custom rule sets can be built for reference modules--for example, you may want to allow only specific Follower NFT ID holders to comment and follow. In addition, reference modules include separate functions for validating mirrors and comments, so the rules can be different for each! (With the limitation that the functions are called on the same contract.)

## Next Up
Alright, now that you're at least vaguely familiar with how modules work throughout the protocol, it's time to hit the ground running and build your own module!

We'll be creating a custom follow module from scratch and it's going to be *amazing*. It's recommended, however, that you're at least a little bit familiar with the development environment; see the *Walkthrough* section for a clear-cut introduction! 

LFG.