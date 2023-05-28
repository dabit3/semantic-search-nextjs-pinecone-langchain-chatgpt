---
title: "Indexer"
slug: "indexer"
hidden: false
createdAt: "2022-02-17T17:58:24.844Z"
updatedAt: "2022-02-25T09:54:06.942Z"
---
The indexer resolver holds states about what the API knows about. Nothing is broadcasted on our API until it has been minted and indexed by us. Our indexer runs on every block so is very fast and broadcasting this data to the API once indexed. 

Our indexer resolver contains:

- [Has transaction been indexed](doc:has-transaction-been-indexed)