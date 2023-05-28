---
title: "useCurrencies"
slug: "use-currencies"
hidden: false
createdAt: "2022-12-23T15:42:20.026Z"
updatedAt: "2023-03-20T07:31:19.850Z"
---
`useCurrencies` is a React Hook that returns the list of ERC20 supported by the Lens Protocol.

```typescript
const { data, loading } = useCurrencies();
```



## Usage

When configuring [Collect Modules](https://docs.lens.xyz/docs/icollectmodulesol) and [Follow Modules](https://docs.lens.xyz/docs/ifollowmodulesol) that involve a fee you need to specify an amount which requires to specify the corresponding ERC20 accepted as fee.

The Lens SDK abstracts away these details and all it asks in its input data are instances of an `Amount` class. To instantiate an `Amount` you need to provide a string with the amount (as human readable string) and a reference to the correct `Erc20` which is a type that encapsulates currency details (ERC20 included).

When invoked the `useCurrencies` hook interrogates the Lens API to retrieve the list of supported ERC20s and returns a list of `Erc20`.

You can call `useCurrencies` to populate for example a drop-down that let the user select which currency to use to configure a fee.

```typescript
import { useCurrencies } from '@lens-protocol/react-web';


function CurrencyDropdown() {
  const { data, loading } = useCurrencies();
  
  if (loading) return null;

  return (
    <select>
     {
       data.map(currency => (
         <option value={currency.address}>{currency.symbol}</option>
       )
     }
   </select>
  )
}
```



## Reference

### `useCurrencies()`

```typescript
const { data, loading } = useActiveProfile();
```



#### Parameters

- `useCurrencies` does not take any parameters.

#### Returns

- `data` array of `Erc20`
- `loading` a flag that let you determine if `data` is ready to be read.