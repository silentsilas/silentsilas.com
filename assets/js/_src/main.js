import { ShowGreet } from "./greet";
import { Initialize } from "./particles";
import { InitNav } from './nav';
import './gsap/TimelineLite'
import './gsap/CSSPlugin'

document.addEventListener("turbolinks:load", function() {
    const greetEl = document.getElementById("greeting");
    const particlesEl = document.getElementById("particles");
    if (greetEl != null) {
        ShowGreet(greetEl);
    } 
    if (particlesEl != null) {
        Initialize(particlesEl);
    }
    
    
});
InitNav();
// document.addEventListener("turbolinks:unload", function() {

// });
