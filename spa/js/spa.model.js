/*
 * spa.model.js
 * Model module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global TAFFY, $, spa */

spa.model = (function () {
  'use strict';

  var initModule,
    isFakeData = true;

  initModule = function () {
    console.log('spa.model initModule');
    console.log('isFakeData:', isFakeData);


  };

  return {
    initModule: initModule
  };
}());
