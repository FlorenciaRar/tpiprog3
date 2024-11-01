export const validateContentType = (req, res, next) => {
    if (['POST', 'PUT', ''].includes(req.method) && req.headers['content-type'] !== 'application/json') {
        return res.status(400).send('Content-Type debe ser application/json');
    }
    next();
};