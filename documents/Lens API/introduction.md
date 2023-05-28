---
title: "Introduction"
slug: "introduction"
hidden: false
createdAt: "2022-02-18T17:07:36.350Z"
updatedAt: "2022-11-09T16:41:20.971Z"
---
> 🚧 This is a beta API
> 
> This API is beta and not production complete yet, which means that we could change schemas and endpoints at any time without warning or notice to you. When this API is production ready, we will remove this beta warning and will endeavor to ensure that there are no changes going forward unless a major change to the protocol itself is required.

Welcome to the API docs for Lens Protocol.  We aim to highlight all the endpoints which are exposed on the public API and explain how to use them and what they return. 

The API is a GraphQL API which is very similar to how a lot of people use the subgraph when using The Graph so it should be very familiar for many developers. If you have come from a REST backend we will explain how you can easily get up and running with this on your client.

GraphQL gives us a lot of benefits but the main one is a schema first approach. We believe for mass adoption and building of Lens we need the tools to be super easy and abstract away as much as the blockchain stuff as we can. You will see how we did this with our schema, everything should just make sense without having a deep technical understanding of how the protocol works or having to understand Solidity.

As the protocol data on the blockchain is very relational, our indexer does all the work for you. Mapping it into our Postgres database decoded and in a relational manner optimized for fast fetching. This allows you to query us with the same speed as if you were querying Twitter for example. 

We have packed the API with a lot of features and will be continuing to develop and improve it. By using this API in your application you automatically inherit many of these improvements.

We hope you like it and any feedback you have is extremely welcomed.


[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FmIJKa2-2p8w%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmIJKa2-2p8w&key=7788cb384c9f4d5dbbdbeffd9fe4b92f&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.youtube.com/watch?v=mIJKa2-2p8w",
  "title": "The Lens GraphQL API",
  "favicon": "http://www.google.com/favicon.ico",
  "provider": "youtube.com",
  "href": "https://www.youtube.com/watch?v=mIJKa2-2p8w",
  "typeOfEmbed": "youtube"
}
[/block]