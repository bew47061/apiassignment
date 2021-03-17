const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const moment = require('moment');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

require('./routes.js')(app);

// var test = new Date;
// console.log(moment(test).format('YYYY-MM-DD HH:mm:ss.SSS'));

app.listen(port, () => {
    console.log('App running on port ' + port + ' at ' + moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'))
});


