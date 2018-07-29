import { ShowGreet } from "./greet";
import { Initialize } from "./particles";

const greetEl = document.getElementById("greeting");
const particlesEl = document.getElementById("particles");
if (greetEl != null) {
    ShowGreet(greetEl);
} 
if (particlesEl != null) {
    Initialize(particlesEl);
}