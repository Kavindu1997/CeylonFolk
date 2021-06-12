import mysql from 'mysql';

export const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_ceylonfolk',
    port:'3306'
  });

  db.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    console.log('db '+db.state);
});
