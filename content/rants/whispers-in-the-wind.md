---
categories:
- blog
date: 2018-08-06 23:04:08 +0000
tags:
- Privacy
- Surveillance State
title: Whispers in the Wind
year: 2018
---
<div id="fingerprint" style="font-size: xx-small; padding-bottom: 20px;">
</div>
The information above is just a small snippet of your browser's fingerprint. It's the data that websites can collect about the device you're using. (They're also able to <span id="geolocation" style="color: #3cdc3c;cursor: pointer;">access your GPS</span> if you're silly enough to let them.)

At first glance, the data looks pretty innocuous. Who cares if people know what browser you're using, or what plugins you've installed? Is it the end of the world if they know that you're a Mac user?

Well, individually, the data *is* indeed innocuous. The original purpose in giving site owners this information is so that they can adapt their application to better suit the device it's run on. My homepage animations, for instance, adapt to the size of the screen and whether it's run on a mobile or desktop device.

#### United, We Stand. Divided, Unknown.

Once you put all of the information together, however, there's a potential for misuse. It's very easy to be the only person on the digital planet running that exact version of browser, on that exact OS, with those exact plugins/fonts installed, and so on.

Using this information, it's possible to <span id="uuid" style="color: #3cdc3c; cursor:pointer; overflow-wrap: break-word;">derive a Unique User Identification Number</span>{{< article_footer footer_content="[0]" >}}. 

You'll first see if your advertisement network already has this identification number. If they do, then that means that they have a list of sites the user has visited, amongst other data that they've figured out about them. You'll then use this personal information to display an advertisment that the user is more likely to be interested in.

On the plus side, however, this sort of tracking can also be used to flag suspicious activity with your online accounts. I'm sure you've encountered sites that require you to click a link in your email to verify that a new device was indeed you. This is a great and highly effective service to thwart malicious login attempts.

But it's hard to know what goes on behind the curtains. Those sites providing the security services could also be using that information in other ways. The EU's <a href="https://www.eugdpr.org/">GDPR</a> is supposed to demand companies to be transparent about what's done with this identifiable data, but it's difficult to enforce and easy to evade.

{{< article_footer footer_content="[0]: You put all the information together and run it through a 'hashing algorithm'. The same information will always result in the same string of numbers and letters. A slight change in this information (like if the user updates their browser) will result in a vastly different string, so additional work has to be done for this tracking to be effective." >}}