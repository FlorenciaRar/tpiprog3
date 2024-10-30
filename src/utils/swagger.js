import swaggerAutogen from 'swagger-autogen';

const doc = {  
  info: {
    title: 'Api Reclamos',
    description: 'Api Reclamos'
  },
  host: 'localhost:3555'
};

const outputFile = './swagger-output.json';
const routes = ['../v1/routes/*.js'];

swaggerAutogen()(outputFile, routes, doc);