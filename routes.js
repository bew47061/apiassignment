module.exports = function (app) {

    const query = require('./query.js');

    app.get('/getallteachers', query.getallteachers);
    app.post('/createteacher', query.createteacher);



    app.get('/getallcourses', query.getallcourses);
    app.post('/createcourses', query.createcourses);


}





