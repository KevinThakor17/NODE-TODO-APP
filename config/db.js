const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"sql12.freesqldatabase.com",
    user: "sql12788273",
    password: "Agh6qTdrvh",
    database: "sql12788273"
})

db.connect((err)=>{
    if(err) throw err;
    console.log("Database Connected");
    
})

module.exports = db;