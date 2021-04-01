if (process.env.NODE_ENV !== 'production') {
    process.env.TOKEN = require('../.env').TOKEN;
}
const app = require('express')();
const consign = require('consign');
const mongoose = require('mongoose');

require('./config/mongodb');

app.mdb = mongoose;
app.token = process.env.TOKEN;

consign()
    .then('./config/middlewares.js')
    .then('./config/schemas.js')
    .then('./api/test.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

app.listen(process.env.PORT || 4444, () => {
    console.log("LISTEN-ON:", process.env.PORT || 4444);
});