!function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,o(r.key),r)}}function o(e){var o=function(e,o){if("object"!=t(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(o)?o:o+""}new(function(){return t=function t(e){var o=e.togglerSelector,n=e.buttonSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._toggler=document.querySelector(o),this._themeButtons=this._toggler.querySelectorAll(n)},(o=[{key:"_setTheme",value:function(t){document.documentElement.className="theme-".concat(t)}},{key:"_setDisabledState",value:function(t){this._themeButtons.forEach((function(e){e.dataset.theme===t?e.disabled=!0:e.disabled=!1}))}},{key:"_setListeners",value:function(){var t=this;this._themeButtons.forEach((function(e){e.onclick=function(){var o=e.dataset.theme;t._setTheme(o),t._setDisabledState(o),localStorage.setItem("theme-color",o)}}))}},{key:"init",value:function(){this._setListeners();var t=localStorage.getItem("theme-color");t&&(this._setTheme(t),this._setDisabledState(t))}}])&&e(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,o}())({togglerSelector:".theme-toggler",buttonSelector:".theme-toggler__btn"}).init()}();