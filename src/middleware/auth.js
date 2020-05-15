const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token);

        console.log(decoded.data.role)

        if (decoded.data.role !== 'admin') {
            return res.status(401).json({
                message: 'you are not authorized'
            })
        }
      
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'auth failed'
        })
    }
}

const isTutor = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token);

        if (decoded.data.role !== 'tutor') {
            return res.status(401).json({
                message: 'you are not authorized'
            })
        }
      
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'auth failed'
        })
    }
}

const isStudent = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token);

        if (decoded.data.role !== 'student') {
            return res.status(401).json({
                message: 'you are not authorized'
            })
        }
      
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'auth failed'
        })
    }
}

module.exports = {
    isAdmin,
    isTutor,
    isStudent
}