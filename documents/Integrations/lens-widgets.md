---
title: "Lens Widgets"
slug: "lens-widgets"
hidden: false
createdAt: "2023-02-26T15:31:44.661Z"
updatedAt: "2023-02-26T15:48:26.262Z"
---
[Lens Widgets](https://github.com/lens-protocol/lens-widgets) enable developers to easily integrate social features into their web applications with just a few lines of code.

Lens Widgets support both [React](https://github.com/lens-protocol/lens-widgets/tree/main/lens-widgets-react) and [Svelte](https://github.com/lens-protocol/lens-widgets/tree/main/lens-widgets-svelte).

## Lens Widgets React

To view the library on GitHub click [here](https://github.com/lens-protocol/lens-widgets/tree/main/lens-widgets-react).

### Installation

```shell
npm install @lens-protocol/widgets-react
```



### Share to Lens

```typescript
import {
  ShareToLens, Theme, Size
} from '@lens-protocol/widgets-react'

<ShareToLens
  content="Hello World!"
/>

/* Optional parameters */
url: string = "https://your-awesome-app.com"
hashtags: string = "web3,social,blockchain"
via: string =  "YourAwesomeApp"
title: string = "Share your post on Lens 🌿"
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```



### Follow on Lens

```typescript
import {
  FollowOnLens, Theme, Size
} from '@lens-protocol/widgets-react'

<FollowOnLens
  handle="stani"
/>

/* Optional parameters */
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
title: string = "Follow me on Lens"
```



### Sign in with Lens

```typescript
import {
  SignInWithLens, Theme, Size
} from '@lens-protocol/widgets-react'

async function onSignIn(tokens, profile) {
  console.log('tokens: ', tokens)
  console.log('profile: ', profile)
}

<SignInWithLens
  onSignIn={onSignIn}
/>

/* Optional parameters */
provider: Provider
title: string
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```



### Profile

```typescript
import {
  Profile, Theme
} from '@lens-protocol/widgets-react'

<Profile
  handle="stani"
/>

/* Optional parameters */
handle: string
ethereumAddress: string
profileId: string
theme: Theme (default, dark)
onClick: () => void
containerStyle: css style
```



## Lens Widgets Svelte

To view the library on GitHub click [here](https://github.com/lens-protocol/lens-widgets/tree/main/lens-widgets-svelte).

### Installation

```shell
npm install @lens-protocol/widgets-svelte
```



### Share to Lens

```typescript
import {
  ShareToLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

<ShareToLens
  content="Hello World!"
/>

/* Optional parameters */
url: string = "https://your-awesome-app.com"
hashtags: string = "web3,social,blockchain"
via: string =  "YourAwesomeApp"
title: string = "Share your post on Lens 🌿"
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```



### Follow on Lens

```typescript
import {
  FollowOnLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

<FollowOnLens
  handle="stani"
/>

/* Optional parameters */
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
title: string = "Follow me on Lens"
```



### Sign in with Lens

```typescript
import {
  SignInWithLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

async function onSignIn(tokens, profile) {
  console.log('tokens: ', tokens)
  console.log('profile: ', profile)
}

<SignInWithLens
  onSignIn={onSignIn}
/>

/* Optional parameters */
provider: Provider
title: string
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```



### Profile

```typescript
import {
  Profile, Theme
} from '@lens-protocol/widgets-svelte'

<Profile
  handle="stani"
/>

/* Optional parameters */
handle: string
ethereumAddress: string
profileId: string
theme: Theme (default, dark)
onClick: () => void
containerStyle: css style
```