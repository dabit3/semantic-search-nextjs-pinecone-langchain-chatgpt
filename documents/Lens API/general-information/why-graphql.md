---
title: "Why GraphQL?"
slug: "why-graphql"
hidden: false
createdAt: "2022-02-18T10:44:48.797Z"
updatedAt: "2022-03-09T13:54:50.621Z"
---
There are several major reasons we have decided to use GraphQL over a REST architecture: 

# Strongly-typed schema

All the types (such as Boolean, String, Int, Float, ID, Scalar) supported by the API are specified in the schema in GraphQL Schema Definition Language (SDL), which helps determine the data that is available and the form it exists in. This, consequently, makes GraphQL less error-prone, and more validated, and provides auto-completion for supported IDE/editors. With a protocol that holds a lot of complexity, this really empowers the developer to understand the protocol just by looking at the schema which is super powerful.

# Saves Time and Bandwidth

GraphQL allows making multiple resources request in a single query call, which saves a lot of time and bandwidth by reducing the number of network round trips to the server. It also helps to save waterfall network requests, where you need to resolve dependent resources on previous requests

# Versioning Is Not Required

In REST architecture, developers create new versions (e.g., api.domain.com/v1/, api.domain.com/v2/) due to changes in resources or the request/response structure of the resources over time. Hence, maintaining versions is a common practice. With GraphQL, there is no need to maintain versions. The resource URL or address remains the same. You can add new fields and deprecate older fields. This approach is intuitive as the client receives a deprecation warning when querying a deprecated field.

# No Over-Fetching or Under-Fetching

With GraphQL, developers can fetch only what is required. Nothing less, nothing more. This solves the issues that arise due to over-fetching and under-fetching. You define how big your payload response should be!

# The blockchain space people are used to GraphQL APIs

The main reason is that we know the community use subgraphs on The Graph a lot and know how the syntax works so we think it will not be a learning curve at all for a lot of people who want to build on top of lens. 

We have loads and loads more reasons but yeah we love `GraphQL` and works perfectly for our need here.