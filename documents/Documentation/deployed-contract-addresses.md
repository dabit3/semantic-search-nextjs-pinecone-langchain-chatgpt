---
title: "Deployed Contract Addresses"
slug: "deployed-contract-addresses"
hidden: false
createdAt: "2022-02-07T15:05:22.059Z"
updatedAt: "2023-03-29T18:34:10.878Z"
---
## Polygon Mainnet Addresses

The official block explorer can be found here:

- [Polygon Mainnet Block Explorer](https://polygonscan.com/)

| Contract                                         | Address                                                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| LensHub Proxy _(use this one for interactions!)_ | [0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d](https://polygonscan.com/address/0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d) |
| LensHub Implementation                           | [0xeCd1d11B69FFd9794d45269247f9Fc139462bC12](https://polygonscan.com/address/0xeCd1d11B69FFd9794d45269247f9Fc139462bC12) |
| PublishingLogic                                  | [0x931519D41797C73b9CE993B52c1af900373b5b43](https://polygonscan.com/address/0x931519D41797C73b9CE993B52c1af900373b5b43) |
| InteractionLogic                                 | [0xe71291f49C4b572EF6e864Ba54E50C13A6D407e7](https://polygonscan.com/address/0xe71291f49C4b572EF6e864Ba54E50C13A6D407e7) |
| ProfileTokenURILogic                             | [0x3FA902A571E941dCAc6081d57917994DDB0F9A9d](https://polygonscan.com/address/0x3FA902A571E941dCAc6081d57917994DDB0F9A9d) |
| FeeCollectModule                                 | [0x1292E6dF9a4697DAAfDDBD61D5a7545A634af33d](https://polygonscan.com/address/0x1292E6dF9a4697DAAfDDBD61D5a7545A634af33d) |
| LimitedFeeCollectModule                          | [0xEF13EFa565FB29Cd55ECf3De2beb6c69bD988212](https://polygonscan.com/address/0xEF13EFa565FB29Cd55ECf3De2beb6c69bD988212) |
| TimedFeeCollectModule                            | [0xbf4E6C28d7f37C867CE62cf6ccb9efa4C7676F7F](https://polygonscan.com/address/0xbf4E6C28d7f37C867CE62cf6ccb9efa4C7676F7F) |
| LimitedTimedFeeCollectModule                     | [0x7B94f57652cC1e5631532904A4A038435694636b](https://polygonscan.com/address/0x7B94f57652cC1e5631532904A4A038435694636b) |
| RevertCollectModule                              | [0xa31FF85E840ED117E172BC9Ad89E55128A999205](https://polygonscan.com/address/0xa31FF85E840ED117E172BC9Ad89E55128A999205) |
| FreeCollectModule                                | [0x23b9467334bEb345aAa6fd1545538F3d54436e96](https://polygonscan.com/address/0x23b9467334bEb345aAa6fd1545538F3d54436e96) |
| FeeFollowModule                                  | [0x80ae0e6048d6e295Ee6520b07Eb6EC4485193FD6](https://polygonscan.com/address/0x80ae0e6048d6e295Ee6520b07Eb6EC4485193FD6) |
| ProfileFollowModule                              | [0x057ccDf5153bE1081830a6C3D507C9dfE1ac8e4E](https://polygonscan.com/address/0x057ccDf5153bE1081830a6C3D507C9dfE1ac8e4E) |
| RevertFollowModule                               | [0x6640e4Fb3fd56a6d7DfF3C351dFd9Ab7E57fb769](https://polygonscan.com/address/0x6640e4Fb3fd56a6d7DfF3C351dFd9Ab7E57fb769) |
| FollowerOnlyReferenceModule                      | [0x17317F96f0C7a845FFe78c60B10aB15789b57Aaa](https://polygonscan.com/address/0x17317F96f0C7a845FFe78c60B10aB15789b57Aaa) |
| FollowNFT                                        | [0xb0298c5540f4cfb3840c25d290be3ef3fe09fa8c](https://polygonscan.com/address/0xb0298c5540f4cfb3840c25d290be3ef3fe09fa8c) |
| CollectNFT                                       | [0x2172758ebb894c43e0be01e37d065118317d7eec](https://polygonscan.com/address/0x2172758ebb894c43e0be01e37d065118317d7eec) |
| LensPeriphery                                    | [0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f](https://polygonscan.com/address/0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f) |
| ModuleGlobals                                    | [0x3Df697FF746a60CBe9ee8D47555c88CB66f03BB9](https://polygonscan.com/address/0x3Df697FF746a60CBe9ee8D47555c88CB66f03BB9) |
| ProfileCreationProxy                             | [0x1eeC6ecCaA4625da3Fa6Cd6339DBcc2418710E8a](https://polygonscan.com/address/0x1eeC6ecCaA4625da3Fa6Cd6339DBcc2418710E8a) |
| UIDataProvider                                   | [0x8b0A28a8DE1de77668260A876c6DCF0330183742](https://polygonscan.com/address/0x8b0A28a8DE1de77668260A876c6DCF0330183742) |

## Mumbai Testnet Addresses

The official faucet and block explorer can be found here:

- [Polygon Testnet Faucet](https://faucet.polygon.technology/)
- [Polygon Mumbai Block Explorer](https://mumbai.polygonscan.com/)

**Note:** The `MockProfileCreationProxy` is a whitelisted profile creator that allows anyone to create a profile via `function proxyCreateProfile(DataTypes.CreateProfileData calldata vars)`. This function takes in the exact same parameters required by the standard `createProfile(DataTypes.CreateProfileData calldata vars)` function on the `LensHub`.

| Contract                                         | Address                                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| LensHub Proxy _(use this one for interactions!)_ | [0x60Ae865ee4C725cd04353b5AAb364553f56ceF82](https://mumbai.polygonscan.com/address/0x60Ae865ee4C725cd04353b5AAb364553f56ceF82) |
| LensHub Implementation                           | [0x45cf9Ba12b43F6c8B7148E06A6f84c5B9ad3Dd44](https://mumbai.polygonscan.com/address/0x45cf9Ba12b43F6c8B7148E06A6f84c5B9ad3Dd44) |
| PublishingLogic                                  | [0x7f9bfF8493F821111741b93429A6A6F79DC546F0](https://mumbai.polygonscan.com/address/0x7f9bfF8493F821111741b93429A6A6F79DC546F0) |
| InteractionLogic                                 | [0x845242e2Cd249af8D4f0D7085DefEAc3381815E3](https://mumbai.polygonscan.com/address/0x845242e2Cd249af8D4f0D7085DefEAc3381815E3) |
| ProfileTokenURILogic                             | [0xf62c27B7B70A33739A7C088097fc20609A80eE58](https://mumbai.polygonscan.com/address/0xf62c27B7B70A33739A7C088097fc20609A80eE58) |
| FeeCollectModule                                 | [0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82](https://mumbai.polygonscan.com/address/0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82) |
| LimitedFeeCollectModule                          | [0xFCDA2801a31ba70dfe542793020a934F880D54aB](https://mumbai.polygonscan.com/address/0xFCDA2801a31ba70dfe542793020a934F880D54aB) |
| TimedFeeCollectModule                            | [0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db](https://mumbai.polygonscan.com/address/0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db) |
| LimitedTimedFeeCollectModule                     | [0xDa76E44775C441eF53B9c769d175fB2948F15e1C](https://mumbai.polygonscan.com/address/0xDa76E44775C441eF53B9c769d175fB2948F15e1C) |
| RevertCollectModule                              | [0x5E70fFD2C6D04d65C3abeBa64E93082cfA348dF8](https://mumbai.polygonscan.com/address/0x5E70fFD2C6D04d65C3abeBa64E93082cfA348dF8) |
| FreeCollectModule                                | [0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c](https://mumbai.polygonscan.com/address/0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c) |
| FeeFollowModule                                  | [0xe7AB9BA11b97EAC820DbCc861869092b52B65C06](https://mumbai.polygonscan.com/address/0xe7AB9BA11b97EAC820DbCc861869092b52B65C06) |
| ProfileFollowModule                              | [0x8c32203df6b1A04E25145346e2DaAD0B4712C20D](https://mumbai.polygonscan.com/address/0x8c32203df6b1A04E25145346e2DaAD0B4712C20D) |
| RevertFollowModule                               | [0x8c822Fc029EBdE62Da1Ed1072534c5e112dAE48c](https://mumbai.polygonscan.com/address/0x8c822Fc029EBdE62Da1Ed1072534c5e112dAE48c) |
| FollowerOnlyReferenceModule                      | [0x7Ea109eC988a0200A1F79Ae9b78590F92D357a16](https://mumbai.polygonscan.com/address/0x7Ea109eC988a0200A1F79Ae9b78590F92D357a16) |
| FollowNFT                                        | [0x1a2bb1bc90aa5716f5eb85fd1823338bd1b6f772](https://mumbai.polygonscan.com/address/0x1a2bb1bc90aa5716f5eb85fd1823338bd1b6f772) |
| CollectNFT                                       | [0x39dcB881eBdB0DF708412754468c99B4EbD2E370](https://mumbai.polygonscan.com/address/0x39dcB881eBdB0DF708412754468c99B4EbD2E370) |
| LensPeriphery                                    | [0xD5037d72877808cdE7F669563e9389930AF404E8](https://mumbai.polygonscan.com/address/0xD5037d72877808cdE7F669563e9389930AF404E8) |
| ModuleGlobals                                    | [0x1353aAdfE5FeD85382826757A95DE908bd21C4f9](https://mumbai.polygonscan.com/address/0x1353aAdfE5FeD85382826757A95DE908bd21C4f9) |
| MockProfileCreationProxy                         | [0x420f0257D43145bb002E69B14FF2Eb9630Fc4736](https://mumbai.polygonscan.com/address/0x420f0257D43145bb002E69B14FF2Eb9630Fc4736) |
| UIDataProvider                                   | [0x4fF8EB275b2817fB2e7893bFF7ae7994e54e0730](https://mumbai.polygonscan.com/address/0x4fF8EB275b2817fB2e7893bFF7ae7994e54e0730) |

## Sandbox Mumbai Testnet Addresses

This Lens version does not have whitelist restrictions for the modules & currencies.

The official faucet and block explorer can be found here:

- [Polygon Testnet Faucet](https://faucet.polygon.technology/)
- [Polygon Mumbai Block Explorer](https://mumbai.polygonscan.com/)

**Note:** The `MockProfileCreationProxy` is a whitelisted profile creator that allows anyone to create a profile via `function proxyCreateProfile(DataTypes.CreateProfileData calldata vars)`. This function takes in the exact same parameters required by the standard `createProfile(DataTypes.CreateProfileData calldata vars)` function on the `LensHub`.

**Note 2:** The `MockSandboxGovernance` is a mock Governance contract that can Whitelist Follow/Reference/Collect modules without checking for `onlyGov` permissions. The functions for whitelisting modules are the same as in LensHub and follow the same standard: `whitelistFollowModule(address followModule, bool whitelist)`, `whitelistReferenceModule(address referenceModule, bool whitelist)`, `whitelistCollectModule(address collectModule, bool whitelist)`

| Contract                                         | Address                                                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| LensHub Proxy _(use this one for interactions!)_ | [0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5](https://mumbai.polygonscan.com/address/0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5) |
| LensHub Implementation                           | [0x7836c7cb79b7f3d53e92c95bf43798ada212fe4e](https://mumbai.polygonscan.com/address/0x7836c7cb79b7f3d53e92c95bf43798ada212fe4e) |
| PublishingLogic                                  | [0xDaDB107743e91249929C55132A238a3E735eA7eC](https://mumbai.polygonscan.com/address/0xDaDB107743e91249929C55132A238a3E735eA7eC) |
| InteractionLogic                                 | [0xB91F340BEab90580d557F1332704bF5DB9c35A9D](https://mumbai.polygonscan.com/address/0xB91F340BEab90580d557F1332704bF5DB9c35A9D) |
| ProfileTokenURILogic                             | [0x5A39B7A9507044509Ef97D4EA306Dc8bA9DB818e](https://mumbai.polygonscan.com/address/0x5A39B7A9507044509Ef97D4EA306Dc8bA9DB818e) |
| FeeCollectModule                                 | [0xD57C675b542bFC24242a1088514306fFaeaFc6Fb](https://mumbai.polygonscan.com/address/0xD57C675b542bFC24242a1088514306fFaeaFc6Fb) |
| LimitedFeeCollectModule                          | [0x27742f7e82356e1c1e4177C11f627B5Dc18E4686](https://mumbai.polygonscan.com/address/0x27742f7e82356e1c1e4177C11f627B5Dc18E4686) |
| TimedFeeCollectModule                            | [0x6Bf382f52398DAdD3969Fb9C1AB3a1Bab8268F4E](https://mumbai.polygonscan.com/address/0x6Bf382f52398DAdD3969Fb9C1AB3a1Bab8268F4E) |
| LimitedTimedFeeCollectModule                     | [0x75Df383C587B0de2EB00FeA95B9b8e3AF35EbCe6](https://mumbai.polygonscan.com/address/0x75Df383C587B0de2EB00FeA95B9b8e3AF35EbCe6) |
| RevertCollectModule                              | [0x75fe7513709E6Ca573d017cE979F7d35192CE0d5](https://mumbai.polygonscan.com/address/0x75fe7513709E6Ca573d017cE979F7d35192CE0d5) |
| FreeCollectModule                                | [0x11C45Cbc6fDa2dbe435C0079a2ccF9c4c7051595](https://mumbai.polygonscan.com/address/0x11C45Cbc6fDa2dbe435C0079a2ccF9c4c7051595) |
| FeeFollowModule                                  | [0xE98a40DB1170B3A46ffa7bA84335A0A0e9A65C2d](https://mumbai.polygonscan.com/address/0xE98a40DB1170B3A46ffa7bA84335A0A0e9A65C2d) |
| ProfileFollowModule                              | [0x62D0EcAB45428087d91a94EE33E141B7496Ad7c3](https://mumbai.polygonscan.com/address/0x62D0EcAB45428087d91a94EE33E141B7496Ad7c3) |
| RevertFollowModule                               | [0x65004331Ae1c3D35DF81aEC6E8C259167Bbe64E2](https://mumbai.polygonscan.com/address/0x65004331Ae1c3D35DF81aEC6E8C259167Bbe64E2) |
| FollowerOnlyReferenceModule                      | [0xB080AAc00E53FBeb04917F22096721d602c70759](https://mumbai.polygonscan.com/address/0xB080AAc00E53FBeb04917F22096721d602c70759) |
| FollowNFT                                        | [0xf51b134ca8f54fdf19eb49001fe337b1e93cf707](https://mumbai.polygonscan.com/address/0xf51b134ca8f54fdf19eb49001fe337b1e93cf707) |
| CollectNFT                                       | [0x57F4040B6a38C26e8a92527e3495EB936496CCc9](https://mumbai.polygonscan.com/address/0x57F4040B6a38C26e8a92527e3495EB936496CCc9) |
| LensPeriphery                                    | [0xa6bcF4398824A199965f89094796DFCcEa81b1a6](https://mumbai.polygonscan.com/address/0xa6bcF4398824A199965f89094796DFCcEa81b1a6) |
| ModuleGlobals                                    | [0xcbCC5b9611d22d11403373432642Df9Ef7Dd81AD](https://mumbai.polygonscan.com/address/0xcbCC5b9611d22d11403373432642Df9Ef7Dd81AD) |
| MockProfileCreationProxy                         | [0x4fe8deB1cf6068060dE50aA584C3adf00fbDB87f](https://mumbai.polygonscan.com/address/0x4fe8deB1cf6068060dE50aA584C3adf00fbDB87f) |
| MockSandboxGovernance                            | [0x1677d9cc4861f1c85ac7009d5f06f49c928ca2ad](https://mumbai.polygonscan.com/address/0x1677d9cc4861f1c85ac7009d5f06f49c928ca2ad) |
| UIDataProvider                                   | [0x5dDD1d6c04E805D830574A31Bf7979D416c6d7c5](https://mumbai.polygonscan.com/address/0x5dDD1d6c04E805D830574A31Bf7979D416c6d7c5) |

## Sandbox Polygon zkEVM Testnet Addresses

This Lens version does not have whitelist restrictions for the modules & currencies.

The zkEVM Testnet is linked to the Ethereum Goerli Testnet, information can be found here:

- [zkEVM Bridge](https://public.zkevm-test.net/l)
- [zkEVM Block Explorer](https://zkevm.polygonscan.com/)

**Note:** The `MockProfileCreationProxy` is a whitelisted profile creator that allows anyone to create a profile via `function proxyCreateProfile(DataTypes.CreateProfileData calldata vars)`. This function takes in the exact same parameters required by the standard `createProfile(DataTypes.CreateProfileData calldata vars)` function on the `LensHub`.

| Contract                                         | Address                                                                                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| LensHub Proxy _(use this one for interactions!)_ | [0x28af365578586eD5Fd500A1Dc0a3E20Fc7b2Cffa](https://public.zkevm-test.net:8443/address/0x28af365578586eD5Fd500A1Dc0a3E20Fc7b2Cffa) |
| LensHub Implementation                           | [0x1b30F214c192EF4B7F8c9926c47C4161016955DA](https://public.zkevm-test.net:8443/address/0x1b30F214c192EF4B7F8c9926c47C4161016955DA) |
| PublishingLogic                                  | [0xfAAdCf7EA45FDE28FC05d584B8bc206C79f7c4cA](https://public.zkevm-test.net:8443/address/0xfAAdCf7EA45FDE28FC05d584B8bc206C79f7c4cA) |
| InteractionLogic                                 | [0xe88145bCB599E6b9984707651e23fb7bd485EDD3](https://public.zkevm-test.net:8443/address/0xe88145bCB599E6b9984707651e23fb7bd485EDD3) |
| ProfileTokenURILogic                             | [0x4E0d5b0a41196b0EDee8Ecd3C97C8889c502f041](https://public.zkevm-test.net:8443/address/0x4E0d5b0a41196b0EDee8Ecd3C97C8889c502f041) |
| FeeCollectModule                                 | [0x3Dfe8C165929f4AbB02ffb3a46ccE6BdA4e5fABE](https://public.zkevm-test.net:8443/address/0x3Dfe8C165929f4AbB02ffb3a46ccE6BdA4e5fABE) |
| LimitedFeeCollectModule                          | [0xcafdB2Acb9a30D00E614817533A204100163432D](https://public.zkevm-test.net:8443/address/0xcafdB2Acb9a30D00E614817533A204100163432D) |
| TimedFeeCollectModule                            | [0x53C1998e9695Da499bd3Ec2eFfeACCab14c850CF](https://public.zkevm-test.net:8443/address/0x53C1998e9695Da499bd3Ec2eFfeACCab14c850CF) |
| LimitedTimedFeeCollectModule                     | [0x86CDBB3D663888676365960D93A1c7B727506ed5](https://public.zkevm-test.net:8443/address/0x86CDBB3D663888676365960D93A1c7B727506ed5) |
| RevertCollectModule                              | [0x3111B932cF33a980De37734a4dA10163b2b84077](https://public.zkevm-test.net:8443/address/0x3111B932cF33a980De37734a4dA10163b2b84077) |
| FreeCollectModule                                | [0xBe4d2f15dc26626A5a2BAd27d96AcEf054D7d33A](https://public.zkevm-test.net:8443/address/0xBe4d2f15dc26626A5a2BAd27d96AcEf054D7d33A) |
| FeeFollowModule                                  | [0x218fcF793FA1e4fDA220Fb7e55aDF9d8fe0b8C96](https://public.zkevm-test.net:8443/address/0x218fcF793FA1e4fDA220Fb7e55aDF9d8fe0b8C96) |
| ProfileFollowModule                              | [0x3AF998eB454a418c4a66780c903CDF45d69265f9](https://public.zkevm-test.net:8443/address/0x3AF998eB454a418c4a66780c903CDF45d69265f9) |
| RevertFollowModule                               | [0xE24c9cd6aD3ea09e328BC0eb128FCb0d17737f96](https://public.zkevm-test.net:8443/address/0xE24c9cd6aD3ea09e328BC0eb128FCb0d17737f96) |
| FollowerOnlyReferenceModule                      | [0xC6396dcDA9E8830EFD44717da003B0D99b786621](https://public.zkevm-test.net:8443/address/0xC6396dcDA9E8830EFD44717da003B0D99b786621) |
| FollowNFT                                        | [0x9d7c6e30345fc68be670017bbcc6840b35978a7a](https://public.zkevm-test.net:8443/address/0x9d7c6e30345fc68be670017bbcc6840b35978a7a) |
| CollectNFT                                       | [0xe4419a822f6e53fe4d25ff22f51fa5de54e10f53](https://public.zkevm-test.net:8443/address/0xe4419a822f6e53fe4d25ff22f51fa5de54e10f53) |
| LensPeriphery                                    | [0x0e1F86F248fBc407BfFc4217042b5A55Db289385](https://public.zkevm-test.net:8443/address/0x0e1F86F248fBc407BfFc4217042b5A55Db289385) |
| ModuleGlobals                                    | [0x20d35ea7c5186879E7d5Ec6d0941d451bBa54F4b](https://public.zkevm-test.net:8443/address/0x20d35ea7c5186879E7d5Ec6d0941d451bBa54F4b) |
| MockProfileCreationProxy                         | [0x923e7786176Ef21d0B31645fB1353b1392Dd0e40](https://public.zkevm-test.net:8443/address/0x923e7786176Ef21d0B31645fB1353b1392Dd0e40) |
| UIDataProvider                                   | [0x1e20C5D968C543245Ab4f6749e5f863a82842337](https://public.zkevm-test.net:8443/address/0x1e20C5D968C543245Ab4f6749e5f863a82842337) |