import * as Crypto from 'crypto-js';
export function InitFingerprint(fp_element){

    // Set up the listener to ask for their GPS coords
    const geolocation_btn = document.querySelector("#geolocation");
    var asked = false;
    geolocation_btn.addEventListener("click", function(event) {
        if (asked) return;
        asked = true;
        AskForCoords(fp_element, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    });

    const uuid_btn = document.querySelector("#uuid");
    uuid_btn.addEventListener("click", function(event) {
        const fp_elements = fp_element.querySelectorAll("span");
        var fp_string = "";
        for (var fp_idx = 0; fp_idx < fp_elements.length; fp_idx++) {
            fp_string += fp_elements[fp_idx].innerHTML;
        }

        uuid_btn.innerHTML = `derive a ${Crypto.SHA256(fp_string).toString()}`;
    });

    // get their user agent
    const fp_ua = document.createElement("span")
    fp_ua.innerHTML = `User Agent: ${window.navigator.userAgent}<br />`;
    fp_element.appendChild(fp_ua);

    // list out their plugins
    for (var pluginIdx = 0; pluginIdx < window.navigator.plugins.length; pluginIdx++) {
        const plugin_el = document.createElement("span");
        var plugin = window.navigator.plugins[pluginIdx];
        plugin_el.innerHTML = `Plugin: ${plugin.name}, ${plugin.version}<br/>`;
        fp_element.appendChild(plugin_el);
    }

    const fp_platform = document.createElement("span");
    fp_platform.innerHTML = `Platform: ${window.navigator.platform}<br />`;
    fp_element.appendChild(fp_platform);

    const fp_utc = document.createElement("span");
    const utc_offset = (new Date().getTimezoneOffset())/60;
    if (utc_offset >= 0) {
        fp_utc.innerHTML = `Timezone: UTC -${utc_offset}<br />`;
    }  else {
        fp_utc.innerHTML = `Timezone: UTC +${utc_offset}<br />`;
    }
    fp_element.appendChild(fp_utc);

    const fp_resolution = document.createElement("span");
    fp_resolution.innerHTML = `Resolution: ${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}<br />`;
    fp_element.appendChild(fp_resolution);
}

function AskForCoords(el, geoOptions) {
    window.navigator.geolocation.getCurrentPosition(function gotPosition(pos) {
        const fp_geocoords = document.createElement("span");
        const coords = pos.coords;
        
        fp_geocoords.innerHTML = `Current Position: Latitude : ${coords.latitude}, Longitude: ${coords.longitude}, More or less ${coords.accuracy} meters.<br />`;
        el.appendChild(fp_geocoords);
    }, function errorPosition(err) {
        console.log(`ERROR(${err.code}): ${err.message}`);
    }, geoOptions);
}