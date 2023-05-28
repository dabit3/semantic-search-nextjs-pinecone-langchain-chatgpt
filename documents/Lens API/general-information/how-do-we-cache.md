---
title: "How do we cache?"
slug: "how-do-we-cache"
hidden: false
createdAt: "2022-02-18T10:44:14.715Z"
updatedAt: "2022-03-09T19:24:42.338Z"
---
We use Redis for caching everything. The issue you face with caching with a social media site is that you want data to be broadcasted as fast as possible but you want to also keep the speed impact of getting it. Our cache policy caches the generic data -- that is, if a user queries their timeline, they will always get back the latest stuff because the initial lightweight query of bringing back all the ids but the publication themselves have heavy caching on it. This allows us to still broadcast the latest data as soon as it is available but also have super fast queries for every API endpoint. The busier we are the faster we become. Speed is super important and improving this all the time will be something we constantly keep looking at.