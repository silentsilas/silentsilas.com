import TweenLite from './gsap/TweenLite'
import { debounce } from "./debounce";
import { isTouch } from './tactus';

var currentEm;

export function InitNav() {
    currentEm = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);
    var debouncedResize = debounce(function OnWindowResize(e) {
        currentEm = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);
        if (currentEm > 30) {
            // must be large screen
            menuEl.style.display = 'none';
            menuOptions.style.display = 'block';
            TweenLite.to(menuOptions, 0.4, {opacity: "1", top: "0px"});
        } else {
            menuEl.style.display = 'block';
            if (menuEl.classList.contains("change")) {
                menuEl.classList.remove("change");
            }
            TweenLite.fromTo(menuOptions, 0, {opacity: "1", top: "62px"}, {opacity: "0", top: "0px", onComplete: HideMenu});
        }

    }, 200);

    window.addEventListener('resize', debouncedResize);
    const menuEl = document.querySelector(".menu_icon");
    const menuOptions = document.querySelector(".nav_options");
    const menuOption = document.querySelectorAll(".nav_option");

    menuEl.addEventListener('click', toggleMenu);
    menuOptions.addEventListener('click', toggleMenu);

    function toggleMenu(ev) {
        if (currentEm > 30) {
            return;
        }
        if (menuOptions.style.display != 'block') {
            // time to show em
            menuOptions.style.display = 'block';
            menuEl.classList.add("change");
            TweenLite.fromTo(menuOption, 0.4, {backgroundColor: "rgba(0,0,0,0.0)"}, {backgroundColor: "rgba(0,0,0,0.75)", delay: "0.3"});
            TweenLite.fromTo(menuOptions, 0.4, {top: "0px", opacity: "0"}, {top: "62px", opacity: "1"});
        } else {
            menuEl.classList.remove("change");
            TweenLite.fromTo(menuOptions, 0.4, {opacity: "1", top: "62px"}, {opacity: "0", top: "0px", onComplete: HideMenu});
        }
    }

    function HideMenu() {
        menuOptions.style.display = 'none';
    }
}