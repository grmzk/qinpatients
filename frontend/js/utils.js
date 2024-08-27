"use strict";


export function getURLParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}
