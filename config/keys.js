
if(process.env.NODE_ENV === 'production'){ // if in production mode
    module.exports = require('./prod.js');
} else { // if in dev mode
    module.exports = require('./dev.js');
}
