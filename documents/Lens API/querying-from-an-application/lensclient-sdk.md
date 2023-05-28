---
title: "LensClient SDK"
slug: "lensclient-sdk"
hidden: false
createdAt: "2023-03-02T14:50:20.282Z"
updatedAt: "2023-04-11T16:37:58.028Z"
---
# LensClient SDK

LensClient SDK is built in TypeScript and it makes the interactions with the API easier. You don't need to worry about GraphQL parts, just call simple methods of the client to achieve what you want with the Lens Protocol.

## Installing

Open the terminal and run:

```shell
$ npm install @lens-protocol/client
```



## Usage

Initialize the client with the preferred environment and storage options.

```typescript
import { LensClient, development } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: development
});
```



## Reference

You can find all methods available in the LensClient SDK grouped by module on [the reference page](doc:client-sdk-reference).

```typescript
new LensClient(config: LensConfig);

type LensConfig = {
  environment: Environment;
  storage?: IStorageProvider;
};
```



### Parameters

`environment: Environment` (required) - possible values `production` or `development`

- Configure LensClient to use production (`production`) or test (`development`) environment

`storage: IStorageProvider` (optional)

- LensClient manages the authentication tokens for you, it can also store them for future use if you provide `storage` instance. It could be browser-based LocalStorage or some storage solution in a React-Native environment, or even a file or database, it's up to you as long as it follows the `IStorageProvider` interface. 

```typescript
export interface IStorageProvider {
  getItem(key: string): Promise<string | null> | string | null;
  setItem(key: string, value: string): Promise<string> | Promise<void> | void | string;
  removeItem(key: string): Promise<string> | Promise<void> | void;
}
```



example implementation for LocalStorage

```typescript
class LocalStorageProvider implements IStorageProvider {
  getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
```