---
title: "Follow"
slug: "follow"
hidden: false
createdAt: "2022-01-27T03:45:52.046Z"
updatedAt: "2022-02-07T01:59:28.017Z"
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3e0f3f7-illustration_follow.svg",
        "illustration_follow.svg",
        328,
        240,
        "#e5ffbe"
      ]
    }
  ]
}
[/block]
"Following" on the Lens Protocol differs from following in Web2 social applications. When users follow a profile on the Lens Protocol, they are given a Follow NFT, which creators and communities can encode with additional value. 

[Profiles NFTs](doc:profile) can attach a particular Follow Module to each ProfileNFT, which contains all of the logic used to determine if a user attempting to follow the profile should be issued a Follow NFT. For example, a profile could attach a follow module that requires a user to pay 5 MATIC to receive a Follow NFT. 

The ID of each newly issued Follow NFT for given profile increments by 1, such that the first follower's NFT has an ID of 1; the tenth has an ID of 10, and so on. 

Additionally, Follow NFTs have built-in governance capabilities, such as vote delegation, to allow for the creation of Social DAOs using Lens Protocol. Creators, DAOs, or other organizations can create voting strategies using Follow NFTs and their various properties--for example: "The first 1000 follows have one vote each" or "The longer you have followed, the more voting power you have."

We look forward to seeing all of the new Follow Modules and Follower Governance strategies the community comes up with!