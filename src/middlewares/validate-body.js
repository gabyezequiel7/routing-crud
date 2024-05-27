'use strict';


function validateBody(req, res, next) {
    if (!req.body) {
        return res.status(400).json({
            code: 'body_not_found',
            message: 'Body Not Found'
        });
    }
    return next();
}

module.exports = validateBody;
