const mysql = require ('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root123',
    database: 'temp_nodejs'
})

connection.connect();
connection.query('select * from emp', (err, result)=>{
    if(err==null){
        // console.log(result);
        var data = JSON.stringify(result);
        console.log(data);
    }
    else{
        console.log("Kya cheda bhosdi?")
    }
})

connection.end();