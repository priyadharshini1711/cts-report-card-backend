const express = require('express');
const { json } = require('express/lib/response');
const connection = require('../connection')
const router = express.Router();

const deleteMonthStars = (month_id, response, request) => {
    console.log("sample", month_id)

    const delete_month_star_query = "update month_star set status = 500 where month_id = ?"
    connection.query(delete_month_star_query, [month_id], (err, result) => {
        if (err) {
            throw err
        }
    })
}

const insertMonthStars = (month_id, month_stars, response, request) => {
    console.log("sample", month_stars)
    const month_star_insert_query = "INSERT INTO month_star (month_id, student_id, selected_by) VALUES ?";
    connection.query(month_star_insert_query, [month_stars], function (err, result) {
        if (err) {
            throw err
        }
    });
}

router.post('/', (request, response, next) => {
    let month_id = request.query.month_id
    try {
        deleteMonthStars(month_id, response, request)
        insertMonthStars(month_id, request.body.month_stars, response, request)
        return response.status(200).json({ "message": "Update Completed Successfully" })
    } catch (e) {
        throw err
    }
})

router.get('/', (request, response, next) => {
    get_month_star = `select ms.id, ms.month_id, ms.student_id, s.name, ms.selected_by from month_star ms
    join student s on s.id = ms.student_id
    where status = 10`
    connection.query(get_month_star, function (err, result) {
        if (!err)
            return response.status(200).json(result)
        else
            return response.status(500).json(err)
    })
})

module.exports = router;