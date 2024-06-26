const env = process.env.NODE_ENV || 'development';

const settings = require('./server/config/settings')[env];

const app = require('express')();

require('./server/config/database')(settings);
require('./server/config/express')(app);
require('./server/config/routes')(app);
require('./server/config/passport')();

app.listen(settings.port);
console.log(`Server listen on port ${settings.port}`);