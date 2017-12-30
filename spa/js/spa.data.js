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
/*global $, spa, AWSCognito, AmazonCognitoIdentity */

spa.data = (function () {
    'use strict';
    var initModule, getVersion, registerUser,
        poolData = {
            UserPoolId: 'eu-west-2_bFh8QySki',
            ClientId: '2tv09p627o0bfmokbgkt0b9efo'
        },
        userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData),
        region = 'eu-west-2', // e.g. us-east-2
        invokeUrl = 'https://3gz7v5ndhf.execute-api.eu-west-2.amazonaws.com/prod'; // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',



    registerUser = function (email, password) {
        var toUsername, onSuccess, onFailure,
            dataEmail = {
                Name: 'email',
                Value: email
            },
            attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);


        toUsername = function (email) {
            return email.replace('@', '-at-');
        };

        onSuccess = function registerSuccess(result) {
            var cognitoUser = result.user;
            console.log(`registerUser onSuccess username=${cognitoUser.getUsername()}`);
        };

        onFailure = function registerFailure(err) {
            console.log(`registerUser onFailure err=${err}`);
        };

        userPool.signUp(toUsername(email), password, [attributeEmail], null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );


    };

    initModule = function () {
        console.log('spa.data.initModule');


        if (typeof AWSCognito !== 'undefined') {
            AWSCognito.config.region = region;
        }
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
        getVersion: getVersion,
        registerUser: registerUser
    };
}());


