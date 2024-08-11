"use strict";

const BUTTONS_PATHS = {
   "button-monitor": "../index.html",
}


/* adding header from separate file */
await fetch('../html/header.html')
    .then(response => response.text())
    .then(html => document.getElementById('header').innerHTML = html);

/* do marking buttons */
for (let button_id in BUTTONS_PATHS) {
   let button = document.getElementById(button_id);
   button.addEventListener('click', (e) => {
      document.location.href = BUTTONS_PATHS[button_id];
   });

   let page_name = document.location.pathname.split("/").pop()
   if (page_name === BUTTONS_PATHS[button_id].split("/").pop()) {
      button.classList.add("mark-selected");
   }
}
