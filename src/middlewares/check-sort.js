'use strict';

function checkSort(req, res, next) {
    if (!req.query.sort) {
        req.query.sort = '-createdAt';
        return next();
    }
    req.query.sort = String(req.query.sort);
    if (!isNaN(req.query.sort)) {
        return res.status(400).json({
            code: 'invalid_sort',
            message: 'Invalid Sort'
        });            
    }
    if (req.query.sort.length > 128) {
        return res.status(400).json({
            code: 'invalid_sort',
            message: 'Invalid Sort'
        });
    }
    return next();
}

module.exports = checkSort;