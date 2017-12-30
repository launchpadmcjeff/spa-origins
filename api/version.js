'use strict';
console.log('Loading version function');

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    callback(null, {
        statusCode: '200',
        headers: {
            'Access-Control-Allow-Origin': 'http://spa-origins.s3-website.us-west-2.amazonaws.com/spa.html*',
        },
        body: JSON.stringify({ version: 'spa-origins:0.0.1' })
    });
};