/*
 * spa.shell.js
 * Shell module for SPA
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, spa */

spa.shell = (function () {
  'use strict';
  var
    initModule = function ($container) {
      console.log('spa.shell.initModule', $container);
     };



  return {
    initModule: initModule
  };

}());

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
