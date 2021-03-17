const pg = require('./db.js');


const getallteachers = (req, res) => {

    pg.query('SELECT * FROM teachers ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err
        }
        // console.log(JSON.stringify(results.rows, null, 2));
        res.status(200).json({ results: results.rows })
    })
}


const getallcourses = (req, res) => {

    pg.query('SELECT * FROM courses ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err
        }
        // console.log(JSON.stringify(results.rows, null, 2));
        res.status(200).json({ results: results.rows })
    });

}

const createteacher = (req, res) => {

    // http://localhost:3000/createteacher
    // POST : 
    // {
    //     "firstname": "TEST1",
    //     "lastname": "LAST1",
    //     "dob" : "2020-01-01 00:00:00.000"
    // }


    if (req.body && req.body.firstname && req.body.firstname != "") {

        if (req.body && req.body.lastname && req.body.lastname != "") {

            pg.query('SELECT * FROM teachers WHERE firstname = $1 AND lastname = $2 LIMIT 1', [req.body.firstname, req.body.lastname], (err, results) => {

                if (err) {
                    res.status(201).json({ error: err });
                }
                else {

                    if (results.rows && results.rows.length > 0) {

                        res.status(201).json({ error: 'Teacher name already exists : ' + req.body.firstname + ' ' + req.body.lastname });
                    }

                    else {

                        const data = {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            dob: req.body.dob || null,
                            statusflag: 'A',
                            createdat: new Date(),
                            modifiedat: new Date(),
                        };

                        const values = [
                            data.firstname,
                            data.lastname,
                            data.dob,
                            data.statusflag,
                            data.createdat,
                            data.modifiedat
                        ];

                        pg.query('INSERT INTO teachers(firstname, lastname, dob, statusflag, createdat,modifiedat) values($1, $2, $3, $4, $5,$6)', values, (err, results) => {
                            if (err) {
                                res.status(201).json({ error: err });
                                throw err
                            }
                            else {
                                // console.log(JSON.stringify(results.rows, null, 2));
                                res.status(200).json({ results: 'Insert teacher completed' })

                            }
                        });
                    }
                }
            });

        }
        else {

            res.status(201).json({ error: 'Please enter lastname' });
        }
    }
    else {

        res.status(201).json({ error: 'Please enter firstname' });
    }
}

const createcourses = (req, res) => {
    // http://localhost:3000/createcourses
    // POST : 
    // {
    //     "name": "Lesson 1",
    //     "description": "บทที่ 1",
    //     "teacheruid" : 1
    // }


    if (req.body && req.body.teacheruid && req.body.teacheruid != "") {

        const teacheruid = req.body.teacheruid;
        pg.query('SELECT * FROM teachers WHERE id = $1', [teacheruid], (err, results) => {

            if (err) {
                res.status(201).json({ error: err });
            }
            else {

                if (results.rows && results.rows.length > 0) {

                    if (req.body && req.body.name && req.body.name != "") {

                        const coursename = req.body.name;

                        pg.query('SELECT * FROM courses WHERE teacheruid = $1 AND name = $2 LIMIT 1', [teacheruid, coursename], (err, results) => {

                            if (err) {
                                res.status(201).json({ error: err });
                            }
                            else {
                                if (results.rows && results.rows.length > 0) {

                                    res.status(201).json({ error: 'Course name with teacher id [ ' + + teacheruid + ' ] already exists : ' + coursename });
                                }

                                else {
                                    const data = {
                                        name: req.body.name,
                                        description: req.body.description || "",
                                        statusflag: 'A',
                                        createdat: new Date(),
                                        modifiedat: new Date(),
                                        teacheruid: req.body.teacheruid,
                                    };

                                    const values = [
                                        data.name,
                                        data.description,
                                        data.statusflag,
                                        data.createdat,
                                        data.modifiedat,
                                        data.teacheruid
                                    ];

                                    pg.query('INSERT INTO courses(name, description,statusflag, createdat,modifiedat,teacheruid) values($1, $2, $3, $4, $5,$6)', values, (err, results) => {
                                        if (err) {
                                            res.status(201).json({ error: err });
                                            throw err
                                        }
                                        else {
                                            // console.log(JSON.stringify(results.rows, null, 2));
                                            res.status(200).json({ results: 'Insert courses completed' })

                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {

                        res.status(201).json({ error: 'Please enter name' });
                    }


                }
                else {

                    res.status(201).json({ error: 'Teacher id not found' });
                }

            }
        });

    }
    else {

        res.status(201).json({ error: 'Please enter teacheruid' });
    }
}


module.exports = {
    getallteachers,
    getallcourses,

    createteacher,
    createcourses

}