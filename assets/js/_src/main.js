import { ShowGreet } from "./greet";
import { Initialize } from "./particles";
import { InitFingerprint } from "./fingerprint";
import { InitNav } from './nav';
import './gsap/TimelineLite'
import './gsap/CSSPlugin'

const greetEl = document.getElementById("greeting");
const particlesEl = document.getElementById("particles");
const fpEl = document.getElementById("fingerprint");

// My revolutionary method of determining which JS
// needs to run on which page
if (greetEl != null) {
    ShowGreet(greetEl);
} 
if (particlesEl != null) {
    Initialize(particlesEl);
}
if (fpEl != null) {
    InitFingerprint(fpEl);
}

InitNav();