'use strict';
console.log('Loading version function');

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    callback(null, {
        statusCode: '200',
        body: 'spa-origins:0.0.1'
    });
};