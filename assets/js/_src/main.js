import { ShowGreet } from "./greet";
import { Initialize } from "./particles";
import { InitFingerprint } from "./fingerprint";
import { InitNav } from './nav';
import './gsap/TimelineLite'
import './gsap/CSSPlugin'

document.addEventListener("turbolinks:load", function() {
    const greetEl = document.getElementById("greeting");
    const particlesEl = document.getElementById("particles");
    const fpEl = document.getElementById("fingerprint");
    if (greetEl != null) {
        ShowGreet(greetEl);
    } 
    if (particlesEl != null) {
        Initialize(particlesEl);
    }
    if (fpEl != null) {
        InitFingerprint(fpEl);
    }
    
    
});
InitNav();
// document.addEventListener("turbolinks:unload", function() {

// });
