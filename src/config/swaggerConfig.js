export const swaggerConfig ={
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api Reclamos',
            version: '1.0.0',
            description: 'Api reclamos',
        },
        servers: [
            {
                url: 'http://localhost:3555',
            },
        ],
    },
    apis: ['./src/v1/routes/*.js'], 
};