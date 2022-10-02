const mysql = require('mysql')

var connection = mysql.createConnection({
    port: 6117,
    host: 'containers-us-west-68.railway.app',
    user: "root",
    password: "thSS05oEHvpJ666ufpQA",
    database: "cts"
})

connection.connect((err) => {
    if(!err){
        console.log("connected")
    } else {
        console.log(err)
    }
})

module.exports = connection
