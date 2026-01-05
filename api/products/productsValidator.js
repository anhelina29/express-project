const postProductsValidator = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ message: 'Title must be more than 3' });
    }
    next();
}

const putProductsValidator = (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ message: 'Title must be more than 3' });
    }
    next();
}

module.exports = {
    postProductsValidator,
    putProductsValidator
}