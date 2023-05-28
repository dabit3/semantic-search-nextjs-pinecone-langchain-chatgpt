---
title: "Public BigQuery"
slug: "public-big-query"
excerpt: "Fast and flexible queries of all Lens data in bulk and on demand."
hidden: false
createdAt: "2023-02-27T15:37:14.700Z"
updatedAt: "2023-04-05T04:34:43.796Z"
---
# Introduction

Lens already has indexers, which snapshot the data and transform it into a relational, super easy-to-understand database. This is how we get our speed on queries and how we can power all the LENS apps with the API. This saves the data into a centralised postgres database and allows you to query it using graphQL API. This is perfect for apps which need data on query time; for example, a user who is logging in wants to see their feed or see someone's profile. Querying this through the API is perfect and fast. The complication comes when you wish to bulk pull data, say you wish to do some ML training, some analytic, general data profiling. Right now, you would need a dedicated endpoint to surface that information, and of course, us creating these endpoints, which maybe you are only interested in. This does not scale. On top of this, having all this data and not allowing leverage for builders to do stuff feels wrong.

With this in mind, we have published the entire Lens social graph to a public [BigQuery](https://cloud.google.com/bigquery) dataset. This means you can query all the data in bulk, whatever you want, in any way you wish, to any demand. Public BigQuery datasets give you a 1TB allowance every month, but if you want more, just add some GCP credits. This information should be accessible by anyone without them having to write the complex task of indexers and have all that infrastructure set up. This solves that, bringing you the entire LENS graph in the cloud to query anytime you wish.

# What can I do with this?

You can pull huge data to do analytics say, a creator's analytics dashboard. You can pull huge amounts of day to run some ML code on it to showcase the discovery of publications. You can build your feeds with curated information very easily. This is the first step in allowing anyone to build custom features on top of LENS without the API has to do it for you. Think outside the box. You have the data. Go and build something epic with it.

# How to query it

You should read this to understand how you query public data sets from BigQuery <https://cloud.google.com/bigquery/public-data>. You can do it from the google cloud console or any BigQuery client libraries, which support mostly all languages. The easiest way if you want to play around with it is using the Analytic hub, as you can run queries directly through it.

![](https://files.readme.io/1e2bc93-Untitled.png)

We have three public data sets to query from:

- mumbai - `lens-public-data.mumbai.schema_table`
- polygon - `lens-public-data.polygon.schema_table`
- sandbox`lens-public-data.sandbox.schema_table`

**please note you MUST query this from the US region. If you try to use the EU region it will not be able to find it**

# How it works

It is very simple how it works. The diagram examples the flows:

![](https://files.readme.io/cf1fa97-gleek-CndmuA9zJ7YHDiXNuGscvw.png)

The data will always be **15 minutes behind**. This is the fastest setting you can have turned on with the data syncer.

# schema

We will dive into the DB setup for you; you can also generate an ERD on BigQuery to see how things lined up. The below will summarise all the tables and their usage; it won't go into full detail about their column types etc., as you can see in BigQuery for that.

All examples above have to include the schema in the query. For example, to query ens address reverse records, it would be

`lens-public-data.polygon.ens_address_reverse_record`

To see all available tables, you can run the following query:

```sql
SELECT table_name
FROM `lens-public-data.polygon.INFORMATION_SCHEMA.TABLES`
```

## ens

This holds the reverse record for an address mapped to the ENS; it only looks at wallet addresses which own a profile.

![](https://files.readme.io/861df5c-Untitled.png)

## proof_of_humanity

We index all owners of profiles to see if they have POH registered.

![](https://files.readme.io/104c1ff-Untitled_1.png)

## sybil_dot_org

We index all owners of profiles to see if they are part of the Sybil dot org

![](https://files.readme.io/81cffae-Untitled_2.png)

## worldcoin

We index any worldcoin human verification mapped to the profile id. The last seen block info table is just the state the indexer cares about.

![](https://files.readme.io/2ff5f1d-Untitled.png)

## public

The public schema holds most of the logic most people will care about.

### app stats

Apps can have their stats, aka what you did on lenster, for example. These tables do counters for actions on each app. 

![](https://files.readme.io/8f2da9a-Untitled_1.png)

### approval

As we explain in the docs within the API, when you transfer a follower NFT to someone, it could look like you follow them when you did not. To avoid that, we have approval tables in which when someone transfers a follower NFT to a wallet, it goes into an awaiting approval state until it is shown as you follow them.

![](https://files.readme.io/2d621da-Untitled_2.png)

### module whitelists

Throughout LENS, you have different types of modules to collect, reference and follow. These modules have to be whitelisted at the current time. These tables hold the mappings to those modules.

![](https://files.readme.io/338e9d3-Untitled_3.png)

### publication/follow NFT ownership

After you collect/follow, that NFT is still tradable. These tables keep the owner status up to date even after the collection/follow has happened.

![](https://files.readme.io/1c850c6-Untitled_4.png)

### follower

When you follow people, it's the wallet which follows, not profiles, so these tables keep that state in order. Please note it only writes once to the follower table, even if someone has followed that profile 100 times with the same wallet. A wallet can follow many times. 

![](https://files.readme.io/1ddd53d-Untitled_5.png)

### hashtags

You can hashtag words in publication content, and these tables' job is to keep it current.

![](https://files.readme.io/d1c1dd1-Untitled_6.png)

### indexed transactions

This table holds all the transaction hashes it has indexed with the block info attached to it

![](https://files.readme.io/52ff01d-Untitled.png)

### last seen block info

The indexer uses blooms to work out if it needs to check the block, and if that block has the information it should care about, that means it does not check every single block. This table has the last block it did check; it is used if the indexer ever goes down, and it can pick up from where it left off. 

![](https://files.readme.io/a0bb27a-Untitled_1.png)

### mentions

You can @people on LENS and attach their handle; these tables are in control of keeping the state updated about the mentions happening on the platform.

![](https://files.readme.io/e114c13-Untitled_2.png)

### notifications

Notifications often happen throughout the platform, and these tables keep all the notification information in sync.

![](https://files.readme.io/075d771-Untitled_3.png)

### profile

A very important factor of LENS is profiles. With this, you have many factors which hold state around the profile:

- profile_dispatcher - what the dispatcher set for the profile
- profile_follow_nft - where the profile follow NFT address is deployed (if any as lazy loaded)
- profile_interests - any interests the profile has attached
- profile_curated - curated profiles we know great good content to allow our explore curated API to work
- profile_follow_module_details - the follow module details are currently set for the profile
- profile_follow_module_details_history - a change history of follow modules set for the profile
- profile_follow_module_follow_record - a list of follow modules redeemed
- profile_nft_gallery - the profile NFT galleries context
- profile_recommended_dismissed - the profiles that this address is not interested in following
- profile - the main profile
  - is_metadata_processed - is a way to see if the profile metadata the user updated was completed
  - nft\_\* - is if they have an NFT linked to their profile picture

![](https://files.readme.io/a791b91-Untitled_4.png)

### posts, mirrors and comments

Publications are the core heart of LENS. These tables keep all that information up to date.

Please note just because it is in here does not mean it was successful in following metadata standards. For successful publication the `s3_metadata_location` should be defined, the `has_error` should be false and the `is_metadata_processed` should be true. 

Mirrors are in the `profile_post` table if it has an `is_related_to_post` or `is_related_to_comment` then it is a mirror. 

![](https://files.readme.io/eb25641-Untitled.png)

### publication stats

A list of all publication stats.

![](https://files.readme.io/0e171f5-Untitled_1.png)

### protocol state

The protocol state can change. This keeps track of it

![](https://files.readme.io/3623f13-Untitled_2.png)

### publication access control

This holds the LIT access control logic around a publication. If it is pending, the access control has not been applied to a publication yet.

![](https://files.readme.io/0750780-Untitled_3.png)

### publication collect/reference modules

These tables hold the collected and reference module details for a publication. It also holds the records of all the collects which have been done on that publication. 

![](https://files.readme.io/d3db0e6-Untitled_4.png)

### reactions

You can react to publications these table store that state.

![](https://files.readme.io/b69d7aa-Untitled_5.png)

### publication pointer

Maps a publication ID to a publication type.

![](https://files.readme.io/6a5b56a-Untitled_6.png)

### publication tags

These tables hold the publication tags which have been applied 

![](https://files.readme.io/7285284-Untitled_7.png)

### reorg block status

This marks blocks as safe and monitors the reorgs.

![](https://files.readme.io/6770dae-Untitled_8.png)