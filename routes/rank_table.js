const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

router.get('/all-events/', (request, response, next) => {
    get_event = `select cme.id as id, concat(e.name," - ",m.name) as name from college_month_event cme 
    join event e on cme.event_id = e.id
    join month m on cme.month_id = m.id
    where cme.college_id = 3
    order by m.id;`
    connection.query(get_event, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/event/', (request, response, next) => {
    let college_month_event_id = request.query.id
    get_rank_table = `select s.id, s.name, m.mark from mark m
    join student s on m.student_id = s.id
    where m.college_month_event_id = ${college_month_event_id}
    order by m.mark desc;`
    connection.query(get_rank_table, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

router.get('/event/toppers/actual/', (request, response, next) => {
    let college_month_event_id = request.query.id
    get_rank_table = `select s.id, s.name from event_star es
    join student s on s.id = es.student_id
    where es.college_month_event_id = ${college_month_event_id} and type = 20;`
    connection.query(get_rank_table, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})


router.get('/event/toppers/computed/', (request, response, next) => {
    let college_month_event_id = request.query.id
    get_rank_table = `select s.id, s.name from mark m
    join student s on s.id = m.student_id
    where college_month_event_id = ${college_month_event_id}
    and mark in (select * from (select distinct(m1.mark) from mark m1 where m1.college_month_event_id = ${college_month_event_id} order by m1.mark desc limit 2) as t1)
    order by m.mark desc;`
    connection.query(get_rank_table, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

router.get('/month/', (request, response, next) => {
    let month_id = request.query.id
    get_rank_table = `select m.student_id, s.name ,sum(m.mark) as month_mark from mark m
    join student s on m.student_id = s.id
    where m.college_month_event_id in (select distinct(cme.id) from college_month_event cme where cme.month_id = ${month_id} and cme.college_id = 3)
    group by m.student_id
    order by month_mark desc;`
    connection.query(get_rank_table, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

router.get('/month/toppers/', (request, response, next) => {
    let month_id = request.query.id
    get_month_topper = `SELECT student_id, count(*) as event_topper FROM event_star es
    where college_month_event_id in (SELECT distinct(cme.id) FROM college_month_event cme where month_id = ${month_id} and college_id = 3) 
    and type = 20 and status = 10
    group by es.student_id
    order by event_topper desc;`
    connection.query(get_month_topper, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

router.get('/month/coordinators/', (request, response, next) => {
    let month_id = request.query.id
    get_month_coordinators = `SELECT es.student_id, count(*) as event_coordinator FROM event_star es 
    where es.college_month_event_id in (SELECT distinct(cme.id) FROM college_month_event cme where month_id = ${month_id} and college_id = 3) 
    and type = 10 and status = 10
    group by es.student_id
    order by event_coordinator desc;`
    connection.query(get_month_coordinators, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

router.get('/month/stars/', (request, response, next) => {
    let month_id = request.query.id
    let type = request.query.type
    get_month_star = `select s.id, s.name from month_star ms 
    join student s on s.id = ms.student_id
    where selected_by = ${type} and month_id = ${month_id};`
    connection.query(get_month_star, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

router.get('/overall/', (request, response, next) => {
    get_overall_rank = `select m.student_id as id, s.name as name, sum(m.mark) as mark from mark m
    join student s on s.id = m.student_id
    group by m.student_id
    order by mark desc;`
    connection.query(get_overall_rank, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

router.get('/overall/coordinators/', (request, response, next) => {
    get_overall_toppers = `select es.student_id as id, count(*) as event_coordinated from event_star es
    where status = 10 and type = 10
    group by es.student_id
    order by es.student_id;`
    connection.query(get_overall_toppers, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

router.get('/overall/toppers/', (request, response, next) => {
    get_overall_coordinators = `select es.student_id as id, count(*) as event_topped from event_star es
    where status = 10 and type = 20
    group by es.student_id
    order by es.student_id;`
    connection.query(get_overall_coordinators, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })    
})

module.exports = router;