require('module-alias/register');

const express = require('express');
const vhost = require('vhost');

const port = process.env.PORT || 3000;

const api_app = require('@api');
const web_app = require('@web');

express()
    .use(vhost(/api\.oblik\.local|api\.oblik\.cc|api\.oblik\.pw/, api_app))
    .use(vhost(/oblik\.local|www\.oblik\.cc|www\.oblik\.pw|www\.oblik\.space/, web_app))
    

    .listen(port, () => console.log(`Listening on ${port}`))
;
