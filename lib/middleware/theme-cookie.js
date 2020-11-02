module.exports = (req, res, next) => {
    const themeCookie = req.cookies.theme || process.env.DEFAULT_THEME || 'light';
    res.locals.theme = themeCookie;
    next();
};
