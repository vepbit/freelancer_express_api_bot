const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET


module.exports = function (alllowRole) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(403).json({status: "Error",result: "You did not provide token"});
            }
            const decodedData = jwt.verify(token, SECRET)
            let hasRole = false
            console.log('decodedData',decodedData);
            console.log('alllowRole',alllowRole);

            if (decodedData.roleid ===alllowRole) {
                hasRole = true
            }

            
            if (!hasRole) {
                return res.status(403).json({status: "Error",result: "You do not have access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({status: "Error",result: "Unautorised user"})
        }
    }
};