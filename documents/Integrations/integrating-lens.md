---
title: "Embeds and custom links"
slug: "integrating-lens"
hidden: false
createdAt: "2023-01-12T20:55:32.629Z"
updatedAt: "2023-02-26T16:44:36.176Z"
---
In addition to building applications directly on Lens, you may want to integrate Lens into other new or existing applications. Lens Protocol provides a variety of social features, including profiles, content, comments, and monetization, which can be easily integrated. With our API, you can quickly access a large user base and generate network effects with less effort.

You can do this by providing features like **sharing** to Lens, **following** on Lens, or **signing in **with Lens in your application.

## Share to Lens

**Share to Lens** can help distributing your application and its content to a larger audience. You can create a "Share to Lens" button easily via [Lenster](https://lenster.xyz/) using HTML.

```
https://lenster.xyz/?text=Hello%20World!
```



The following url parameters are supported:

```
text
url
via
hashtags
```



So for example, let's say we have an app called "MyCoolApp" and we wanted to share some content from it to Lens, we could format a URL that looks like this:

```
https://lenster.xyz/?text=Hello%20World!&url=https://mycoolapp.xyz&via=MyCoolApp&hashtags=lens,web3
```



We would get the following share modal on Lenster:

![](https://files.readme.io/4e4d25f-Screen_Shot_2023-01-12_at_4.24.20_PM.png)

### Video tutorial - share to Lens


[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FlUJs63xILR8%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DlUJs63xILR8&key=7788cb384c9f4d5dbbdbeffd9fe4b92f&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.youtube.com/watch?v=lUJs63xILR8",
  "title": "How to integrate a Share to Lens button into your web application",
  "favicon": "https://www.google.com/favicon.ico",
  "provider": "youtube.com",
  "href": "https://www.youtube.com/watch?v=lUJs63xILR8",
  "typeOfEmbed": "youtube"
}
[/block]




## Follow on Lens

Follow on Lens enables your app to display social connections. If you want to include a follow intent button on your website / web app, it’s super simple!

Just copy/paste the code snippets from below and replace handle with the handle you want the button intent to follow.

You can theme it with your own app color, or use our default color.

```html
<!-- add the lens-follow-large class name for the large button -->
<!-- add the lens-follow-icon class name for the icon button -->
<span
  id="lens-follow-small"
  data-handle="yourhandle" 
/>

<!-- Include the JavaScript and CSS -->
<link rel="stylesheet" href="https://lens.xyz/widget-styles.css" />
<script async src="https://lens.xyz/widget.js"></script>
```



### Visual example (follow on Lens)

![](https://files.readme.io/1434b9f-Screen_Shot_2023-01-12_at_4.38.00_PM.png)

### Video tutorial - Follow on Lens


[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Ft2DbwnBqqhs%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dt2DbwnBqqhs&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2Ft2DbwnBqqhs%2Fhqdefault.jpg&key=7788cb384c9f4d5dbbdbeffd9fe4b92f&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.youtube.com/watch?v=t2DbwnBqqhs",
  "title": "How to integrate a Follow On Lens button into your web application",
  "favicon": "https://www.google.com/favicon.ico",
  "image": "https://i.ytimg.com/vi/t2DbwnBqqhs/hqdefault.jpg",
  "provider": "youtube.com",
  "href": "https://www.youtube.com/watch?v=t2DbwnBqqhs",
  "typeOfEmbed": "youtube"
}
[/block]




## Sign in with Lens

**Sign to Lens** lets you access user's information, such as name, bio, social URLs, pictures, interests, reputation, and activity.

If you want to include a “Sign in with Lens” button in your web app to connect a wallet that contains a Lens profile, you can use the code below.

You will have to connect it to your Web3 provider yourself - this is just a dummy themed button. 

```html
<!-- add the lens-signin-large classname for the large button -->
<span 
  id="lens-signin-small"
  data-click="console.log('connector integration')"
/>

<!-- Include the JavaScript and CSS -->
<link rel="stylesheet" href="https://lens.xyz/widget-styles.css" />
<script async src="https://lens.xyz/widget.js"></script>
```



### Visual example (Sign in with Lens)

![](https://files.readme.io/4c77635-Screen_Shot_2023-01-12_at_4.41.15_PM.png)