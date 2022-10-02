const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

router.get('/events/', (request, response, next) => {
    get_event = `select SUM(CASE WHEN mode = '10' THEN 1 ELSE 0 END) as offline_events,
    SUM(CASE WHEN mode = '20' THEN 1 ELSE 0 END) as online_events,
    count(distinct(ed.event_name)) as unique_events,
    count(*) as overall_events
    from event_detail ed;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/RMD/', (request, response, next) => {
    get_event = `select * from rmd;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/SCSVMV/', (request, response, next) => {
    get_event = `select * from scsvmv;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/VEC/', (request, response, next) => {
    get_event = `select * from vec;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/RMKCET/', (request, response, next) => {
    get_event = `select * from rmkcet;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/SJIT/', (request, response, next) => {
    get_event = `select * from sjit;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/SATHYABAMA/', (request, response, next) => {
    get_event = `select * from sathyabama;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/RMKEC/', (request, response, next) => {
    get_event = `select * from rmkec;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/SJCE/', (request, response, next) => {
    get_event = `select * from sjce;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/VIT/', (request, response, next) => {
    get_event = `select * from vit;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/MSEC/', (request, response, next) => {
    get_event = `select * from msec;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/SRM/', (request, response, next) => {
    get_event = `select * from srm;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/SVCE/', (request, response, next) => {
    get_event = `select * from svce;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/SSN/', (request, response, next) => {
    get_event = `select * from ssn;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/VIT_UNIV/', (request, response, next) => {
    get_event = `select * from vit_univ;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/highest/mark/', (request, response, next) => {
    get_event = `select m.student_id as id, s.name as name, sum(m.mark) as value from mark m
    join student s on s.id = m.student_id
    where s.id != 33
    group by m.student_id
    order by value desc
    limit 5;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/highest/coordinated/', (request, response, next) => {
    get_event = `select es.student_id as id, s.name,count(*) as value from event_star es
    join student s on s.id = es.student_id
    where status = 10 and type = 10 and s.id != 33
    group by es.student_id
    order by value desc
    limit 5;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/highest/topped/', (request, response, next) => {
    get_event = `select es.student_id as id, s.name,count(*) as value from event_star es
    join student s on s.id = es.student_id
    where status = 10 and type = 20 and s.id != 33
    group by es.student_id
    order by value desc
    limit 5;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})


router.get('/highest/nominated/', (request, response, next) => {
    get_event = `select m.student_id as id, s.name, count(*) as value from month_star m
    join student s on s.id = m.student_id
    where m.selected_by = 10 and status = 10
    group by m.student_id
    order by value desc
    limit 5;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/month-star/', (request, response, next) => {
    get_month_star = `select s.id, s.name, count(*) as value from month_star ms
    join student s on s.id = ms.student_id
    where ms.selected_by = 20
    group by s.id
    order by value desc;`
    connection.query(get_month_star, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

module.exports = router;
