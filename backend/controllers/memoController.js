const router = require('express').Router();
const plugins = require('../config/plugins');

const date = new Date()
const time = plugins.moment(date).format("YYYY-MM-DD HH:mm:ss");



router.post('/read', (req, res, next) => {
    
    let _sql = `SELECT * FROM memo WHERE (isDeleted = '0')`;

    plugins.conn.query(_sql, (err, result) => {
        if(err) throw err;

        if(result.length > 0) {
            res.send({
                code: 'y',
                data: result
            });
        } else {
            res.send({
                code: 'Not Data'
            });
        }
    });
});


router.post('/create', (req, res, next) => {

    let query = req.body;
    let _sql = `
        INSERT INTO memo(title, contents, createdAt, isDeleted)
        VALUES('${query.title}', '${query.contents}', '${time}', '0')
    `;

    plugins.conn.query(_sql, (err, result) => {
        if(err) throw err;
        res.send({
            code: 'y'
        });
    });
});

router.post('/single', (req, res, next) => {

    let _sql_id = req.body._id;
    let _sql = `SELECT * FROM memo WHERE _id = ${_sql_id}`;

    plugins.conn.query(_sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            res.send({
                code: 'y',
                data: result
            });
        } else {
            res.send({
                code: 'n'
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    let _sql_id = req.body._id;
    let _sql = `UPDATE memo SET isDeleted = '1' WHERE (_id = '${_sql_id}')`;
    plugins.conn.query(_sql, (err, result) => {
        if(err) throw err;
        res.send({
            code: 'y'
        });
    });
});

module.exports = router;