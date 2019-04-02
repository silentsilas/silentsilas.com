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
And so back to the military we go! One of the oldest and most commonly-known methods of encryption is called the <a href="https://www.xarg.org/tools/caesar-cipher/">Caesar Cipher</a>, named after Julius Caesar, who apparently used it for military matters. It was likely that his enemies were illiterate or would think his gibberish was a foreign language, so it was secure enough. Otherwise, it takes only 25 tries to guess the message correctly if you knew the methodology. Essentially, you'd choose a number, and then offset every letter in your message by that number. So if you chose 3, then all A's would become D's, all B's would become E's, and so on. Not only was it easy to figure out the number you offset everything by, but just like most other old-school ciphers, it quickly breaks under frequency analysis: some letters are used much more often than others in the English language, and some letters are much more likely to be found before/after certain letters (like 'u' following a 'q'). So once you see that the gibberish has a lot of H's and S's, you could try swapping those with perhaps A's, E's, or T's, and figure out the rest from there.

<p style="text-align: center"><img src="/imgs/frequency_analysis.svg" style="display:block; margin: 0 auto; background:#efefef;" />
<span style="font-size: x-small;">After reading this, your mind will notice how many e's are in this article.</span></p>

We didn't really get too fancy with encryption until we could build machines to automate it all for us. Encryption was simply a lot of scrambling of words/letters, and making sure your recipient knows the trick to undo those operations. This then brings us to the legendary <a href="https://en.wikipedia.org/wiki/Enigma_machine">Enigma Machine</a>, whose algorithm was first broken only due to operational errors, and was used with great success by Nazi Germany in WWII. Up until the era of the Enigma, cracking ciphers required mainly only linguistic and literary prowess. These machines and their increasingly complex algorithms took us deep into the mathematical realm as they resisted our older methods of <a href="https://en.wikipedia.org/wiki/Cryptanalysis">cryptanalysis</a>, like the aforementioned frequency analysis. This developed into a theory called <a href="https://en.wikipedia.org/wiki/Confusion_and_diffusion">Confusion and Diffusion</a> which details the two properties ciphers must have to be impervious to pure cryptanalysis. It should be noted that we're still using the same techniques of scrambling & substituting letters like in Ye Olden Days - machinery simply allows us to do many more complex patterns without too much work on the recipient's end to undo it.

### Speak 'Friend', Press Enter
Which finally brings us back to that t-shirt I showed you earlier! Basically, some smart dudes in the late 70's came up with the <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)">RSA algorithm</a>. Its security is based on the fact that it's really difficult to figure out <a href="https://en.wikipedia.org/wiki/Factoring_problem">what two numbers constitute a very large composite number</a>.

<p style="text-align: center"><img src="/imgs/rsa_algorithm.jpg" style="display:block; margin: 0 auto;" />
<span style="font-size: x-small;">Don't worry if this looks confusing. Just know that RSA's got maths.</span></p>

This algorithm gives you a public key which you can show to everyone, and then a private key which you keep only to yourself. Now if you wanted to talk to your homie Rivest, you'd look for his public key and use it to encrypt your message to him. Rivest then receives this encrypted message, and thanks to some unique mathematical properties of RSA, his private key is able to decrypt your message!

With sufficiently large RSA keys, it takes literally thousands of years for computers to crack it<a href="#ref2">[2]</a>. It's not just how long it takes to crack an RSA key that makes it so groundbreaking; we've had things like the <a href="https://en.wikipedia.org/wiki/One-time_pad">One-Time Pad</a>, which is truly uncrackable. No, it's the fact that you don't need to give your intended recipient a key beforehand. Imagine that your public key is essentially your house address, and everyone on the planet can now talk to you with complete security by simply looking you up on Yellow Pages.

## Cracking The Code
Let's take a quick look at the math that makes RSA so difficult to crack. The first thing you need to know is the concept of _Entropy_. If you search for the term, you'll probably get a lot of physics-related results; but it plays a huge role in the field of cryptography as well. In physics terms, entropy is how chaotic a given system is. i.e., an event is considered to have _0 bits of entropy_ if there's no chaos; we're absolutely certain of what's going to happen next. Conversely, an event is considered to have _1 bit of entropy_ if we're 50% certain of what's going to happen next, like whether a coin will land heads or tails.

<p style="text-align: center"><img src="/imgs/entropy_alg.png" style="display:block; margin: 0 auto;" />
<span style="font-size: x-small;">Don't worry 'bout why we use this algorithm. Programmers and computers just like 1's and 0's.</span></p>

So let's say you're trying to figure out someone's password. You know it has uppercase, lowercase, and decimal characters. This means that one character in their password could be in 1 of 62 possible states (26 uppercase + 26 lowercase + 10 digits). You'd plug that number in our handy-dancy algorithm, and we get ~5.95 bits of entropy. Now let's say that you know this person's password is exactly 10 characters long. We can multiply the entropy of one character (~5.95) by the length of the password (10) to get us ~59.5 bits of entropy. 

The importance of this number is that it allows us to easily figure out how crackable this password is. Let's check that number against this chart:

<p style="text-align: center"><a href="https://i.imgur.com/e3mGIFY.png"><img src="https://i.imgur.com/e3mGIFY.png" style="display:block; margin: 0 auto;" /></a>
<span style="font-size: x-small;">We're under the UPPER + lower + 0-9 column. Scroll down to 10 for our password length. Now to the right, you can see how much time it takes to crack, on average, depending on how many guesses the attacker can make per second.</span></p>

So if you can make 100 billion guesses per second, then on average, you can crack this password in somewhere between 33 days and 4.4 months. That's not too shabby. If you have access to the database <a href="https://haveibeenpwned.com/">(which is much more common than one might think)</a>, and they didn't use a good hashing algorithm to slow you down, then your target doesn't have much time to change their password before you can get into their account. Not only that, but people are prone to re-use passwords, so you can likely try your newly obtained username & password on different services your target might be using. Great work, black hat!

Now let's make more sense of these numbers. This 10 character password of ours could be in 1 of 839,299,365,868,340,200 possible states (i.e., 62 possible states per character, raised to the power of 10 for our password length). This means that, on average, you will need to try about half of those possibilities before you finally stumble across the correct one<a href="#ref3">[3]</a>. If you have a handful of Nvidia GTX 1080 GPU's working on the same password, then <a href="https://gist.github.com/epixoip/a83d38f412b4737e99bbef804a270c40">it can be cracked pretty much instantaneously</a> (with exceptions for databases using <a href="https://auth0.com/blog/hashing-in-action-understanding-bcrypt/">newer hashing algorithms specifically designed to thwart the parallelization of GPUs</a>).

To put RSA into perspective, data encrypted with 1024-bit RSA can be in 1 of ~3.2317 × 10^309 possible states. It took two years for researchers with many, many computers to <a href="https://thehackernews.com/2017/07/gnupg-libgcrypt-rsa-encryption.html">crack one of those keys</a>. For the curious, you can try out <a href="https://test.silentsilas.com/passgen/">my password generator</a> to interactively test the cracking speeds of various lengths/types of passwords. If it took a team of researchers two years to crack 1024 bits of entropy, imagine how fast you could crack it if you had the power of Big Brother in your hands!

### Randomness Is Tricky
Alright, so all this encryption stuff is cool and all. But let's tie this back in to the concept of randomness. You see, to generate keys for RSA and the like, we need to feed the key-generating algorithms strings of "randomness". It doesn't matter if you have 1024bit RSA keys if your attacker knows you always use the same numbers to generate them. In the real world, using a flawed number generator to produce keys will result in the encrypted data to not be as random as it should be; attackers can predict the output because the number generator has a few patterns that the attackers have picked up on.

And so to be a <a href="https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator">cryptographically-secure random number generator</a>, it only needs two properties: 

<span style="font-size: large; font-weight: bold;">Uniformity</span> - each number is equally-probably to appear next. It's not more likely for a "7" to appear next compared to a "4", for instance.

<span style="font-size: large; font-weight: bold;">Independence</span> - Each number generated tells you nothing about any previous or future values. If a "7" appears, then that shouldn't mean there was definitely a "4" before it, or a non "7" number after it.

To determine if your number generator has these two properties, you run it through what is called the <a href="https://en.wikipedia.org/wiki/Next-bit_test">Next-Bit Test</a>. You'd have your number generator spit out 1's and 0's (which is what we call bits). If an attacker knows every bit that you've generated, it passes the test if they can't determine the next bit it generates without more than 50% accuracy. They should be wrong about half the time on whether it spits out a 1 or 0.

<p style="text-align: center"><img src="/imgs/take_your_bets.png" style="display:block; margin: 0 auto;" />
<span style="font-size: x-small;">My money is on 1; 0 hasn't been doing too well this season.</span></p>

Ideally, you wouldn't want your source of randomness to come from a number generator at all. If the attacker knows your algorithm, and <a href="https://en.wikipedia.org/wiki/Random_seed">which values you first inputted into that algorithm</a>, then they can determine _every single number it generates_. Instead, you'd want to rely on getting your random values from chaotic systems outside of the computer. This could be the noise generated by the fan, your exact mouse movements, the times at which you press certain keys, and so on. It's hard to get tons of random values from these sources, since they're limited by time. So in the real world, we use a hybrid method to generate keys. First you get "truly random" numbers from outside the computer, and then use those numbers to initialize your number generator. This way, it's very difficult for an attacker to know which values you started with, and you're free to generate as much randomness as your transistors desire.

<span id="philosophy"></span>
### A Completely Random Bit
I could go on and on about randomness. Hopefully it's apparent that we need separate words for the different types of "random" that we use in life. In fact, all of the randomness I've spoken about thus far are technically "quasi-random." They're simply larger and larger levels of complexity. There's no such thing as truly "random," at least for anything we'll come across in our day-to-day lives. I'm not a physicist, but the following is my current understanding of how quantum mechanics plays into the matter.

True randomness can be derived from an indeterministic system, but we've yet to prove whether such a <a href="https://en.wikipedia.org/wiki/Indeterminism">system can exist</a>. Heisenburg's <a href="https://www.britannica.com/science/uncertainty-principle/media/614029/216617">Uncertainty Principle</a> is probably our best argument that quantum mechanics is an indeterministic system. It states that, at the subatomic level, "the more precisely the position of some particle is determined, the less precisely its momentum can be known, and vice versa."<a href="#ref4">[4]</a> Therefore it's impossible for us to know the state of every particle in the universe and "predict" the future. We could perhaps figure out a pretty likely future, but <a href="https://en.wikipedia.org/wiki/Chaos_theory">chaos theory</a> throws a wrench in that plan. The implications of this Uncertainty Principle <a href="https://en.wiktionary.org/wiki/God_does_not_play_dice_with_the_universe">freaked Einstein out</a>. He insisted that quantum mechanics is simply missing a local<a href="#ref5">[5]</a> hidden variable, and upon knowing that variable, we can then accurately predict quantum interactions. But it wasn't long before we hit another <a href="/imgs/epr_paradox.PNG">roadblock</a> with <a href="/imgs/bells_theorem.PNG">Bell's Theorem</a>, whereby no theory with local hidden variables can reproduce quantum mechanic's predictions. This means there's either something that can <a href="https://en.wikipedia.org/wiki/Tachyon">travel faster than the speed of light</a> to influence these particles, or the underlying laws of the universe are truly indeterministic. I won't be <a href="/writes/wanderlust/">making any bets</a> on the matter. But in the meantime, we're good to use quantum (radioactive decay in particular) to generate random bits so long as it's undetermined whether quantum mechanics is indeterministic.

## Footnotes

<span id="ref0">[0]</span> <a href="https://www.expunctis.com/2019/03/07/Not-so-random.html">This interactive site</a> has you repeatedly press left or right, while the computer guesses what moves you make. There's also a button to have a pseudo-random algorithm choose for you, and it will assuredly fare better than you (unless you really know your math and feed it a <a href="https://en.wikipedia.org/wiki/De_Bruijn_sequence">6-gram De Bruijn sequence</a>)

<span id="ref1">[1]</span> You can even find encryption tips in an <a href="https://en.wikipedia.org/wiki/Mlecchita_vikalpa">ancient Hindu text</a> on sexuality. It seems that all is **** in love and war.

<span id="ref2">[2]</span> It should be noted that it's still unproven whether RSA's math is truly difficult to solve. Any day now, someone may come up with a mathemetical technique to quickly factor large numbers. Or we may develop a quantum computer with enough qubits to blow through every possible solution in a moment.

<span id="ref3">[3]</span> If you're doubtful that anyone is out there trying to crack your password in particular, then let <a href="https://hashes.org/leaks.php">this site</a> be a sobering wake-up call; It's an entire community dedicated to cracking passwords from database leaks, including the most recent & legendary <a href="https://www.troyhunt.com/the-773-million-record-collection-1-data-reach/">Collection #1</a> leak. It's very, very likely that you have credentials in one of these leaks. You can see for yourself with Troy Hunt's <a href="https://haveibeenpwned.com/">Have I Been Pwned</a> service. It's a safe site; Troy Hunt is a well-known security researcher, and this service of his is built-in to the amazing 1Password app.

<span id="ref4">[4]</span> <a href="https://en.wikipedia.org/wiki/Uncertainty_principle">The Uncertainty Principle</a> - Should also be noted that this differs from the <a href="https://en.wikipedia.org/wiki/Observer_effect_(physics)">Observer Effect</a>, wherein the act of observation disturbs the state of the particle (since the light we must use to observe the state interacts with it). Heisenburg himself originally thought his Uncertainty Principle was the mathematical explanation of the observer effect, but it's actually a mathematical explanation of how much information can be gleaned from the particle-wave duality, which we can now experientially test.

<span id="ref5">[5]</span> Local, in this context, means it can only be influenced by its immediate surroundings. Nonlocality scares Einstein, because it means that _something_ can travel faster than the speed of light, breaking the theory of relativity. For more info, look up "Spooky Action At A Distance".