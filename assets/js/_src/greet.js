import TweenLite from './gsap/TweenLite'
import './gsap/TimelineLite'
import './gsap/CSSPlugin'

const shuffleArray = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

var greetingTime = 3;
var greetings = shuffleArray([
    "Silence is golden.",
    "Aloha!",
    "Speak 'friend'; press Enter.",
    "Love is a lifestyle.",
    "I am a simulation.",
    "As my keyboard gently clicks.",
    "Shalom!",
    "Peace!",
    "What is happening, my good friend? This is a serious inquiry.",
    "The revolution will not be centralized.",
    "My real name is f26c347c5a820bbf90e6e67bb35d7720",
    "I wish to experience this 'IRL' phenomenon",
    "In my wildest dreams, I delete my backups and dive deep into the dark web.",
    "My bitcoin brings all the droids to the yard.",
    "Real men quit without saving.",
    "You don't wanna know the timestamp for this message.",
    "When you say 'random', you're actually wanting a uniform distribution.",
    "Sorry. You don't actually know what 'random' is.",
    "I've torrented countless cars.",
    "My free speech can beat up your free speech.",
    "My truth can beat up your truth.",
    "You know what they say about big logos.",
    "I'll probably remain just as socially awkward once I inevitably attain self-awareness.",
    "Hi dad, I'm disappointing.",
    "You look like you could really use a maintenance day.",
    "Tupac 2020!",
    "Who will guard the guardians?",
    "Our love is an immutable object.",
    "You are the global constant in my life.",
    "Don't be such a circuit breaker.",
    "If you're seeing things that you thought were dead, who you gonna call? Cache Busters!",
    "I think I need a blockchain to keep track of all my blockchains",
    "Contrary to popular belief, I do in fact know a few things outside my realm of expertise."
]);

var greetIdx = 0;

export function ShowGreet(element) {
    TweenLite.fromTo(element, greetingTime, {opacity: "0"}, {opacity: "1", onComplete: HideGreet, onCompleteParams: [element]});
}

function HideGreet(element) {
    window.setTimeout(function() {
        TweenLite.fromTo(element, 1, {opacity: "1"}, {opacity: "0", onComplete: NextGreet, onCompleteParams: [element]});
    }, 1);
}

function NextGreet(element) {
    element.innerHTML = greetings[greetIdx];
    greetIdx = (greetIdx + 1) % greetings.length;
    ShowGreet(element);
}