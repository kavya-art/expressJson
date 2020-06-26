const mysql = require('mysql');
const dbConfig = require('../configs/db.config');
const connection = mysql.createConnection(
    {
        host:dbConfig.HOST,
        user:dbConfig.USER,
        port:dbConfig.PORT,
        password:dbConfig.PASSWORD,
        database:dbConfig.DB
    }
)
connection.connect((err)=>
{
    if(err){
        throw err;
    }
    else
    {
        console.log("connected.");
    }
});
module.exports=connection;