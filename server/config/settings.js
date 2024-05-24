const path = require('path');

const rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/yourDatabase',
        port: 1337
    },
    staging: {

    },
    production: {
        port: process.env.PORT
    }
}