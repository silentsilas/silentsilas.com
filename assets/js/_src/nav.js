import TweenLite from './gsap/TweenLite'
import { debounce } from "./debounce";

export function InitNav() {

    var debouncedResize = debounce(function OnWindowResize(e) {
        var em = window.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);
        if (em > 30) {
            // must be large screen
            menuEl.style.display = 'none';
            menuOptions.style.display = 'block';
            TweenLite.to(menuOptions, 0.4, {opacity: "1", top: "0px"});
        } else {
            menuEl.style.display = 'block';
            if (menuEl.classList.contains("change")) {
                menuEl.classList.remove("change");
            }
            TweenLite.fromTo(menuOptions, 0, {opacity: "1", top: "60px"}, {opacity: "0", top: "0px", onComplete: HideMenu});
        }

    }, 200);

    window.addEventListener('resize', debouncedResize);
    const menuEl = document.querySelector(".menu_icon");
    const menuOptions = document.querySelector(".nav_options");

    menuEl.addEventListener('click', toggleMenu);

    

    function toggleMenu(el) {
        menuEl.classList.toggle("change");
        if (menuOptions.style.display != 'block') {
            // time to show em
            menuOptions.style.display = 'block';
            menuEl.classList.add("change");
            TweenLite.fromTo(menuOptions, 0.4, {opacity: "0", top: "0px"}, {opacity: "1", top: "60px"});
        } else {
            TweenLite.fromTo(menuOptions, 0.4, {opacity: "1", top: "60px"}, {opacity: "0", top: "0px", onComplete: HideMenu});
        }
        
        

    }
    function HideMenu() {
        
        menuOptions.style.display = 'none';
    }
}