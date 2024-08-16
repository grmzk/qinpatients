"use strict";

import { getURLParam } from './utils.js';

const BUTTONS_PATHS = {
   "button-monitor": `../index.html?department=${getURLParam("return_to_department")}&date=${getURLParam("return_to_date")}`,
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
   if (page_name === BUTTONS_PATHS[button_id].split("?")[0].split("/").pop()) {
      button.classList.add("mark-selected");
   }
}

/* do marking button for root page */
if (document.location.pathname === "/") {
   let button = document.getElementById("button-monitor");
   button.classList.add("mark-selected");
}

/* set href for logo */
if (document.location.pathname.split("/").pop() === "index.html") {
   document.getElementById("anchor-logo").href = "index.html";
} else {
   document.getElementById("anchor-logo").href = "../index.html";
}
