const { Router } = require('express');

const ensureHttps = require('@lib/middleware/ensure-https');
const themeCookie = require('@lib/middleware/theme-cookie');

const router = Router();

router
    .use(ensureHttps)
    .use(themeCookie)

    .get('/', async (req, res) => res.render('index'))

    .get('/languages/:lang', (req, res) => {
        res.cookie('language', req.params.lang, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })

    .get('/themes/:name', (req, res) => {
        res.cookie('theme', req.params.name, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })
;

module.exports = router;
 