export const validateContentType = (req, res, next) => {
    const isJSONRequest = req.headers['content-type'] === 'application/json';
    const isMultipartRequest = req.headers['content-type']?.includes('multipart/form-data');

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && !isJSONRequest && !isMultipartRequest) {
        return res.status(400).send('Content-Type debe ser application/json o multipart/form-data');
    }
    next();
};