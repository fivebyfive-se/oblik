const express = require('express');
const cookieParser = require('cookie-parser');
const { join } = require('path');

const { I18n } = require('i18n');
const languageCookie = require('@lib/middleware/language-cookie');

const i18n = new I18n({
    locales: ['en-US', 'sv-SE'],
    directory: join(__dirname, 'locales'),
    objectNotation: true
});

const routes = require('./routes/index.js');
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
}

app
    .use(express.static(join(__dirname, 'public')))

    .use(cookieParser())
    .use(i18n.init)
    .use(languageCookie)


    .set('views', join(__dirname, 'views'))
    .set('view engine', 'pug')

    .use('/', routes)
;

module.exports = app;
