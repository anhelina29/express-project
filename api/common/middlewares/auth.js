const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    
    const decocded = jwt.verify(token, process.env.JWT_SECRET)
    
    res.locals.userId = decocded.id;
    next()
}

module.exports = {
    checkAuth
}