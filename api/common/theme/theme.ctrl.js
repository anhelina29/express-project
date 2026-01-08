const theme = (req, res) => {
    const {theme} = req.body;
    const selectedTheme = theme === 'dark' ? 'dark' : 'light';
    res.cookie('theme', selectedTheme, {
        maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({data: selectedTheme});
}

module.exports = { theme }