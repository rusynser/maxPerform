// middleware/checkRole.js


const checkRole = (requiredRole) => {
    return (req, res, next) => {
            console.log(req.session.role);
            console.log(requiredRole);
        if (req.session && req.session.role === requiredRole) {
            next();
        } else {
            res.status(403).send('Access Denied: Insufficient permissions');
        }
    };
};

export default checkRole;
