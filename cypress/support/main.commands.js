//import ObjGeneric
let ObjGeneric=require('../obj/objGeneric');
/***************************************************************/
//Main function for generic commands
//arg_testCase: string, arg_testStep: string, arg_scenario: string, arg_test: string
//arg_run: boolean, arg_action: string, arg_value: string, arg_data: string
const genericRunTest=(arg_data: Array):ObjGeneric=>{
        try{
            let result_list_action=new Array(arg_data.length);
            let compt_list_acion=0;
            arg_data.forEach(data_row=>{
                let temp_obj=new ObjGeneric(data_row[0],data_row[1],data_row[2],data_row[3],data_row[4],
                    data_row[5],data_row[6],data_row[7]);
                //send objGeneric
                result_list_action[compt_list_acion]=temp_obj;
                compt_list_acion++;
            })
            return result_list_action;
        }
        catch(ex){
           console.warn('main.commands => genericRunTest => '+ex);
        }
};
/***************************************************************/
module.exports.genericRunTest=genericRunTest;