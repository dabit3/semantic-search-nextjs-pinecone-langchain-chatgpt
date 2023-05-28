---
title: "Developer Quickstart - Lens API"
slug: "developer-quickstart-api"
hidden: false
metadata: 
createdAt: "2022-10-19T21:51:23.077Z"
updatedAt: "2023-05-25T20:38:30.608Z"
---
The recommended way to get started building on Lens is to use the Lens SDK and [this quickstart guide](https://docs.lens.xyz/docs/developer-quickstart-1).

If you are instead interested in using the lower level Lens GraphQL API, this tutorial is for you!

### Tutorial overview

In this guide you'll learn how to build a full stack web application with Lens Protocol, [Next.js](https://nextjs.org/), and [Tailwind CSS](https://tailwindcss.com/).

![](https://files.readme.io/05a6bcf-overviewoofapp.jpg)

## Basic concepts

Lens Protocol allows developers to quickly and easily build web3 social applications.

As a developer you can either use the Lens deployment on Polygon or [deploy the protocol yourself](https://docs.lens.xyz/docs/quick-setup) to any EVM compatible blockchain network.

_In this tutorial you'll use the [Lens API](https://docs.lens.xyz/docs/introduction) to fetch and render a social media feed, navigate to view an individual profile, and fetch and view the user's publications._

The Lens API can be tested at any time [here](https://api.lens.dev/) using any of the GraphQL queries in [the API docs](https://docs.lens.xyz/docs/introduction).

### Prerequisites

To complete this tutorial successfully, you must have [Node.js](https://nodejs.org/en/) installed on your machine.

- Install Node.js [with NVM](https://github.com/nvm-sh/nvm)
- Install Node.js [with FNM](https://github.com/Schniz/fnm)

## Getting started

To get started we'll first create and configure the Next.js application.

To generate a new Next.js app, run the following command from your terminal:

```shell
npx create-next-app lens-app

✔ Would you like to use TypeScript with this project? Yes
✔ Would you like to use ESLint with this project? Yes
✔ Would you like to use Tailwind CSS with this project?  Yes
✔ Would you like to use `src/` directory with this project? No
✔ Use App Router (recommended)? Yes
✔ Would you like to customize the default import alias? No
```

Next, change into the new directory and install these dependencies for the GraphQL client:

```shell
npm install @apollo/client graphql
```

Next, update the `tsconfig.json` and add the following to the `compilerOptions` configuration:

```Text json
    "noImplicitAny": false,
```

## Creating the API

Creating a basic GraphQL API is simple, we can do it in just a couple of lines of code. We'll also define the first GraphQL query we'll be using in our app.

Create a new file named `api.ts` in the root of the new project and add the following code:

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://api.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

/* define a GraphQL query  */
export const exploreProfiles = gql`
query ExploreProfiles {
  exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
    items {
      id
      name
      bio
      handle
      picture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
      stats {
        totalFollowers
      }
    }
  }
}
`
```

The query we've defined here will fetch a list of [profiles](https://docs.lens.xyz/docs/explore-profiles) from Lens based on the profile sort criteria pass in, in our case `MOST_FOLLOWERS`. You can view all of the sort criteria [here](https://docs.lens.xyz/docs/explore-profiles#sortcriteria), and experiment with other profile queries [here](https://docs.lens.xyz/docs/profiles). 

## Fetching and rendering profiles

We can now fetch data using the new API with a single line of code:

```typescript
const response = await client.query({ query: exploreProfiles })
```

With that in mind, we'd like to fetch the profiles using this API, then render and style them in our app.

To do so, let's update `app/page.tsx` in our app with the following code:

```typescript
/* app/page.tsx */
'use client'

import { useEffect, useState } from 'react'
import { client, exploreProfiles } from '../api'
import Link from 'next/link'

export default function Home() {
  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState<any>([])
  useEffect(() => {
    fetchProfiles()
  }, [])
  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: exploreProfiles })
      /* loop over profiles, create properly formatted ipfs image links */
      let profileData = await Promise.all(response.data.exploreProfiles.items.map(async profileInfo => {
        let profile = { ...profileInfo }
        let picture = profile.picture
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith('ipfs://')) {
            let result = picture.original.url.substring(7, picture.original.url.length)
            profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
          } else {
            profile.avatarUrl = picture.original.url
          }
        }
        return profile
      }))

      /* update the local state with the profiles array */
      setProfiles(profileData)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div className='pt-20'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-5xl mb-6 font-bold'>Hello Lens 🌿</h1>
        {
          profiles.map(profile => (
            <div key={profile.id} className='w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center'>
              <img className='w-48' src={profile.avatarUrl || 'https://picsum.photos/200'} />
              <p className='text-xl text-center mt-6'>{profile.name}</p>
              <p className='text-base text-gray-400  text-center mt-2'>{profile.bio}</p>
              <Link href={`/profile/${profile.handle}`}>
                <p className='cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2'>{profile.handle}</p>
              </Link>
              <p className='text-pink-600 text-sm font-medium text-center'>{profile.stats.totalFollowers} followers</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
```

Next, run the app:

```shell
npm run dev
```

When the app loads, you should see a list of Lens profiles with their image, name, bio, and handle.

![](https://files.readme.io/9106b7d-lens-list.jpg)

### 🎉 Congratulations! You've built your first Lens application!

Next, we'd like to be able to click on a user's handle and view more details about the user, like their latest posts.

## Viewing an individual profile

For the individual profile view we'll need two new API calls:

1. To fetch the [profile details](https://docs.lens.xyz/docs/get-profile) for the individual user
2. To fetch the [publications](https://docs.lens.xyz/docs/get-publications) for the individual user

To enable this, open `api.ts` and add the following two queries:

```typescript
export const getProfile = gql`
query Profile($handle: Handle!) {
  profile(request: { handle: $handle }) {
    id
    name
    bio
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
    }
    handle
  }
}
`

export const getPublications = gql`
  query Publications($id: ProfileId!, $limit: LimitScalar) {
    publications(request: {
      profileId: $id,
      publicationTypes: [POST],
      limit: $limit
    }) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    metadata {
      ...MetadataOutputFields
    }
  }
  fragment MetadataOutputFields on MetadataOutput {
    content
  }
`
```

In `app/page.tsx` you'll notice that we're linking to the user's handle in the html:

```typescript
<Link href={`/profile/${profile.handle}`}>
	<p class='cursor-pointer text-violet-600	text-lg font-medium	text-center mt-2 mb-2'>{profile.handle}</p>
</Link>
```

Right now, the `/profile/${profile.handle}` route does not yet exist, so let's create it.

To do so, create a new folder in the app directory named `profile`. Inside the `profile` folder, create a new folder named `[id]`. In the `[id]` folder, create a new file named `page.tsx`.

In this file add the following code:

```typescript
/* app/profile/[id]/page.tsx */
'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { client, getPublications, getProfile } from '../../../api'

export default function Profile() {
  /* create initial state to hold user profile and array of publications */
  const [profile, setProfile] = useState<any>()
  const [publications, setPublications] = useState<any>([])
  /* using the router we can get the lens handle from the route path */
  const pathName = usePathname()
  const handle = pathName?.split('/')[2]
  
  useEffect(() => {
    if (handle) {
      fetchProfile()
    }
  }, [handle])

  async function fetchProfile() {
    try {
      /* fetch the user profile using their handle */
      const returnedProfile = await client.query({
        query: getProfile,
        variables: { handle }
      })
      const profileData = { ...returnedProfile.data.profile }
      /* format their picture if it is not in the right format */
      const picture = profileData.picture
      if (picture && picture.original && picture.original.url) {
        if (picture.original.url.startsWith('ipfs://')) {
          let result = picture.original.url.substring(7, picture.original.url.length)
          profileData.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
        } else {
          profileData.avatarUrl = profileData.picture.original.url
        }
      }
      setProfile(profileData)
            /* fetch the user's publications from the Lens API and set them in the state */
      const pubs = await client.query({
        query: getPublications,
        variables: {
            id: profileData.id, limit: 50
        }
      })
      setPublications(pubs.data.publications.items)
    } catch (err) {
      console.log('error fetching profile...', err)
    }
  }

  if (!profile) return null

  return (
    <div className='pt-20'>
      <div className='flex flex-col justify-center items-center'>
        <img
          className='w-64 rounded-full'
          src={profile.avatarUrl}
        />
        <p className='text-4xl mt-8 mb-8'>{profile.handle}</p>
        <p className='text-center text-xl font-bold mt-2 mb-2 w-1/2'>{profile.bio}</p>
        {
            publications.map(pub => (
              <div key={pub.id} className='shadow p-10 rounded mb-8 w-2/3'>
                <p>{pub.metadata.content}</p>
              </div>
            ))
        }
      </div>
    </div>
  )
}
```

Now, run the app:

```javascript
npm run dev
```

When the app loads, you should be able to click on a user's handle and navigate to their profile. In this view, you'll see the user's profile along with a feed of their latest posts!

![User profile feed](https://files.readme.io/8d8829f-aavefeed.jpg)

## Next steps

Now that you've built your first basic application, it's time to explore more of [the Lens API!](https://docs.lens.xyz/docs/introduction)

Consider diving into [authentication](https://docs.lens.xyz/docs/authentication), [modules](https://docs.lens.xyz/docs/module-interfaces), or learning about [gasless transactions](https://docs.lens.xyz/docs/proxy-action-gasless) and the [dispatcher](https://docs.lens.xyz/docs/dispatcher).

Also consider adding the following features to your new app:

1. Following a user
2. Searching for users
3. Creating a post