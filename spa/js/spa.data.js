/*
 * spa.data.js
 * Data module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, spa */

spa.data = (function () {
    'use strict';
    var initModule, getVersion;

    initModule = function () {
        console.log('spa.data.initModule');
    };

    getVersion = function () {
        console.log('spa.data.getVersion');

        $.ajax({
            url: 'https://z4lmbyal5h.execute-api.us-west-2.amazonaws.com/Prod/version',
            type: 'GET'
        })
            .done(function (json) {
                console.log('ajax done callback: ' + JSON.stringify(json));

            })
            .fail(function (xhr, status, errorThrown) {
                console.log('ajax fail callback:');
                console.dir(xhr);
                console.log("Status: " + status);
                console.log("Error: " + errorThrown);
            })
            .always(function (xhr, status) {
                console.log('ajax always callback ' + JSON.stringify(xhr) + ' status: ' + status);
            });


    };
    return {
        initModule: initModule,
        getVersion: getVersion
    };
}());


