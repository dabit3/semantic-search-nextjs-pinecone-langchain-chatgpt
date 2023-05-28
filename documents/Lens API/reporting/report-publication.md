---
title: "Report publication"
slug: "report-publication"
hidden: false
createdAt: "2022-02-18T11:31:47.823Z"
updatedAt: "2023-03-14T13:40:00.059Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/reporting/report-publication.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

This mutation report publication allows a user to report something with a reason.

# API Design

returns a `VoidScalar` which means no response is returned if you do look at the response data it will be data.reportPublication= null but you do not need to look at the response for anything which returns `void`. If it does not throw it is successful. 

```javascript Example operation
mutation ReportPublication {
  reportPublication(request: {
    publicationId: "0x01-0x01",
    reason: {
      sensitiveReason: {
        reason: SENSITIVE,
        subreason: OFFENSIVE
      }
    },
    additionalComments: "Dislike this post"
  })
}
```
```javascript Query interface
type Mutation {
  reportPublication(request: ReportPublicationRequest!): Void
}
```
```javascript Request
input ReportPublicationRequest {
  publicationId: InternalPublicationId!
  reason: ReportingReasonInputParams!
  additionalComments: String
}

input ReportingReasonInputParams {
  sensitiveReason: SensitiveReasonInputParams
  illegalReason: IllegalReasonInputParams
  fraudReason: FraudReasonInputParams
}

input SensitiveReasonInputParams {
  reason: PublicationReportingReason!
  subreason: PublicationReportingSensitiveSubreason!
}

# Publication reporting reason
enum PublicationReportingReason {
  SENSITIVE
  ILLEGAL
  FRAUD
}

# Publication reporting sensitive subreason
enum PublicationReportingSensitiveSubreason {
  NSFW
  OFFENSIVE
}

input IllegalReasonInputParams {
  reason: PublicationReportingReason!
  subreason: PublicationReportingIllegalSubreason!
}

# Publication reporting illegal subreason
enum PublicationReportingIllegalSubreason {
  ANIMAL_ABUSE
  HUMAN_ABUSE
}

input FraudReasonInputParams {
  reason: PublicationReportingReason!
  subreason: PublicationReportingFraudSubreason!
}

# Publication reporting fraud subreason
enum PublicationReportingFraudSubreason {
  SCAM
  IMPERSONATION
}
```



> 📘 Did you know...
> 
> The publication id is not unique in the smart contract its a counter per each profile. So if @josh posts a publication that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. Our backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all our responses and also used in any request you which to do.

## Request

Let's look into more detail of the `reason` part of the request as there are many ways you can report.

The `reason` is an object of 3 things `sensitiveReason`, `illegalReason` , `fraudReason` due to not being able to do unions in GraphQL you should only pass 1 in of those properties. The beauty of GraphQL is that the schema will explain how those types should be shaped and export the enums for you as well.



# 

# Using LensClient SDK

```typescript
import { buildReportingReasonInputParams, PublicationReportReason } from "@lens-protocol/client";

// lensClient is authenticated

const result = await lensClient.publication.report({
  publicationId: '0x014e-0x0a',
  reason: buildReportingReasonInputParams(PublicationReportReason.FAKE_ENGAGEMENT),
  additionalComments: 'comment',
});
```