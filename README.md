# Langchain, Pinecone, and GPT with Next.js - Full Stack Starter

This is a basic starter project for building with the following tools and APIs:

- Next.js
- LangchainJS
- Pineceone Vector Database
- GPT3

When I started diving into all of this, I felt while I understood some of the individual pieces, it was hard to piece together everything into a cohesive project. I hope this project is useful for anyone looking to build with this stack, and just needing something to start with.

### What we're building

We are building an app that takes text (text files), embeds them into vectors, stores them into Pinecone, and allows semantic searching of the data.

For anyone wondering what Semantic search is, here is an overview (taken directly from ChatGPT4):

__Semantic search refers to a search approach that understands the user's intent and the contextual meaning of search queries, instead of merely matching keywords.__

__It uses natural language processing and machine learning to interpret the semantics, or meaning, behind queries. This results in more accurate and relevant search results. Semantic search can consider user intent, query context, synonym recognition, and natural language understanding. Its applications range from web search engines to personalized recommendation systems.__

## Running the app

In this section I will walk you through how to deploy and run this app.

### Prerequisites

To run this app, you need the following:

1. An [OpenAI](https://platform.openai.com/) API key
2. [Pinecone](https://app.pinecone.io/) API Key

### Up and running

To run the app locally, follow these steps:

1. Clone this repo

```sh
git clone git@github.com:dabit3/semantic-search-nextjs-pinecone-langchain-chatgpt.git
```

2. Change into the directory and install the dependencies using either NPM or Yarn

3. Copy `.example.env.local` to a new file called `.env.local` and update with your API keys and environment.

    __Be sure your environment is an actual environment given to you by Pinecone, like `us-west4-gcp-free`__

4. (Optional) - Add your own custom text or markdown files into the `/documents` folder.

5. Run the app:

```sh
npm run dev
```

### Need to know

When creating the embeddings and the index, it can take up to 2-4 minutes for the index to fully initialize. There is a settimeout function of 180 seconds in the `utils` that waits for the index to be created.

If the initialization takes longer, then it will fail the first time you try to create the embeddings. If this happens, visit [the Pinecone console](https://app.pinecone.io/) to watch and wait for the status of your index being created to finish, then run the function again.

### Running a query

__The pre-configured app data is about the [Lens protocol developer documentation](https://docs.lens.xyz/docs/overview), so it will only understand questions about it unless you replace it with your own data. Here are a couple of questions you might ask it with the default data__

1. What is the difference between Lens and traditional social platforms
2. What is the difference between the Lens SDK and the Lens API
3. How to query Lens data in bulk?

> The base of this project was guided by [this Node.js tutorial](https://www.youtube.com/watch?v=CF5buEVrYwo), with some restructuring and ported over to Next.js. You can also follow them [here](https://twitter.com/Dev__Digest/status/1656744114409406467) on Twitter!

### Getting your data

I recommend checking out [GPT Repository Loader](https://github.com/mpoon/gpt-repository-loader) which makes it simple to turn any GitHub repo into a text format, preserving the structure of the files and file contents, making it easy to chop up and save into pinecone using my codebase.