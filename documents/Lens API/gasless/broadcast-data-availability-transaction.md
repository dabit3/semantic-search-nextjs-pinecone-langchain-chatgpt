---
title: "Broadcast Data Availability Transaction"
slug: "broadcast-data-availability-transaction"
hidden: false
createdAt: "2023-04-26T14:41:19.528Z"
updatedAt: "2023-04-26T16:31:44.885Z"
---
Any time you do any typed data signing for DA, you need to use `broadcastDataAvailability` , which will broadcast the transaction for you.

### Response

The response from the API is `CreateDataAvailabilityPublicationResult` which holds the following properties:

### id

This is the publication ID, it is unique and can be used in all the same queries as before when using the publication ID to search. The format is:

`profileId-publicationId-DA-FIRST_8_CHARS_OF_DATA_AVAILABILTY-ID`

example:

`0x01-0x01-DA-12345678`

Publications are not submitted on-chain to Polygon, so the state does not change. If they do many DA publications without an on-chain action will always be that all the time and the only change will be the last 8 chars at the end.

### proofs

The arweave txId which is the proof string you can run checks on.

### dataAvailabilityId

This is not that useful for much, but the proof itself has an ID.