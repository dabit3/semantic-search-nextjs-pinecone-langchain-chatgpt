---
title: "useReportPublication"
slug: "use-report-publication"
hidden: false
createdAt: "2023-01-16T10:05:55.977Z"
updatedAt: "2023-03-20T06:55:54.932Z"
---
`useReportPublication` is a React hook that allows you to report a publication with a reason.

```typescript
const { report, isPending, error } = useReportPublication()
```



## Usage

```typescript
import { useReportPublication, ReportReason } from '@lens-protocol/react-web';

export function ReportPublication() {
  const { report, isPending, error } = useReportPublication();

  const handleClick = async () => {
    await report({
      publicationId: '0x15-0x0271',
      reason: ReportReason.SCAM,
      additionalComments: '',
    });
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      <button onClick={handleClick} disabled={isPending}>
        Report
      </button>
    </div>
  );
}

```



## Reference

### `useReportPublication()`

#### Returns

The hook returns an object with:

- `report`: a function you can use to report a publication.
- `isPending`: a boolean indicating whether the operation is still in progress.
- `error`: any error that might occur in normal operating conditions will be returned via this property.

### `report(request: ReportPublicationRequest)` function

You can use the `report` function to report a publication.

#### Parameters

- `request: ReportPublicationRequest` read below for details

#### Returns

- `Promise<void>`

### ReportPublicationRequest

This is an object that contains the following properties:

- `publicationId: string`: the id of the publication to be reported.
- `reason: ReportReason`: the reason for reporting the publication, it should be one of the values of the `ReportReason` enum.
- `additionalComments: string | null`: additional comments or information about the report.

### ReportReason

This is an enum that contains the possible reasons to report a publication. The possible values are:

```Text TypeScript

export enum ReportReason {
  // Illegal
  ANIMAL_ABUSE = 'animal-abuse',
  HARASSMENT = 'harassment',
  VIOLENCE = 'violence',
  SELF_HARM = 'self-harm',
  DIRECT_THREAT = 'direct-threat',
  HATE_SPEECH = 'hate-speech',

  // Sensitive content
  NUDITY = 'nudity',
  OFFENSIVE = 'offensive',

  // Fraud
  SCAM = 'scam',
  UNAUTHORIZED_SALE = 'unauthorized-sale',
  IMPERSONATION = 'impersonation',

  // Spam
  MISLEADING = 'misleading',
  MISUSE_HASHTAGS = 'misuse-hashtags',
  UNRELATED = 'unrelated',
  REPETITIVE = 'repetitive',
  FAKE_ENGAGEMENT = 'fake-engagement',
  MANIPULATION_ALGO = 'manipulation-algo',
  SOMETHING_ELSE = 'something-else',
}

```