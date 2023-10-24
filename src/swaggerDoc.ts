const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info : { // 정보 작성
        title : "PLAY-US",
        version : "1.0.0",
        description : "PLAY-US API DOCS" 
    },
    host : "localhost:8080", // base-url
    basePath : "/" // base path
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis : [__dirname + '/sample.ts', __dirname + '/**/*.ts' ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;