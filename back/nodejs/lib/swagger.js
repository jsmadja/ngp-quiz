'use strict';
const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const register = () => {

    const options = {
        swaggerDefinition: {
            info: {
                title: 'Whois API',
                version: '2.0.0',
                description: 'Demonstrating how to use RESTful Whois API'
            },
            basePath: '/',
        },
        apis: ['./lib/**/*-routes.js']
    };

    const router = express.Router();

    if (process.env.NODE_ENV !== 'production') {
        const swaggerSpec = swaggerJSDoc(options);
        router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    return router;
};

module.exports = { register };
