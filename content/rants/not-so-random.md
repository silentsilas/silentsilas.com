---
categories:
- blog
date: 2019-03-10 23:04:08 +0000
tags:
title: Lol, Aren't I So Random?
year: 2019
---
How random do you think you are?<a href="#ref0">[0]</a>

On the surface, randomness seems pretty straight-forward. But it gets messy pretty quick once you try to pin down what it actually _is_. But before we dive down that <a href="#philosophy">philosophical rabbit hole</a>, let us first take a gander at this little t-shirt:

<a href="/imgs/illegal_rsa_shirt.jpg"><img src="/imgs/illegal_rsa_shirt.jpg" style="display:block; margin: 0 auto;" /></a>

### A Bit Too Cryptic

It used to be illegal to wear this shirt outside of the States. The math which we now depend on for logging into our bank accounts and securely processing credit card numbers was thought of as a military weapon. Why is that? Simply because it ensures that no outside parties can eavesdrop on your conversations. All of the information is _encrypted_, which means it looks like random gibberish in transit. The recipient, however, can _decrypt_ it to reveal what was written. 

<p style="text-align: center"><img src='/imgs/cryption_graph.png' style='display:block; margin: 0 auto;' /><span style="font-size: x-small;">A real-world example of military-grade encryption put to good use.</span></p>

The usefulness of such technology in a military setting should be obvious. Conversely, it is obviously in our militant government's best interests that only they can use this technology - everyone else, both citizen and enemy, should ideally not have the ability to encrypt their messages. This way their communications can be intercepted, and any espionage may be thwarted. None of this technology is new; mankind has been utilizing encryption for as long as our written record can remember<a href="#ref1">[1]</a>. The only difference with the situation today is that our communications are nearly instantaneous, and the encryption is much tougher to break.

### A Bit Too Random
Alright, so maybe all of that is going a bit overboard. Let's say we're just developing a game. For the intro scene, you want the protagonist to feel absolutely helpless as she's surrounded by a torrent of randomly-placed enemies. Which of these distributions seem to pull that off the best?
<p style="text-align: center"><img src='/imgs/50_random.png' style='display:block; margin: 0 auto;' />
<span style="font-size: x-small;">Hmm, I think I can probably take em.</span></p>

<p style="text-align: center"><img src="/imgs/50_distributed_quasirandom.png" style="display:block; margin: 0 auto;" />
<span style="font-size: x-small;">Welp, it was a good life while it lasted.</span></p>

Both have the same amount of red dots. A truly random distribution _could_ potentially look like the second image, but it's actually much more likely for it to have properties in the first image that seem anti-random to our pattern-seeking minds. How could those red dots cluster up like that? Paradoxically, it would seem that the first distribution is a bit _too random_. Instead, our game is in need of _evenly-distributed quasi-randomness_. 

<p style="text-align: center"><a href="/imgs/quasi_random.gif"><img src="/imgs/quasi_random.gif" style="display:block; margin: 0 auto;" /></a>
<span style="font-size: x-small;">I could watch an evenly-distributed quasi-random number generator all day</span></p>

This is almost _always_ the type of randomness you want, because it just seems so random to us. You're in a completely different ballgame, however, once you want your number generator to be so random, that no one is able to guess the next number it generates, _even if_ they already know every number its generated thus far. You probably have money or lives at stake here.

### Bits Byte Back
And so back to the military we go! One of the oldest and most commonly-known methods of encryption is called the <a href="https://www.xarg.org/tools/caesar-cipher/">Caesar Cipher</a>, named after Julius Caesar, who apparently used it for military matters. It was likely that his enemies were illiterate or would think his gibberish was a foreign language, so it was secure enough. Otherwise, it takes only 25 tries to guess the message correctly if you knew how it was encrypted. And just like most other old-school ciphers, it quickly breaks under frequency analysis: some letters are used much more often than others in the English language, and some letters are much more likely to be found before/after certain letters (like 'u' following a 'q').

<p style="text-align: center"><img src="/imgs/frequency_analysis.svg" style="display:block; margin: 0 auto; background:#efefef;" />
<span style="font-size: x-small;">After reading this, your mind will notice how many e's are in this article.</span></p>

We didn't really get too fancy with encryption until we could build machines to automate it all for us. This brings us to the legendary <a href="https://en.wikipedia.org/wiki/Enigma_machine">Enigma Machine</a>, whose algorithm was first broken only due to operational errors, and was used with great success by Nazi Germany in WWII. Up until the era of the Enigma, cracking ciphers required mainly only literary prowess. These machines and their increasingly complex algorithms took us deep into the mathematical realm. A theory was developed, called <a href="https://en.wikipedia.org/wiki/Confusion_and_diffusion">Confusion and Diffusion</a> which detail the two properties ciphers must have to not be cracked.

### Speak 'Friend', Press Enter
We're finally back to that shirt I showed you earlier! Basically, some smart dudes in the late 70's came up with the <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)">RSA algorithm</a>. Its security is based on the fact that it's really difficult to figure out <a href="https://en.wikipedia.org/wiki/Factoring_problem">what two numbers constitute a very large composite number</a>.

<p style="text-align: center"><img src="/imgs/rsa_algorithm.jpg" style="display:block; margin: 0 auto;" />
<span style="font-size: x-small;">Don't worry if this looks confusing. Just know that RSA's got maths.</span></p>

This algorithm gives you a public key which you can show to everyone, and then a private key which you keep only to yourself. Now if you wanted to talk to your homie Rivest, you'd look for his public key and use it to encrypt your message to him. Rivest then receives this encrypted message, and thanks to all that RSA math, his private key is able to decrypt this message. 

It's now impossible for any eavesdroppers to figure anything out. With sufficiently large RSA keys, it takes literally thousands of years for computers to crack it<a href="#ref2">[2]</a>. It's not just how long it takes to crack an RSA key that makes it so groundbreaking; we've had things like the <a href="https://en.wikipedia.org/wiki/One-time_pad">One-Time Pad</a>, which are truly uncrackable. No, it's the fact that you don't need to give your intended recipient a key beforehand. Imagine that your public key is essentially your house address, and everyone on the planet can now talk to you with complete security by looking you up on Yellow Pages.

<span id="philosophy"></span>
### A Completely Random Bit
I could go on and on about randomness. Hopefully it's apparent that we need separate words for the different types of "random" that we use in life. In fact, all of the randomness I've spoken of thus far are "quasi-random." They're simply larger and larger levels of complexity. There's no such thing as truly "random," at least for anything we'll come across in our day-to-day lives.

True randomness can be derived from an indeterministic system, but we've yet to prove whether such a <a href="https://en.wikipedia.org/wiki/Indeterminism">system can exist</a>. Heisenburg's <a href="https://www.britannica.com/science/uncertainty-principle/media/614029/216617">Uncertainty Principle</a> is probably our best argument that quantum mechanics is an indeterministic system. It states that, at the subatomic level, "the more precisely the position of some particle is determined, the less precisely its momentum can be known, and vice versa."<a href="#ref3">[3]</a> Therefore it's impossible for us to know the state of every particle in the universe and "predict" the future. We could perhaps figure out a pretty likely future, but <a href="https://en.wikipedia.org/wiki/Chaos_theory">chaos theory</a> throws a wrench in that plan. The implications of this Uncertainty Principle <a href="https://en.wiktionary.org/wiki/God_does_not_play_dice_with_the_universe">freaked Einstein out</a>. He insisted that quantum mechanics is simply missing a local<a href="#ref4">[4]</a> hidden variable, and upon knowing that variable, we can then accurately predict quantum interactions. But it wasn't long before we hit another <a href="/imgs/epr_paradox.PNG">roadblock</a> with <a href="/imgs/bells_theorem.PNG">Bell's Theorem</a>, whereby no theory with local hidden variables can reproduce quantum mechanic's predictions. This means there's either something that can <a href="https://en.wikipedia.org/wiki/Tachyon">travel faster than the speed of light</a> to influence these particles, or the underlying laws of the universe are truly indeterministic. I won't be <a href="/writes/wanderlust/">making any bets</a> on the matter. But in the meantime, we're good to use quantum to generate random bits so long as it's undetermined whether quantum mechanics is indeterministic.

## Footnotes

<span id="ref0">[0]</span> <a href="https://www.expunctis.com/2019/03/07/Not-so-random.html">This interactive site</a> has you repeatedly press left or right, while the computer guesses what moves you make. There's also a button to have a pseudo-random algorithm choose for you, and it will assuredly fare better than you (unless you really know your math and feed it a <a href="https://en.wikipedia.org/wiki/De_Bruijn_sequence">6-gram De Bruijn sequence</a>)

<span id="ref1">[1]</span> You can even find encryption tips in an <a href="https://en.wikipedia.org/wiki/Mlecchita_vikalpa">ancient Hindu text</a> on sexuality. It seems that all is **** in love and war.

<span id="ref2">[2]</span> It should be noted that it's still unproven whether RSA's math is truly difficult to solve. Any day now, someone may come up with a mathemetical technique to quickly factor large numbers. Or we may develop a quantum computer with enough qubits to blow through every possible solution in a moment.

<span id="ref3">[3]</span> https://en.wikipedia.org/wiki/Uncertainty_principle - Should also be noted that this differs from the <a href="https://en.wikipedia.org/wiki/Observer_effect_(physics)">Observer Effect</a>, wherein the act of observation disturbs the state of the particle (since the light we must use to observe the state interacts with it). Heisenburg himself originally thought his Uncertainty Principle was the mathematical explanation of the observer effect, but it's actually a mathematical explanation of how much information can be gleaned from the particle-wave duality, which we can now experientially test.

<span id="ref4">[4]</span> Local, in this context, means it can only be influenced by its immediate surroundings. Nonlocality scares Einstein, because it means that _something_ can travel faster than the speed of light, breaking the theory of relativity. For more info, look up "Spooky Action At A Distance".