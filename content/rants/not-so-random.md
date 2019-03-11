---
categories:
- blog
date: 2019-03-10 23:04:08 +0000
tags:
title: Lol, Aren't I So Random?
year: 2019
---
On the surface, randomness seems pretty straight-forward. But it gets messy pretty quick once you try to pin down what it actually _is_. But before we dive down that <a href="#philosophy">philosophical rabbit hole</a>, let us first ask what it is that you actually _want_ from your _randomness_.



### A Bit Too Random
Let's say you're developing a game. For the intro, you want the protagonist to feel absolutely helpless as they're surrounded by a torrent of randomly-placed enemies. Which of these distributions seem to pull that off the best?
<p style="text-align: center"><img src='/imgs/50_random.png' style='display:block; margin: 0 auto;' />
<span style="font-size: x-small;">Hmm, I think I can probably take em.</span></p>

<p style="text-align: center"><img src="/imgs/50_distributed_quasirandom.png" style="display:block; margin: 0 auto;" />
<span style="font-size: x-small;">Welp, it was a good life while it lasted.</span></p>

Both have the same amount of red dots. A truly random distribution _could_ potentially look like the second image, but it's actually much more likely for it to have properties in the first image that seem anti-random to our pattern-seeking minds. How could those red dots cluster up like that? Paradoxically, it would seem that the first distribution is a bit _too random_. Instead, our game is in need of _evenly-distributed quasi-randomness_. 

<p style="text-align: center"><a href="/imgs/quasi_random.gif"><img src="/imgs/quasi_random.gif" style="display:block; margin: 0 auto;" /></a>
<span style="font-size: x-small;">I could watch an evenly-distributed quasi-random number generator all day</span></p>

This is almost _always_ the type of randomness you want, because it seems so random to us. Everything changes once you want it to be random enough for no one to be able to guess the next number it generates.

### A Bit Too Cryptic
<a href="/imgs/illegal_rsa_shirt.jpg"><img src="/imgs/illegal_rsa_shirt.jpg" style="display:block; margin: 0 auto;" /></a>

It used to technically be illegal to wear this shirt outside of the States. The math which we now depend on for logging into our bank accounts and securely processing credit card numbers was thought of as a military weapon. Why is that? It simply ensures that no outside parties can eavesdrop on your confidential conversations. All of the information is _encrypted_, which means it looks like random gibberish in transit. The recipient, however, can _decrypt_ it to reveal what was written. Mankind has been using various sorts of encryption for as long as our written record can remember. It's even found in an <a href="https://en.wikipedia.org/wiki/Mlecchita_vikalpa">ancient Hindu text</a> on sexuality. All is **** in love and war.

<span id="philosophy"></span>
### A Completely Random Bit
True randomness can be derived from an indeterministic system, but we've yet to prove whether such a <a href="https://en.wikipedia.org/wiki/Indeterminism">system can exist</a>. Heisenburg's <a href="https://www.britannica.com/science/uncertainty-principle/media/614029/216617">Uncertainty Principle</a> is probably our best argument for indeterminism. It states that, at the subatomic level, "the more precisely the position of some particle is determined, the less precisely its momentum can be known, and vice versa."<a href="#ref0">[0]</a> Therefore it's impossible for us to know the state of every particle in the universe and "predict" the future. We could perhaps figure out a pretty likely future, but <a href="https://en.wikipedia.org/wiki/Chaos_theory">chaos theory</a> throws a wrench in that plan. The implications of this Uncertainty Principle <a href="https://en.wiktionary.org/wiki/God_does_not_play_dice_with_the_universe">freaked Einstein out</a>. He insisted that quantum mechanics is simply missing a local<a href="#ref1">[1]</a> hidden variable, and upon knowing that variable, we can then accurately predict quantum interactions. But it wasn't long before we hit another <a href="/imgs/epr_paradox.PNG">roadblock</a> with <a href="/imgs/bells_theorem.PNG">Bell's Theorem</a>, whereby no theory with local hidden variables can reproduce quantum mechanic's predictions. There's either something that can <a href="https://en.wikipedia.org/wiki/Tachyon">travel faster than the speed of light</a> to influence these particles, or the underlying laws of the universe are truly indeterministic. I won't be <a href="/writes/wanderlust/">making any bets</a> on the matter.

<span id="ref0">[0]</span> https://en.wikipedia.org/wiki/Uncertainty_principle

<span id="ref1">[1]</span> Local, in this context, means it can only be influenced by its immediate surroundings. Nonlocality scares Einstein, because it means that _something_ can travel faster than the speed of light, breaking the theory of relativity. For more info, look up "Spooky Action At A Distance".