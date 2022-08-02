const conn = require('./database');
const moment = require('moment');
const momentTime = require('moment-timezone');
const time = momentTime().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');

module.exports = {
    conn: conn,
    moment: moment,
    time: time
}