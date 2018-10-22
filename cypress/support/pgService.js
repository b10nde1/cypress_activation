const pgConnect=()=>{
    try{
        const { Client } = require('../../node_modules/pg');
        const client = new Client();

        client.connect();

        const res = client.query('SELECT $1::text as message', ['Hello world!']);
        console.log(res.rows[0].message); // Hello world!
        client.end();
    }
    catch(ex){
        cy.checkUtilConsole(['pgService => pgConnect'],[ex]);
    }
}

module.exports.pgConnect=pgConnect;