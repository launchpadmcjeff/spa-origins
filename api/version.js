'use strict';
console.log('Loading version function');

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));

    callback(null, {
        statusCode: '200',
        headers: buildCorsResponseHeaders(event),
        body: JSON.stringify({ version: 'spa-origins:0.0.1', data: event })
    });
};

function buildCorsResponseHeaders(event) {
    var response_headers = {};
    if (event.headers !== null) {

        console.log(event.headers.origin);
        if (event.headers.origin !== null && event.headers.origin === 'https://dzmn9fyn6d0w8.cloudfront.net') {
            response_headers = {
                'Access-Control-Allow-Origin': 'https://dzmn9fyn6d0w8.cloudfront.net',
                'Vary': 'Origin'
            };
        }
        else if (event.headers.origin !== null && event.headers.origin === 'http://spa-origins.s3-website.us-west-2.amazonaws.com') {
            response_headers = {
                'Access-Control-Allow-Origin': 'http://spa-origins.s3-website.us-west-2.amazonaws.com',
                'Vary': 'Origin'
            };
        }
    }
    return response_headers;
}
