---
categories:
- projects
date: 2020-09-24 23:04:08 +0000
tags:
- coding
title: Current Projects
year: 2020

---
It's easy to work on a side-project for months. It's hard to spend a few evenings writing a blog post about it. To help remedy this, I'll be letting this page serve as a running list of all the projects I've toiled away at.

## In Progress

**[Visions](https://visions.silentsilas.com)**: This might sound weird, but this experiment first began as an anime review site. My original plan was to come up with an intuitive yet creative way to navigate a site. It instead turned into a pretty nifty solar system simulation. I'm currently figuring out how to offload the physics to the GPU so that I can render thousands of planets/stars with gravity and collision to roughly simulate a universe. 

**[Intended](https://intended.link)**: This was my senior project for college. It's essentially a secure yet easy way to send sensitive information to someone else without either of you needing to sign up for Yet Another Service™. You'd enter in the secret information, choose an online service you know they use (Perhaps Twitter, Gmail, etc), and enter their username/email for that service. Intended then generates a link that you can safely post _anywhere_. Only someone with access to the account you specified can open the link and decrypt the data.

I'll actually be writing up a full blog post about it once I complete more of its features. Specifically, implementing more online services to choose from, and fixing some of the bugginess with file uploads.

## Completed

**[Privy](https://play.google.com/store/apps/details?id=com.silentsilas.pr1vy)**: This one actually has its own dedicated blog post! It's essentially an educational crypto-toolkit. You can generate passwords, hash files, and create an RSA public key. All while going through all of the steps in a (hopefully) easy-to-understand manner. You can read more about it [here](/works/pr1vy).

**[Syborg](https://play.google.com/store/apps/details?id=com.silentsilas.syborg)**: This one is always difficult to explain. It's the whackiest thing I've built. I first had a bunch of business cards printed. One side has a stylized S symbol. The other simply has a QR code with the text "Follow me." underneath. Upon scanning the QR code with your phone, you're directed to a page to learn what this is, along with a link to the app in the Play Store (and hopefully App Store at some point). 

Once the app is installed, you're able to scan the S symbol on the business card to have a 3D model of my head appear out of it. From here, you can either talk to the head to send me a text via speech-to-text, or tap a button to listen to a poem. This poem changes once every day. It is machine generated via GPT-2, trained on all of my writings.

**[Smash](https://smash.silentsilas.com)**: We had a bunch of really nice & accurate 3D models of all of our heads. I knew something quirky could be done with them. The first idea that came to my noggin was "Smash Mouth." An experience where you smash our heads open as Smash Mouth plays in the background. I couldn't handle hearing the song more than a few times, so it quickly pivoted to using much more palatable music, and focused on changing the lighting in reaction to the songs' highs.

## Self Hosted

There are a handful of services I run under the silentsilas.com domain. There are a lot of sites out there who keep their source code open, and actively encourage other developers to host their own version of the site themselves. I like to do that for ones I find useful, or ones I use that handle sensitive information that I'd prefer to have processed on servers I control.

**[SilentBin](https://bin.silentsilas.com)**: "a minimalist, open source online pastebin where the server has zero knowledge of pasted data. Data is encrypted/decrypted in the browser." - original [project page](https://privatebin.info/).

**[File](https://file.silentsilas.com)**: A really barebones file uploader that generates a simple share url, with automatic file expiration. - original [project page](https://github.com/Rouji/single_php_filehost)

**[Bibliogram](https://gram.silentsilas.com)**: I quit Facebook/Instagram a while back, but I began to miss the posts of my favorite artists & friends. Bibliogram lets you create an RSS feed of any Instagram user, and self-hosting ensures you don't hit Instagram's API rate limit. - original [project page](https://bibliogram.art/)

**[Shuri](https://github.com/pips-/shuri)**: A very barebones URL shortener. It doesn't track clicks or anything of the like. I don't trust any of the URL shortening services out there, so I spun this up. - original [project page](https://github.com/pips-/shuri)