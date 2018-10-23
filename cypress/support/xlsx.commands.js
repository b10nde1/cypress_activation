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
//create array for data from cypher json
//format from json => "test":"a1/*/a2/*/a3/*/...",
//return Array(a1.a2,a3,...)
const getDataFromCypherJson=(arg_data: string):Array=>{
    try{
        return arg_data.split('/*/');
    }
    catch(ex){
        cy.checkUtilConsole(['xlsx.commands => getDataFromCypherJson'],[ex]);
    }
}

//extract data from json
const getDataFromCypherArray=(arg_testcase: Array, arg_teststep: Array,
    arg_scenario:Array, arg_test:Array, arg_run: Array,
    arg_action: Array, arg_value: Array, arg_data: Array):Array=>{
        try{
            let result=new Array(arg_testcase.length);
            for(var compt=0;compt<result.length;compt++){
                result[compt]=new Array(8);
                result[compt][0]= arg_testcase[compt];
                result[compt][1]=arg_teststep[compt];
                result[compt][2]=arg_scenario[compt];
                result[compt][3]=arg_test[compt];
                result[compt][4]=arg_run[compt];
                result[compt][5]=arg_action[compt];
                result[compt][6]=arg_value[compt];
                result[compt][7]=arg_data[compt];
            }
            return result;
        }
        catch(ex){
            cy.checkUtilConsole(['xlsx.commands => getDataFromCypherArray'],[ex]);
        }
}

//main function for cypher
Cypress.Commands.add('cyCypher',(arg_data: Array)=>{
    try{
        cy.genericRunTest(arg_data);
    }
    catch(ex){
        cy.checkUtilConsole(['xlsx.commands => cyCypher'],[ex]);
    }
})

//export function extract data from json
module.exports.getDataFromCypherArray=getDataFromCypherArray;
module.exports.getDataFromCypherJson=getDataFromCypherJson;