---
title: "Why our own indexer?"
slug: "why-our-own-indexer"
hidden: false
createdAt: "2022-02-21T09:33:07.001Z"
updatedAt: "2022-03-18T17:59:27.936Z"
---
We are huge fans of `The Graph` and the ability to spin up subgraphs is amazing. As a team experienced working on subgraphs, we wanted to ensure smooth and efficient functioning for the Lens Protocol API.

1) The subgraph sometimes takes a while to broadcast the indexed event. Now when we are building a social protocol we need the data to be ready at the second it has been mined in the block. Having this big dependency over our heads and not being able to control it would deeply ruin the whole network effect of the API. Speed is critical.

2) We slightly touched on this above but we want to be able to be in control if things go wrong and have the ability to fix it. Having our own in-house indexer allows us to fine-tune it and fix any bugs which arise. Additionally, having all the code in-house allows us to have higher uptime and fix any issues fast, without a third-party dependency. 

3) This data is highly relational. With social data and unlimited pointers, the data becomes highly relational very fast, especially when a publication starts getting attention. This means we need to structure this data in a relational manner to allow it to be fast and scale well. Having Postgres as our database allows us to do this really nicely. 

There are many more reasons why we went down the path of creating an indexer, but our main goal was to give Lens developers the best infrastructure possible, and to allow developers to be able to build applications that can scale and compete with the largest networks today.