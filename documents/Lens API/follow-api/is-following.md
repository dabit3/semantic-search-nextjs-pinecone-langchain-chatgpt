---
title: "Is following"
slug: "is-following"
hidden: false
createdAt: "2022-06-20T16:34:57.428Z"
updatedAt: "2023-02-23T00:16:45.108Z"
---
You need to know if a user is following another user, to do this you need to look at the `isFollowing` property on the profile response.

This is shown in the examples when fetching back a profile. In the `isFollowing` field resolver you can pass in a `profileId` you wish to know if the owner of this profile is following, most apps would use the logged in users selected profile they are browsing on.

# API design basic

please note the example below doesn't pick all the content out of the profile it just shows you the field used to get that back.

```javascript Example operation
query Profile {
  profile(request: { profileId: "0x01" }) {
    isFollowing(who: "0x08")
  }
}
```



The profile id passed in for `isFollowing` can pass in as a variable easily enough as well. You can imagine passing the logged-in users profile they are browsing on to see if you should render a `follows back` label. This can be hooked in like this for every query which returns a profile type.

```javascript Example operation
query Profile($profileId: ProfileId) {
  profile(request: { profileId: "0x01" }) {
    isFollowing(who: $profileId)
  }
}
```