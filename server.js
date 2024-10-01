require('rootpath')(); // Ensure this is set up correctly for your project
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler'); // Ensure the path is correct

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(cookieParser());

// Allow CORS requests from any origin and with credentials
app.use(cors({ 
    origin: (origin, callback) => callback(null, true), 
    credentials: true 
}));

// API routes
app.use('/accounts', require('./accounts/accounts.controller')); // Ensure this path is correct

// Swagger docs route
app.use('/api-docs', require('./_helpers/swagger')); // Ensure this path is correct

// Global error handler
app.use(errorHandler);

// Start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});