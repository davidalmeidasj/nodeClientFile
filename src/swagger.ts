export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                File: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'The file ID'
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the person'
                        },
                        city: {
                            type: 'string',
                            description: 'The city of the person'
                        },
                        country: {
                            type: 'string',
                            description: 'The country of the person'
                        },
                        favorite_sport: {
                            type: 'string',
                            description: 'The favorite sport of the person'
                        }
                    },
                    required: ['name', 'city', 'country', 'favorite_sport']
                }
            }
        }
    },
    apis: ['./src/routes/*.ts']
};

export default swaggerOptions;