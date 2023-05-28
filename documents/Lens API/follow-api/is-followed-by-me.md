---
title: "Is followed by me"
slug: "is-followed-by-me"
hidden: false
createdAt: "2022-06-20T16:32:25.762Z"
updatedAt: "2022-06-20T16:33:12.472Z"
---
You need to know if the logged-in user is following the profile it's viewing, to do this you need to look at the `isFollowingByMe` property on the profile response. This is shown in the examples when fetching back a profile. It will always be false if calling when not logged in but when passing in the auth header it will work out if that wallet has is following the profile.

# API Design basic

please note the example below doesn't pick all the content out of the profile it just shows you the field used to get that back.
[block:code]
{
  "codes": [
    {
      "code": "query Profile {\n  profile(request: { profileId: \"0x01\" }) {\n    isFollowedByMe\n  }\n}",
      "language": "javascript",
      "name": "Example operation"
    }
  ]
}
[/block]