'use strict';

const ROUTING_CRUD_LIMIT_MAX = parseInt(process.env.ROUTING_CRUD_LIMIT_MAX) || 100;
const ROUTING_CRUD_LIMIT_DEFAULT = parseInt(process.env.ROUTING_CRUD_LIMIT_DEFAULT) || 10;
const ROUTING_CRUD_SKIP_DEFAULT = parseInt(process.env.ROUTING_CRUD_SKIP_DEFAULT) || 0;

function checkLimitSkip(req, res, next) {
    const params = ['limit', 'skip'];
    for (const field of params)  {
        req.query[field] = !req.query[field] ? (field === 'limit' ? ROUTING_CRUD_LIMIT_DEFAULT : ROUTING_CRUD_SKIP_DEFAULT) : parseInt(req.query[field]);
        if (isNaN(req.query[field])) {
            return res.status(400).json({
                code: `invalid_${field}`,
                message: `Invalid ${field}. Is NaN`
            });
        }
        if (field === 'limit' && req.query[field] > ROUTING_CRUD_LIMIT_MAX) {
            return res.status(400).json({
                code: 'exceeds_the_limit',
                message: 'Exceeds the Limit'
            });
        }
    }
    return next();
}

module.exports = checkLimitSkip;
