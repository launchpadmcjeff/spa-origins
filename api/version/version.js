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
        if (event.headers.origin !== null) {
            console.log(event.headers.origin);
            if (event.headers.origin === 'https://spa-origins.robowe.be') {
                response_headers = {
                    'Access-Control-Allow-Origin': 'https://spa-origins.robowe.be',
                    'Vary': 'Origin'
                };
            }
            else if (event.headers.origin === 'https://d5jhbqfxgppt5.cloudfront.net') {
                response_headers = {
                    'Access-Control-Allow-Origin': 'https://d5jhbqfxgppt5.cloudfront.net',
                    'Vary': 'Origin'
                };
            }
            else if (event.headers.origin === 'http://spa-origins.robowe.be.s3-website-us-east-1.amazonaws.com') {
                response_headers = {
                    'Access-Control-Allow-Origin': 'http://spa-origins.robowe.be.s3-website-us-east-1.amazonaws.com',
                    'Vary': 'Origin'
                };
            }
        }
    }
    return response_headers;
}
