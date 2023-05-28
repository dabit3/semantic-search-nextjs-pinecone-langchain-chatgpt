---
title: "Profile interests"
slug: "profile-interests"
hidden: false
createdAt: "2022-11-09T10:11:10.513Z"
updatedAt: "2023-03-15T18:24:58.079Z"
---
Profiles can have interests so that the experience layer can filter and provide content that is more relevant and engaging to their audience. The Lens API supports the following interests categories, and subcategories:

- Arts & Entertainment
  - Books & Literature
  - Art
  - Design
  - Photography
  - Fashion
  - Anime
  - Memes
  - Film & TV
  - Music
- Business
  - Creator Economy
  - Finance
  - Marketing
- Technology
  - AI & ML
  - Science
  - Programming
  - Tools
  - Biotech
- Health & Fitness
  - Exercise
  - Biohacking
- Food & Drink
  - Restaurants
  - Cooking
  - Cocktails
  - Beer
  - Wine
- Hobbies & Interests
  - Arts & Crafts
  - Gaming
  - Travel
  - Collecting
  - Sports
  - Cars
- News
- Family & Parenting
- Education
- Career
- Home & Garden
  - Nature
  - Animals
  - Home Improvement
  - Gardening
- Law, Government and Politics
  - Regulation
- Crypto
  - NFT
  - DeFi
  - Web3
  - Web3 Social
  - Governance
  - DAOs
  - gm
  - Metaverse
  - Rekt
  - Ethereum
  - Bitcoin
  - L1s
  - L2s
  - Scaling
- Lens
- NSFW

Keep in mind that profile interests are now **off-chain** and will be used only to curate the way that API serves content.

In addition, the API wants to stay unopinionated in terms of i18n and of how you choose to display interests to your users, so all interests are returned in english capitalised format, words are separated with underscore `_` and subcategories with double underscore `__`.

# API design

- Get all available interests. Public access.

```graphql Query example
query ProfileInterests {
 profileInterests
}
```
```json Response example
{
  "data": {
    "profileInterests": [
      'ART_ENTERTAINMENT',
      'ART_ENTERTAINMENT__BOOKS',
      'ART_ENTERTAINMENT__ART',
      'ART_ENTERTAINMENT__DESIGN',
      'ART_ENTERTAINMENT__PHOTOGRAPHY',
      'ART_ENTERTAINMENT__FASHION', 
      'ART_ENTERTAINMENT__ANIME',
      'ART_ENTERTAINMENT__MEMES',
      'ART_ENTERTAINMENT__FILM_TV',
      'ART_ENTERTAINMENT__MUSIC',
      'BUSINESS',
      'BUSINESS__CREATOR_ECONOMY',
      'BUSINESS__FINANCE',
      'BUSINESS__MARKETING',
      'TECHNOLOGY',
      'TECHNOLOGY__AI_ML',
      'TECHNOLOGY__SCIENCE',
      'TECHNOLOGY__PROGRAMMING',
      'TECHNOLOGY__TOOLS',
      'TECHNOLOGY__BIOTECH',
      'CAREER',
      'EDUCATION',
      'FAMILY_PARENTING',
      'HEALTH_FITNESS',
      'HEALTH_FITNESS__EXERCISE'
    ]
  }
}
```



- Get a profile's interests (these are fetched as part of the `Profile` object). Public access.

```graphql Query example
query Profile {
  profile(request: { profileId: "0x01" }) {
    id
    interests
  }
}
```
```json Response example
{
  "data": {
    "profile": {
      "id": "0x01",
      "interests": ["NFTS"]
    }
  }
}
```



- Add interests to a profile

Profiles can have up to 12 interests at this time. Will return null if successful, otherwise error. You need to be authorized with the provided `profileId` to call.

```graphql Mutation example
mutation AddProfileInterest {
   addProfileInterests(request: {
    profileId: "0x01",
    interests: ["NFTS"]
  })
}
```



- Remove interests from a profile

As with the previous endpoint, this one also returns null on success otherwise error. You need to be authorized with the provided `profileId` to call.

```graphql Mutation example
mutation RemoveProfileInterest {
   removeProfileInterests(request: {
    profileId: "0x01",
    interests: ["NFTS"]
  })
}
```



# 

# Using LensClient SDK

```typescript
// get all available interests
const profileInterests = await lensClient.profile.allInterests();

// add interests
await lensClient.profile.addInterests({
  interests: ["TECHNOLOGY__PROGRAMMING"],
  profileId,
});

// remove interests
await lensClient.profile.removeInterests({
  interests: ["TECHNOLOGY__PROGRAMMING"],
  profileId,
});
```