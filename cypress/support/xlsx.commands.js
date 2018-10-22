/***************************************************************/
//xlsx reader
//npm install xlsx
//npm install xls-to-json 
//npm install pg
/*
https://www.npmjs.com/package/pg-native
    On OS X: brew install postgres
    On Windows:
        Install Visual Studio C++ (successfully built with Express 2010). Express is free.
        Install PostgreSQL (http://www.postgresql.org/download/windows/)
        Add your Postgre Installation's bin folder to the system path (i.e. C:\Program Files\PostgreSQL\9.3\bin).
        Make sure that both libpq.dll and pg_config.exe are in that folder.
    note:: modify pgdata environment variable for windows
=> npm i pg-native
*/
Cypress.Commands.add('test',()=>{
    let test=require('./pgService');
    test.pgConnect();
})