---
title: "Follow a profile"
slug: "follow-a-profile"
excerpt: "This guide will show everything you need to know about following profiles"
hidden: false
createdAt: "2023-05-25T07:25:39.921Z"
updatedAt: "2023-05-26T12:14:33.241Z"
---
When it comes to follow a Profile there two concepts coming into play. The Follow Policy of the followed Profile and the actual following action performed by the follower. Let's look at them in order.

## Setup your Follow Policy

The Follow Policies for a given Profile can be categorized into 4 types:

- Anybody can follow
- No one can follow
- Only another Profile owner can follow
- Charge a fee to follow

The first thing then to do is to build a UI that allows to make this initial choice.

```typescript FollowTypeOption.tsx
import { FollowPolicyType, ProfileOwnedByMe, useUpdateFollowPolicy } from '@lens-protocol/react-web';

type FollowTypeOptionProps = {
  label: string;
  value: FollowPolicyType;
  type: FollowPolicyType;
  onChange: (followPolicyType: FollowPolicyType) => void
}

export function FollowTypeOption({ label, type, onChange, value }: FollowTypeOptionProps) {
  return (
    <label>
      <input
        type="radio"
        name="followType"
        checked={type === value}
        onChange={() => onChange(type)}
      />

      {label}
    </label>
  )
}
```

Not that we have a component representing the single Follow Policy type we can start building our form.

```typescript MyFollowPolicy.tsx
import { useState } from 'react';
import { FollowPolicyType, ProfileOwnedByMe, useUpdateFollowPolicy } from '@lens-protocol/react-web';

import { FollowTypeOption } from './FollowTypeOption';

function MyFollowPolicy({ profile }: { profile: ProfileOwnedByMe }) {
  const [followType, setFollowType] = useState<FollowPolicyType>(FollowPolicyType.ANYONE)
  
  return (
    <form>
    	<FollowTypeOption
        type={FollowPolicyType.ANYONE}
        label="Anyone can follow"
        value={followType}
        onChange={setFollowType}
      />

      <FollowTypeOption
        type={FollowPolicyType.NO_ONE}
        label="No one can follow"
        value={followType}
        onChange={setFollowType}
      />

      <FollowTypeOption
        type={FollowPolicyType.ONLY_PROFILE_OWNERS}
        label="Only holders of Lens profiles can follow"
        value={followType}
        onChange={setFollowType}
      />

      <FollowTypeOption
        type={FollowPolicyType.CHARGE}
        label="Anyone can follow, but they must pay a fee"
        value={followType}
        onChange={setFollowType}
      />
          
      // to be continued...
    </form>
  )
}
```

We are almost there, the most interesting thing now is to build a UI that allows to setup a follow fee for the `FollowPolicyType.CHARGE` option.

First we need to be able to select a currency among the ones supported by the Lens Protocol. To do that we will use the `useCurrencies` hook.

```typescript CurrencySelector.tsx
import { Erc20, useCurrencies } from '@lens-protocol/react-web';

type CurrencySelectorProps = {
	onChange: (currency: Erc20) => void
}

export function CurrencySelector({ onChange }: CurrencySelectorProps) {
  const { data: currencies, error, loading } = useCurrencies();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = currencies.find((currency) => currency.symbol === event.target.value);
    if (currency) onChange(currency);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <select onChange={handleChange}>
      {currencies.map((currency) => (
        <option key={currency.hash} value={currency.symbol}>{currency.name}</option>
      ))}
    </select>
  );
}
```

We can now create an `AmountField` component that encapsulates the UI that allows to select a currency and provide an amount. Keep this around it will become handy in other contexts.

```typescript AmountField.tsx
import React, { useState } from 'react';

import { Amount, Erc20Amount, Erc20 } from '@lens-protocol/react-web';

import { CurrencySelector } from './CurrencySelector';

type AmountProps = {
  onChange: (fee: Erc20Amount) => void;
}

export function AmountField({ onChange }: AmountProps) {
  const [currency, setCurrency] = useState<Erc20 | null>(null);
  const [amount, setAmount] = useState('0');

  const updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)

    if (currency) {
      onChange(Amount.erc20(currency, event.target.value));
    }
  };

  const updateCurrency = (newCurrency: Erc20) => {
    setAmount('0')
    setCurrency(newCurrency)
  };

  return (
    <fieldset>
      <label>
        Currency
        <CurrencySelector onChange={updateCurrency} />
      </label>

      <label>
        Amount
        <input
          name='amount'
          value={amount}
          type="number"
          placeholder="Enter an amount"
          onChange={updateAmount}
        />
      </label>
    </fieldset>
  );
}
```

Let's put it all together now.

```typescript MyFollowPolicy.tsx
import { useState } from 'react';

import { Amount, FollowPolicyType, ProfileOwnedByMe, useUpdateFollowPolicy } from '@lens-protocol/react-web';

import { FollowTypeOption } from './FollowTypeOption';
import { AmountField } from './AmountField';

function MyFollowPolicy({ profile }: { profile: ProfileOwnedByMe }) {
  const { execute: updateFollowPolicy, isPending, error } = useUpdateFollowPolicy({ profile });
  const [followType, setFollowType] = useState(FollowPolicyType.ANYONE)
  
  const [fee, setFee] = useState<Erc20Amount | null>(null)
  
  const onSubmit = async () => {
    if (followType === FollowPolicyType.CHARGE) {
      if (fee === null) {
				window.alert('You must provide a follow fee');
        return;
      }
      
      await updateFollowPolicy({
        type: FollowPolicyType.CHARGE,
        amount: fee,
        recipient: profile.ownedBy
      });
      
      return;
    }
    
    await updateFollowPolicy({ type: followType });
  };
  
  return (
    <form onSubmit={onSubmit}>
    	// .. other options omitted for brevity

      <FollowTypeOption
        type={FollowPolicyType.CHARGE}
        label="Anyone can follow, but they must pay a fee"
        value={followType}
        onChange={setFollowType}
      />
          
      {followType === FollowPolicyType.CHARGE && (
        <AmountField onChange={setFee} />
      )}

      <button disabled={isPending} type='submit'>Save</button>
    </form>
  );
}
```

You might have noticed in the `onSubmit` handler that the `FollowPolicyType.CHARGE` also allow to specify a `recipient` (i.e. an address that will receive the fee). In the example we used the Profile owner address (i.e. the current logged-in wallet address). [This example](https://github.com/lens-protocol/lens-sdk/blob/main/examples/web-wagmi/src/profiles/UseUpdateFollowPolicy.tsx) in the Lens SDK monorepo shows how to let the user specify a different recipient address.

> 🚧 What about follow module settings?
> 
> If you are already familiar with the Lens Protocol, you might have noticed that Follow Policy sounds relatively familiar and close to the concept of follow module settings.
> 
> This because Follow Policy is a powerful abstraction on top of follow module settings. It's provided by the Lens SDK React hooks in order to:
> 
> ### Make read/write type-safe
> 
> The TypeScript definition for the follow module settings is auto-generated out of GraphQL schema. Although the code generation tools are quite smart the TypeScript type system is significantly more powerful than GraphQL. As result the code generation process inevitably needs to play by the rules of a less capable GraphQL types (this is not a critique, we love GraphQL, it's just an honest assessment).
> 
> The resulting TS type definition is not type safe and error prone.
> 
> The Follow Policy makes explicit the rules that MUST be observed in order to setup correctly the underlying follow modules. 
> 
> ### Decouple consumer's code
> 
> By having an abstraction between the consumer's code and the follow module settings, the Lens SDK act as a natural cushion that allow the Lens Protocol to evolve fast. Very, very, very fast!! The Lens SDK will take care of the details. As the time goes by new follow modules will be added and others will be deprecated. The Lens SDK will make your adoption of new feature as simple as updating a package.

## How to follow a profile

When it comes to build a UX that allows to follow a Profile the first thing is usually exposing to the user the  Follow Policy details.

All Profiles returned by the Lens SDK React hook have these extra properties:

- `followPolicy: FollowPolicy` exposes the Follow Policy the followee user decided
- `followStatus: FollowStatus` exposes dynamic informations relevant for knowing when is possible to follow a given Profile

Let's see how to use it to create a `FollowButton` component.

```typescript FollowButton.tsx
import { FollowPolicy, FollowPolicyType, Profile } from '@lens-protocol/react-web';

type FollowButtonProps = {
  followee: Profile;
}

function formatButtonText(policy: FollowPolicy): string {
  switch (policy.type) {
    case FollowPolicyType.ONLY_PROFILE_OWNERS:
    case FollowPolicyType.ANYONE:
      return 'Follow';

    case FollowPolicyType.CHARGE:
      return `Pay ${policy.amount.toSignificantDigits(6)} ${policy.amount.asset.symbol} to follow`;
      
    default:
      return `You cannot follow`;
  }
}

export function FollowButton({ followee }: FollowButtonProps) {
  if (followee.followStatus.isFollowedByMe) {
    return  (
      <p>You are following {followee.handle}</p>
    )
  }
  
  return (
    <button disabled={!followee.followStatus.canFollow}>
      {formatButtonText(followee.followPolicy)}
    </button>
  );
}
```

> 🚧 Why use `followStatus`?
> 
> If you are familiar with the Lens API you might already seen other Profile fields that can be used to achieve similar needs. While it's true that one could technically infer `followStatus.isFollowedByMe` and `followStatus.canFollow` from other Profile fields, those **other fields are a frozen snapshot of the Profile** at the time the data was retrieved from the API.
> 
> On the other hand **`followStatus` takes into account the dynamic nature of the app**. It takes into account any inflight follow/unfollow requests (e.g. tx that are not mined or indexed yet) and gives you the cohesive state you need to build a solid UX.

Now let's add the actual follow capability via the `useFollow` hook.

```typescript FollowButton.tsx
import { Profile, ProfileOwnedByMe, useFollow } from '@lens-protocol/react-web';

type FollowButtonProps = {
  followee: Profile;
  follower: ProfileOwnedByMe;
}

// formatButtonText helper omitted for brevity

export function FollowButton({ followee, follower }: FollowButtonProps) {
  const { execute: follow, error, isPending } = useFollow({ followee, follower });
  
  return (
    <>
      <button disabled={!followee.followStatus.canFollow || isPending} onClick={follow}>
        {formatButtonText(followee.followPolicy)}
      </button>
         
      {error && <small>{error.message}</small>}
    </>
  );
}
```

> 👍 `ProfileOwnedByMe`?
> 
> You might remember this specialized type of profile from [Profile Management](doc:profile-management) guide.
> 
> This is a special type of Profile returned by hooks such as `useActiveProfile` (or `useProfilesOwnedByMe`) so to be used in scenario we have to know the Profile that is the "actor" performing a given operation.
> 
> This not only makes the whole SDK more type safe but also promotes an usage of hooks and wrapping component that minimize re-rendering and simplify data flow.

### Error handling

In the example above we just render the `error.message` under the follow button. This might be quick but probably not very user friendly. Mostly because the error message are aimed at integrators and not end-users.

In this section we will explore 2 ways of handling errors.

#### Format error messages

The most straightforward way to deal with error is just to have a formatting component that translates the error type into a user friendly message.

```typescript FollowButton.tsx
import { FollowOperation, useFollow } from '@lens-protocol/react-web';

// other details omitted for brevity

function FormatErrorMessage({ error }: { error: FollowOperation['error'] }) {
  if (!error) {
    return null;
  }
  
  switch (error.name) {
    case 'InsufficientAllowanceError':
      return <small>Your wallet does not have enough allowance to perform this transaction.</small>

    case 'InsufficientFundsError':
      return <small>Your wallet does not have enough funds to cover the requested follow fee.</small>

    case 'PendingSigningRequestError':
      return <small>There is a pending signing request in your wallet. Please sign or reject it before proceeding.</small>

    case 'UserRejectedError':
      return <small>You rejected the signing.</small>
      
    case 'WalletConnectionError':
    case 'BroadcastingError':
    case 'PrematureFollowError':
      return <small>An unexpected error occurred. Please try again.</small>
  }
}

export function FollowButton({ followee, follower }: FollowButtonProps) {
  const { execute: follow, error, isPending } = useFollow({ followee, follower });
  
  return (
    <>
      <button disabled={!followee.followStatus.canFollow || isPending} onClick={follow}>
        {formatButtonText(followee.followPolicy)}
      </button>
         
      <FormatErrorMessage error={error} />
    </>
  );
}
```

You can find the most up-to-date list of error types that `useFollow` could return in the corresponding [reference docs](https://lens-protocol.github.io/lens-sdk/types/_lens_protocol_react_web.FollowOperation.html).

#### Handle operation result

Another way to handle errors is imperatively at the call site. `useFollow` like many other SDK hooks that perform operations do resolve with a [`Result`](https://lens-protocol.github.io/lens-sdk/types/_lens_protocol_react_web.Result.html) object. Let's see how to use it to manage error scenarios.

```typescript FollowButton.tsx
import { toast } from 'react-hot-toast';

import { PendingSigningRequestError, useFollow } from '@lens-protocol/react-web';

// other details omitted for brevity

export function FollowButton({ followee, follower }: FollowButtonProps) {
  const { execute, isPending } = useFollow({ followee, follower });

  const follow = async () => {
    const result = await execute();

    if (result.isFailure()) {
      if (result.error instanceof PendingSigningRequestError) {
        toast.error(
          'There is a pending signing request in your wallet. Please sign or reject it before proceeding.'
        );
        return;
      }

      // other result.error handling as appropriate
    }
  }
  
  return (
    <button disabled={!followee.followStatus.canFollow || isPending} onClick={follow}>
    	{formatButtonText(followee.followPolicy)}
    </button>
  );
}
```

##### What's happening?

- we put a `follow` callback that sits in between the button `onClick` and the `useFollow` `execute` function.
- we no longer use the `error` returned by the `useFollow` hook
- inside this `follow` callback we do the following:
  - we call the `useFollow` `execute` function and keep the `result`
  - in case the `result` is a failure we handle the `result.error`. In this example we use [`react-hot-toast`](https://react-hot-toast.com/), adapt it to your needs.

##### Note

In this example we used the [`instanceof` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) to determine the nature of the error. Both the approach of using the `error.name` and `instanceof` are valid approaches and can be mixed with the 2 different error handling strategies.

### Insufficient ERC-20 balance

When performing a paid follow (i.e. following a Profile with `FollowPolicyType.CHARGE` Follow Policy) one of the error you can encounter is: `InsufficientFundsError`.

It indicates that the logged-in wallet does not have enough tokens of the required ERC-20 currency.

How to manage this error really depends on the capabilities of your app. One could simply inform the user so they can go and buy tokens from an exchange or, if you have a built-in on-ramp feature you could help the user in the process.

In the example below we will just implement a warning scenario.

```typescript FollowButton.tsx
import { toast } from 'react-hot-toast';

import { InsufficientFundsError, useFollow } from '@lens-protocol/react-web';

// other details omitted for brevity

export function FollowButton({ followee, follower }: FollowButtonProps) {
  const { execute, isPending } = useFollow({ followee, follower });

  const follow = async () => {
    const result = await execute();

    if (result.isFailure()) {
      if (result.error instanceof InsufficientFundsError) {
        const amount = result.error.requestedAmount;
        
        toast.error(
          `You don't have enough ${amount.asset.symbol} in your wallet. \n` +
          `Buy ${amount.toSignificantDigits(6)} ${amount.asset.symbol} on an exchange and try again. \n` +
          `Make sure to put the funds on you wallet on the Polygon network`
        );
        return;
      }

      // other result.error handling as appropriate
    }
  }
  
  return (
    <button disabled={!followee.followStatus.canFollow || isPending} onClick={follow}>
      {formatButtonText(followee.followPolicy)}
    </button>
  );
}
```

##### What's happening?

- we opt to do error handling using the `result` object. See section above.
- we detect the `result.error` is of type `InsufficientFundsError` and then we leverage the `error.requestedAmount` property to create a user friendly message. In this case the `error.requestedAmount` is the same exact value of `followPolicy.amount` and it's reported here for your convenience.
- we render a \`

### Insufficient ERC-20 Allowance

Another common scenario you are likely to need to deal with is: `InsufficientAllowanceError`.

It indicates that, although there is enough ERC-20 funds in the user's wallet, the corresponding ERC-20 contract has not been given the required pre-authorization to let the specific Lens Protocol contract withdraw the follow fee.

The concept of ERC-20 token Allowance is very crypto-native. It's not the intent of this document to explain in details the concept, there are better articles out there explaining this at length.

For the purpose of our explanation we can just say the ERC-20 Allowance is a security mechanism that aims to protect the owner's funds.

You might have encountered this concept in other dApps when you are asked to sign and pay for the **Approve transaction** before moving forward.

The underlying idea is that in order for a 3rd party actor (called the "spender") to be able to interact with one's ERC-20 funds, the funds owner needs to provide a pre-authorization (the Allowance "amount"). The Allowance can be for an exact amount or for a larger amount. The Allowance can be revoked by setting it to 0. The Allowance does no constitute per se a final authorization to withdraw the funds. The owner would normally still need to provide a second authorization for the 3rd party to access the funds.

> 🚧 Caveat
> 
> At the time of this writing not all ERC-20s supported by the Lens Protocol have facility to make it possible to perform the operation in a [gasless](doc:gasless) fashion.
> 
> This imply that the **user's wallet is responsible for signing and paying gas costs for the Approve transaction**.

This is the sequence of events we are going to guide the user through:

1. user attempts to perform a paid follow
2. the user sees a UI informing them that they have to sign and pay for the Approve transaction
3. the user retries the paid follow

Let's detect the `InsufficientAllowanceError` and show an informative UI.

```typescript FollowButton.tsx
import { useState } from 'react';

import { Erc20Amount, InsufficientAllowanceError, useFollow } from '@lens-protocol/react-web';

import { ApproveFollowModal } from './ApproveFollowModal';

// other details omitted for brevity

export function FollowButton({ followee, follower }: FollowButtonProps) {
  let [showApproveModal, setShowApproveModal] = useState(false)
  
  const { execute, isPending } = useFollow({ followee, follower });

  const follow = async () => {
    const result = await execute();

    if (result.isFailure()) {
      if (result.error instanceof InsufficientAllowanceError) {       
        setShowApproveModal(true);
        return;
      }

      // other result.error handling as appropriate
    }
  }
  
  return (
    <>
      <button disabled={!followee.followStatus.canFollow || isPending} onClick={follow}>
    	  {formatButtonText(followee.followPolicy)}
      </button>

      {showApproveModal && (
         <ApproveFollowModal followee={followee} onClose={() => setShowApproveModal(false) }/>
      )}
    </>
  );
}
```

#### What's happening?

- we add a state that controls the visibility of a new component called `<ApproveFollowModal>`
- we detect the `InsufficientAllowanceError` and we update the state so to show the component.

Let's see how the `<ApproveFollowModal>` component could look like.

```typescript ApproveFollowModal.tsx
import { Dialog } from '@headlessui/react';
import invariant from 'tiny-invariant';

import { FollowPolicyType, useApproveModule } from '@lens-protocol/react-web';

type ApproveFollowModalProps = {
  followee: Profile;
  onClode: () => void
}

function noop() {}

export function ApproveFollowModal({ followee, onClose }: ApproveFollowModalProps) {
  const { execute, error, loading } = useApproveModule();
  
  const followPolicy = followee.followPolicy.amount;
  
  invariant(followPolicy.type === FollowPolicyType.CHARGE, 'followee.followPolicy.type must be CHARGE')
  
  const approve = async () => {
    const restult = await execute({
      // The follow fee
      amount: followPolicy.amount,

      // The follow module contract address
      spender: followPolicy.contractAddress,
      
      // In this case we want to  approve the exact amount, TokenAllowanceLimit.INFINITE is another option
      limit: TokenAllowanceLimit.EXACT
    });
    
    if (result.isSuccess()) {
      onClose();
    }
  };
  
  return (
    <Dialog open onClose={loading ? noop : onClose}>
      <Dialog.Panel>
        <Dialog.Title>Pre-approve follow</Dialog.Title>

        <p>
          This operation allows you to pre-approve the Lens Follow Module
          (address: {followPolicy.contractAddress})
          associated with <strong>{followee.handle}</strong> follow settings
          to withdraw {fee.toSignificantDigits(6)} {fee.asset.symbol}.
        </p>

        {error && <p>{error.message}</p>}

        <button disabled={loading} onClick={onClose}>Cancel</button>
        <button disabled={loading} onClick={approve}>Approve</button>
      </Dialog.Panel>
    </Dialog>
  );
}
```

#### What's happening?

- we use the `followPolicy` details to inform the user about the operation they are about to perform
- we use the  `useApproveModule` to aid the process of signing and sending the Approve transaction. Specifically we call the `execute` callback with: 
  - the follow fee amount
  - the follow module contract address
  - the limit to use, allows just for the exact amount.
- we disable buttons and the closing of the modal while `loading` is `true`
- we close the modal when the operation `result` succeeds.

#### Notes

- We used [Headless UI `<Dialog>`](https://headlessui.com/react/dialog) to build a modal. This is not integral part of this guide. Use the tool that works best for you.
- In the example above we used `TokenAllowanceLimit.EXACT` as allowance `limit`. These are the options available and what they mean:
  - `TokenAllowanceLimit.EXACT` limits the `spender` to use just the specified `amount`. Any other paid follow will show the `InsufficientAllowanceError` again.
  - `TokenAllowanceLimit.INFINITE` sets the pre-approval limit for the given ERC-20 to infinite. Basically this sort the effect of not surfacing `InsufficientAllowanceError` again in case of another paid follow involving the same ERC-20.
- We also used [`tiny-invariant`](https://www.npmjs.com/package/tiny-invariant) function to conveniently narrow down the type of `followPolicy` to [`ChargeFollowPolicy`](https://lens-protocol.github.io/lens-sdk/types/_lens_protocol_react_web.ChargeFollowPolicy.html) so to not have to second guess its properties later in the component. This is not the only way to solve this, your call.

> 👍 EIP-1559
> 
> The `useApproveModule` hook implements [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) gas price estimation strategy.

#### One last thing

We are almost there. The last thing to do is manage error for the `useApproveModule` hook.

In the example above we just print the `error.message` into the modal content. As for the case of `useFollow` error handling, the `error.message` here is not very user friendly so we might want adopt one of the 2 strategies outlined before. Of which we just show the formatting error approach here.

```typescript ApproveFollowModal.tsx
import { Dialog } from '@headlessui/react';
import invariant from 'tiny-invariant';

import { ApproveModuleOperation, useApproveModule } from '@lens-protocol/react-web';

function FormatErrorMessage({ error }: { error: ApproveModuleOperation['error'] }) {
  if (!error) {
    return null;
  }
  
  switch (error.name) {
    case 'InsufficientGasError':
      return <small>You don't have enough MATIC to cover the gas costs of this transaction</small>      
      
    case 'PendingSigningRequestError':
      return <small>There is a pending signing request in your wallet. Please sign or reject it before proceeding.</small>

    case 'UserRejectedError':
      return <small>You rejected the signing.</small>
      
    case 'TransactionError':
    case 'WalletConnectionError':
      return <small>An unexpected error occurred. Please try again.</small>
  }
}

export function ApproveFollowModal({ followee, onClose }: ApproveFollowModalProps) {
  const { execute, error, loading } = useApproveModule();
  
  // omitted for brevity
  
  return (
    <Dialog open onClose={loading ? noop : onClose}>
      <Dialog.Panel>
        <Dialog.Title>Pre-approve follow</Dialog.Title>

        <p>
          This operation allows you to pre-approve the Lens Follow Module
          (address: {followPolicy.contractAddress})
          associated with <strong>{followee.handle}</strong> follow settings
          to withdraw {fee.toSignificantDigits(6)} {fee.asset.symbol}.
        </p>

		<FormatErrorMessage error={error} />
        
        <button disabled={loading} onClick={onClose}>Cancel</button>
        <button disabled={loading} onClick={approve}>Approve</button>
      </Dialog.Panel>
    </Dialog>
  );
}
```

Worth noting here:

- the `InsufficientGasError` is an error specific to operations that requires user's wallet MATIC to pay for the transaction costs. Similar to `InsufficientFundsError` you should adapt the UX to what best works for your users (on-ramp, exchange, etc.).
- the `TransactionError` is the one we encountered in [Error handling](doc:error-handling) and gives some more details about the reason for the failure.

## How to unfollow

Finally let's cover how to unfollow a Profile. We are going to use the `useUnfollow` hook. As it's very similar to the follow feature, just specular in its outcome, we are going to take a quick shortcut and show you the full example.

```typescript UnfollowButton.tsx
import { Profile, ProfileOwnedByMe, useUnfollow } from '@lens-protocol/react-web';

type UnfollowButtonProps = {
  followee: Profile;
  follower: ProfileOwnedByMe;
}

export function UnfollowButton({ followee, follower }: UnfollowButtonProps) {
  const { execute: unfollow, error, isPending } = useUnfollow({ followee, follower });
  
  return (
    <>
      <button disabled={!followee.followStatus.canUnfollow || isPending} onClick={unfollow}>
        Unfollow
      </button>
         
      {error && <small>{error.message}</small>}
    </>
  );
}
```

Notice the use of `followee.followStatus.canUnfollow` to determine if at any given point in time the operation can be performed. This accounts for any transient state (for example a pending follow request not yet finalized).

> 👍 Bonus track
> 
> The `UnfollowButton` example shown above is great to communicate the essence of the `useUnfollow` hook, but we think it's NOT the most common way to use it.
> 
> Check [this example](https://github.com/lens-protocol/lens-sdk/blob/main/examples/web-wagmi/src/profiles/UseFollowAndUnfollow.tsx) in the Lens SDK monorepo that shows you how to build a follow/unfollow feature within the same button component.