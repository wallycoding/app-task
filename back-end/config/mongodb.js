if (process.env.NODE_ENV !== 'production') {
    process.env.MONGODB_URI = require('../../.env').MONGODB_URI;
}

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, { useNewUrlParser: true })
    .catch(error => {
        console.log('\x1b[41m%s\x1b[37mERRO: ', error, '\x1b[0m');
    });
