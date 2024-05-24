const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    db: process.env.DB_URL_DEVELOPMENT,
    port: process.env.PORT,
  },
  production: {
    db: process.env.DB_URL_DEVELOPMENT,
    port: process.env.PORT,
  },
};
