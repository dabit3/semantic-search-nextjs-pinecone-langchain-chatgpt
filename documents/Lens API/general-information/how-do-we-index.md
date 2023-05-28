---
title: "How do we index?"
slug: "how-do-we-index"
hidden: false
createdAt: "2022-02-18T10:44:08.161Z"
updatedAt: "2022-05-11T12:03:24.982Z"
---
# Top level overview

The backend server has many cron jobs which run individually; they all have a job to do, and to do it well they do. With the crons, we have a shared Redis cache to share states between them if they need to talk to each other. One cron is in charge of getting the latest block number and pushing changing state of that block number to Redis and another is in charge of reacting when the block number changes to access if anything in that block has changed for the lens protocol itself.

We heavily use `bloomFilters` to check without any JSON RPC calls if the event and the lens contract are present in that block, if it is not we do nothing if it is we then get the logs for those events based on the topic and index it into our database. Our indexer also turns the data into a relational state, we do not just index the raw events we turn this data into already pre-formatted ready-to-go data, and save it in a structured highly relational database structure. This then means we can achieve super-fast queries with all the decoding already done for us within the indexer itself. Every event runs independently of itself allowing them all to access the block at the same time without blocking each other which increases the speed of broadcasting to anyone using our API. Alongside this we do not save as we see either. The server will generate everything which has changed in this block and then save in 1 database transaction meaning debugging is very easy and everything is transactional like how the blockchain is in theory. 

These tech decisions allow us to index super fast and only hit our node provider when we need to due to highly using blooms. Alongside super-fast queries and everything formatted and saved in the database in a relational optimized manner. 

# Reorgs 

As everyone knows reorgs can happen and they can happen many blocks in the future. Even though our node provider alchemy is a rockstar and protects us as much as they can sometimes it's out of their control if a reorg happens. Every part of the data saved on the database level which came from the protocol is attached next to a `blockHash` and `blockNumber`. Alongside this, we also have a block safe table that inserts any blocks we index with the block hash and block number as well. Our reorg cron checks the `blockHash` still exists after 300 blocks which are 3x the highest alchemy has ever seen a reorg happen on Polygon. If the `blockHash` does not exist anymore we revert the data inserted/updated in our database and use the old values if they existed before. If the `blockHash` still exists we mark this `block` as safe and do not re-evaluate the data again.

# Your metadata

Like OpenSea when the indexer sees your publication content come in we move it to our own storage and index the data at that time like a snapshot. Say you publish a post and the content points to your s3 box once the indexer picks it up it snapshots it and then going forward we read it from our own storage due to speed but also due to links being taken down and loads more reasons. This means if you did change that s3 link you used to point the publication to then it would not change on our API.