---
title: "URQL"
slug: "urql"
hidden: false
createdAt: "2022-02-18T10:46:14.934Z"
updatedAt: "2022-11-09T10:33:19.628Z"
---
# URQL

[URQL](https://formidable.com/open-source/urql/) is a lighter library than the apollo client but allows you to query the API all the same. 

## Installing

open the terminal in your client and run:

```bash
$ npm install urql graphql
```



## Usage

### Exposing the client

You can create the `URQLClient` which you then use for all public API queries like:

```typescript
import { createClient } from 'urql'

const APIURL = 'https://api-mumbai.lens.dev/';

export const urqlClient= createClient({
  url: APIURL,
})
```



### Querying the API

Then you can use it to query the Lens public API:

```typescript
import { urqlClient } from './urql-client';

const pingQuery = `
  query {
    ping
  }
`

export const queryExample = async () => {
  const response = await urqlClient.query(pingQuery).toPromise();
  console.log('Lens example data: ', response)
}
```