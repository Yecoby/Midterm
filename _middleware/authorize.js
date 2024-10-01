const jwt = require('express-jwt');
const { secret } = require ('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize( roles = []) {
    //roles param,
    //or an array
    if (typeof roles === 'string') {
        roles = [roles];
    }

return [
    //authenticate jwt
    jwt({ secret, algorithms: ['HS256'] }),
    
    //authorize based on user role
    async (re, res, next) => {
        const account = await db.Account.findByPk(req.user.id);

        if (!account || (roles.length && !roles.includes(Account.role))) {
            //account no longer exist or role not authorize
            return res.status(401).json({ message: 'Unauthorize'});
        }
        //authentication and authorization
        req.user.role = account.role;
        const refreshTokens = await account.getRefreshTokens();
        req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
        next();
    }
];
}
