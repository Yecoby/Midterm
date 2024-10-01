module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // Custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err }); // Changed message to err

        case err.name === 'UnauthorizedError':
            // JWT authentication error
            return res.status(401).json({ message: 'Unauthorized' }); // Fixed typo in 'status'

        default:
            return res.status(500).json({ message: err.message });
    }
}