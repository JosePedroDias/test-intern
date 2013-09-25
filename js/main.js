(function(window, undefined) {
    'use strict';

    /*
    button click takes value from input, adds 1 and returns result to span.
    */

    var iEl = document.querySelector('input');
    var bEl = document.querySelector('button');
    var sEl = document.querySelector('span');

    bEl.addEventListener('click', function(ev) {
        var v = parseInt( iEl.value , 10);
        sEl.innerHTML = v + 1;
    });

})(window);
