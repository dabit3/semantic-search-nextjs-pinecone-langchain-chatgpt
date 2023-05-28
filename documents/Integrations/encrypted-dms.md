---
title: "Encrypted DMs"
slug: "encrypted-dms"
hidden: false
createdAt: "2023-01-24T21:13:51.294Z"
updatedAt: "2023-01-26T02:41:59.370Z"
---
Lens apps use [XMTP](https://xmtp.org/) to provide secure, private messaging across different apps.

XMTP is an open protocol and network for secure web3 messaging. It allows developers to quickly and easily get up and running with private, encrypted, real-time messaging in their applications.

XMTP enables composability in that it is permissionless and anyone can easily integrate it into their application, inheriting the entire network and ecosystem of applications, similar to how Lens enables developers to inherit the entire ecosystem of users in the existing ecosystem.

In this guide, you'll learn how to get up and running with private messages using Lens and XMTP.

>  To learn more about XMTP, check out [their docs.](https://xmtp.org/)

## Getting started

To get started interacting with XMTP, the user must sign a message with their wallet. Once they've signed and are successfully authenticated within the protocol, the messages for their wallet will be retrieved, and they will be decoded and decrypted.

In order to do this, we'll use the XMTP JavaScript SDK and a library like `ethers.js`.

First, install the libraries using **npm**, **yarn**, or your favorite package manager:

```javascript
npm install @xmtp/xmtp-js ethers
```

In your JavaScript or TypeScript application, import XMTP and `ethers.js`:

```javascript
import { Client } from '@xmtp/xmtp-js'
import { ethers } from 'ethers'
```

Next, create a function that allows a user to connect their wallet and sign in:

```javascript
async function connect() {
  await window.ethereum.send('eth_requestAccounts')
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const xmtp = await Client.create(signer, {
    env: 'production'
  })
}
```



Now, using the `xmtp` instance, we can interact with the protocol!

### Reading conversations and messages

For instance, if we'd like to get all of the user's conversations, we can do this:

```javascript
const allConversations = await xmtp.conversations.list()
```



This does not get the messages themselves, only the conversations that a user has taken part in.

In order to get the messages from a conversation, we can do this:

```javascript
const messages = await conversations[0].messages()
```



### Creating messages

To create a message, choose the conversation you'd like to send a message to and do this:

```javascript
await conversation.send('gm')
```



As you can see, the API is pretty simple to get started with.

### Real-time updates

The XMTP service provides real-time message delivery and retrieval.

Once you retrieve the conversations from the service, you listen for a stream of new conversations coming from the protocol.

Here is some example code of how that would look:

```javascript
async function streamConvos() {
  const stream = await client.conversations.stream()
  for await (const conversation of stream) {
    console.log('new conversation in real time! :', conversation)
  }
}
```



And for streaming messages from a conversation:

```javascript
async function streamMessages(conversation) {
  const stream = await conversation.streamMessages()
  for await (const newMessage of stream) {
    console.log('new message in real time! :', message)
  } 
}
```



## Integrating with Lens

Because XMTP is an open protocol, anyone can build their messaging system using it.

Different ecosystems can come together to form specifications that enable interoperability between the applications within their ecosystem.

They do this by prefixing a certain namespace to their `conversationId`, like for example:

```javascript
const conversationID = `myprotocolname/dm/${profileIdA}-${profileIdB}`
```



With Lens, there are many apps using the following namespace:

```
lens.dev/dm
```



With the following script, you can create a `conversationID` consistent with the rest of the Lens ecosystem:

```javascript
const PREFIX = 'lens.dev/dm'
const buildConversationId = (profileIdA: string, profileIdB: string) => {
  const profileIdAParsed = parseInt(profileIdA, 16)
  const profileIdBParsed = parseInt(profileIdB, 16)
  return profileIdAParsed < profileIdBParsed
    ? `${PREFIX}/${profileIdA}-${profileIdB}`
    : `${PREFIX}/${profileIdB}-${profileIdA}`
}
```



So when you create a new conversation, you would create the new conversation using this conversation ID in order to be interoperable with the other apps in the ecosystem.

In practice, your function might look like this:

```javascript
const conversation = await client.conversations.newConversation(
  someLensProfileId,
  {
    conversationId: buildConversationId(profile1.id, profile2.id),
    metadata: {},
  }
)
```



## Putting it all together

In this guide we've covered most of the basics to get you up and running with XMTP in a Lens app.

If you'd like to see a comprehensive full stack codebase, check out [this app ](https://github.com/dabit3/xmtp-chat-app-nextjs)using XMTP and Next.js

If you'd like to learn more, check out the Lens tutorial from XMTP [here](https://xmtp.org/docs/client-sdk/javascript/tutorials/build-key-xmtp-chat-features-in-a-lens-app).