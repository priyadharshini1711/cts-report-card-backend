const express = require('express')
const connection = require('./connection')
const studentRoute = require('./routes/student')
const monthRoute = require('./routes/month')
const eventRoute = require('./routes/event')
const collegeRoute = require('./routes/college')
const collegeMonthEventRoute = require('./routes/college_month_event')
const eventDetail = require('./routes/event_detail')
const monthStar = require('./routes/month_star')
const rankTable = require('./routes/rank_table')
const dashboard = require('./routes/dashboard')


const app = express();
// let express to use this

const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/student', studentRoute)
app.use('/month', monthRoute)
app.use('/event', eventRoute)
app.use('/college', collegeRoute)
app.use('/data', collegeMonthEventRoute)
app.use('/event-detail', eventDetail)
app.use('/month-star', monthStar)
app.use('/rank-table', rankTable)
app.use('/dashboard', dashboard)

module.exports = app