---
title: "All modules and methods"
slug: "client-sdk-reference"
hidden: false
createdAt: "2023-03-03T12:49:12.385Z"
updatedAt: "2023-04-11T16:38:35.477Z"
---
# Reference

Here you can find all methods available in the LensClient SDK grouped by module.

## Legend:

- [A] method call requires a client instance to be authenticated (see Authentication)
- [P] method response supports pagination (see PaginatedResult type)
- [H] method is a helper function, there is no API interaction

## Environments

- `production`, `development`

## Client and Authentication

The client manages the access token lifecycle and storage

- `new LensClient(config)`- [read more](doc:lensclient-sdk)
- `client.authentication.generateChallenge(address)`
- `client.authentication.authenticate(address, signature)`
- [H] `client.authentication.isAuthenticated()`

## Explore

- [P] `client.explore.publications(request)`
- [P] `client.explore.profiles(request)`

## Feed

- [AP] `client.feed.fetch(request)`
- [AP] `client.feed.fetchHighlights(request)`

## Modules

- [A] `client.modules.fetchEnabledCurrencies()`
- [A] `client.modules.fetchEnabled()`
- [A] `client.modules.approvedAllowanceAmount(request)`
- [A] `client.modules.generateCurrencyApprovalData(request)`

## NFTs

- [P] `client.nfts.fetch(request)`

- [A] `client.nfts.ownershipChallenge(request)`

- `client.nfts.fetchGalleries(request)`

- [A] `client.nfts.createGallery(request)`

- [A] `client.nfts.updateGalleryInfo(request)`

- [A] `client.nfts.updateGalleryItems(request)`

- [A] `client.nfts.updateGalleryOrder(request)`

- [A] `client.nfts.deleteGallery(request)`

## Notifications

- [AP] `client.notifications.fetch(request)`

## Profile + Dispatcher

### Query profile

- `client.profile.fetch(request)`

- [P] `client.profile.fetchAll(request)`

- [P] `client.profile.mutualFollowers({ viewingProfileId, yourProfileId })`

- `client.profile.stats(request)`

- `client.profile.allRecommended()`

- [A] `client.profile.dismissRecommended(request)`

### Edit profile

- [A] `client.profile.create(request)`

- [A] `client.profile.createSetProfileMetadataTypedData(request)`

- [A] `client.profile.createSetProfileMetadataViaDispatcher(request)`

- [A] `client.profile.createSetProfileImageURITypedData(request)`

- [A] `client.profile.createSetProfileImageURIViaDispatcher(request)`

- [A] `client.profile.createBurnProfileTypedData(request)`

- [A] `client.profile.createSetDefaultProfileTypedData(request)`

- [A] `client.profile.createSetDispatcherTypedData(request)`

- `client.profile.allInterests()`

- [A] `client.profile.addInterests(request)`

- [A] `client.profile.removeInterests(request)`

### Helpers

- [H] `isValidProfileHandle(handle)`

### Follow profile

- [A] `client.profile.createFollowTypedData(request)`

- [A] `client.profile.createUnfollowTypedData(request)`

- [A] `client.profile.createSetFollowModuleTypedData(request)`

- [A] `client.profile.createSetFollowNFTUriTypedData(request)`

- [AP] `client.profile.pendingApprovalFollows(request)`

- `client.profile.doesFollow(request)`

- [P] `client.profile.allFollowing({ address })`

- [P] `client.profile.allFollowers({ profileId })`

- `client.profile.followerNftOwnedTokenIds({ address, profileId })`

## Publication(s)

### Query publications

- `client.publication.fetch(request)`
- [P] `client.publication.fetchAll(request)`
- `client.publication.validateMetadata(request)`
- [P] `client.publication.allWalletsWhoCollected({ publicationId })`
- [P] `client.publication.allForSale({ profileId })`
- `client.publication.metadataStatus(request)`
- `client.publication.stats(request)`

### Create or edit publications

- [A] `client.publication.createPostTypedData(request)`

- [A] `client.publication.createPostViaDispatcher(request)`

- [A] `client.publication.createCommentTypedData(request)`

- [A] `client.publication.createCommentViaDispatcher(request)`

- [A] `client.publication.createMirrorTypedData(request)`

- [A] `client.publication.createMirrorViaDispatcher(request)`

- [A] `client.publication.createCollectTypedData(request)`

- [A] `client.publication.hide({ publicationId })`

- `client.publication.createAttachMediaData(request)`

- [A] `client.publication.report(request)`

### Helpers

- [H] `buildReportingReasonInputParams(PublicationReportReason)`

## ProtocolStats

- `client.stats.fetch(request)`

## UserSigNonces

- [A] `client.nonces.fetch()`

## Proxy actions

- [A] `client.proxyAction.freeFollow({ profileId })`
- [A] `client.proxyAction.freeCollect({ publicationId })`
- [A] `client.proxyAction.checkStatus(proxyActionId)`
- [A] `client.proxyAction.waitForStatusComplete(proxyActionId)`

### Helpers

- [H] `isProxyActionError()`
- [H] `isProxyActionQueued()`
- [H] `isProxyActionStatusResult()`

## Reactions

- [A] `client.reactions.add(request)`
- [A] `client.reactions.remove(request)`
- [P] `client.reactions.toPublication({ publicationId })`

## Revenue

- [P] `client.revenue.profilePublications({ profileId, limit })`
- `client.revenue.profileFollow({ profileId })`
- `client.revenue.publication({ publicationId })`

## Search

- [P] `client.search.profiles({ query, limit })`
- [P] `client.search.publications({ query, limit })`

## Transaction

- [A] `client.transaction.broadcast(request)`
- [A] `client.transaction.wasIndexed(txId)`
- [A] `client.transaction.waitForIsIndexed(txId)`

### Helpers

- [H] `isRelayerResult()`
- [H] `isRelayerError()`
- [H] `isTransactionIndexedResult()`
- [H] `isTransactionError()`