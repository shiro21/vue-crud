const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const mysql = require('mysql2');
const dot = require('dotenv/config');

// Vue3 => Proxy사용
const cors = require('cors');

app.use(cors({ origin: '*'}));

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
const conn = require('./config/database');
conn.connect(err => {
    if(err) throw err;
    console.log('DB Connect');
});

app.get('/health', (req, res, next) => {
    res.status(200).json({
      code : "ok",
    });
});

// Router
app.use('/api/memos', require('./controllers/memoController'));


const port = process.env.PORT || 8080;
app.set('port', port);
app.listen(port, () => {
    console.log(`localhost:${port}`)
});

module.exports = app;