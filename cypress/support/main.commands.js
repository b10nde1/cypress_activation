//import ObjGeneric
let ObjGeneric=require('../obj/objGeneric');
/***************************************************************/
//Main function for generic commands
//arg_testCase: string, arg_testStep: string, arg_scenario: string, arg_test: string
//arg_run: boolean, arg_action: string, arg_value: string, arg_data: string
Cypress.Commands.add('genericRunTest',(arg_data: Array)=>{
        try{
            let data_column=arg_data[0];
            let util_commands=require('./util.commands');
            let report_id=util_commands.generateTitle('Run_test-id');
            let track_action=new Array(arg_data.length);
            arg_data.forEach(data_row=>{
                if(arg_data.indexOf(data_row)!=0){
                    let temp_obj=new ObjGeneric(data_row[0],data_row[1],data_row[2],data_row[3],data_row[4],
                        data_row[5],data_row[6],data_row[7]);
                    cy.checkUtilConsole(['TestCase','TestStep','Scenario','Test','RUN','Action','Value','Data']
                        ,[temp_obj.testCase,temp_obj.testStep,temp_obj.scenario,temp_obj.test
                        ,temp_obj.run,temp_obj.action,temp_obj.value,temp_obj.data]);
                    if(String(temp_obj.run)=='true'){
                        //verify what the action 
                        temp_obj[temp_obj.action]([temp_obj.value,temp_obj.data,temp_obj.testCase,temp_obj.testStep]);
                    }
                    //track all action
                    //alloc 5 slots per row for track_action
                    //testCase, testStep, scenario, test and run
                    track_action[arg_data.indexOf(data_row)]=[
                        [temp_obj.testCase]
                        ,[temp_obj.testStep]
                        ,[temp_obj.scenario]
                        ,[temp_obj.test]
                        ,[temp_obj.run]
                    ];
                }
            })
            //send track action
            cy.cyTrackTest(track_action,report_id);
        }
        catch(ex){
            cy.checkUtilConsole(['main.commands => genericRunTest'],[ex]);
        }
})
/***************************************************************/
