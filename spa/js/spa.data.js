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
/*global $, spa, AWSCognito, AmazonCognitoIdentity, Promise */

spa.data = (function () {
    'use strict';
    var initModule, getVersion, registerUser, verify, createCognitoUser,
        toUsername, signin, authTokenPromise, updateAuthToken, authToken,
        poolData = {
            UserPoolId: 'eu-west-2_bFh8QySki',
            ClientId: '2tv09p627o0bfmokbgkt0b9efo'
        },
        userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData),
        region = 'eu-west-2', // e.g. us-east-2
        invokeUrl = 'https://3gz7v5ndhf.execute-api.eu-west-2.amazonaws.com/prod'; // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',

    authTokenPromise = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }
    });

    updateAuthToken = function () {
        authTokenPromise.then(function setAuthToken(token) {
            if (token) {
                authToken = token;
                console.log(token);
            } else {
                console.log('needs to sign-in');
            }
        }).catch(function handleTokenError(error) {
            console.log('needs to sign-in:', error);
        });
    };

    signin = function (email, password) {
        var signinSuccess, signinFailure, authenticationDetails, cognitoUser;

        signinSuccess = function () {
            console.log('Successfully Logged In');

        };
        signinFailure = function (err) {
            console.log(err);
        };
        authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: toUsername(email),
            Password: password
        });

        cognitoUser = createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: signinSuccess,
            onFailure: signinFailure
        });
    };

    verify = function (email, code) {
        var onSuccess, onFailure;

        onSuccess = function verifySuccess(result) {
            console.log(`verifySuccess callResult=${result}`);
        };
        onFailure = function verifyError(err) {
            console.log(err);
        };

        createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    createCognitoUser = function (email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: toUsername(email),
            Pool: userPool
        });
    }
    toUsername = function (email) {
        return email.replace('@', '-at-');
    };
    registerUser = function (email, password) {
        var onSuccess, onFailure,
            dataEmail = {
                Name: 'email',
                Value: email
            },
            attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

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
        registerUser: registerUser,
        verify: verify,
        signin: signin,
        updateAuthToken: updateAuthToken
    };
}());


