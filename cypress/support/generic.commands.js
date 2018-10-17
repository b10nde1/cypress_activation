/***************************************************************/
//Object 
const objGeneric=(arg_testCase: string, arg_testStep: string, arg_scenario: string, arg_test: string
    , arg_run: boolean, arg_action: string, arg_value: string, arg_data: string)=>{
        let attr={
            testCase:arg_testCase
            ,testStep:arg_testStep
            ,scenario:arg_scenario
            ,test:arg_test
            ,run:arg_run
            ,action:arg_action
            ,value:arg_value
            ,data:arg_data
        };
        return attr;
}

/***************************************************************/
//Main function for generic commands
//arg_testCase: string, arg_testStep: string, arg_scenario: string, arg_test: string
//arg_run: boolean, arg_action: string, arg_value: string, arg_data: string
Cypress.Commands.add('genericRunTest',(arg_data: Array)=>{
        try{
            let data_column=arg_data[0];
            arg_data.forEach(data_row=>{
                if(arg_data.indexOf(data_row)!=0){
                    let temp_obj=objGeneric(Element[0],Element[1],Element[2],Element[3],Element[4],
                        Element[5],Element[6],Element[7]);
                    if(temp_obj.run){
                        //verify what the action 
                        let temp_obj_method=new object;
                        cy.checkUtilConsole(['TestCase','TestStep','Scenario','Test']
                            ,[temp_obj.testCase,temp_obj.testStep,temp_obj.scenario,temp_obj.test]);
                        temp_obj_method[temp_obj.action]([temp_obj.value,temp_obj.data]);
                    }
                }
            })
        }
        catch(ex){
            cy.checkUtilConsole(['generic.commands => genericRunTest'],[ex]);
        }
})

/***************************************************************/
//utilitary
//Verify if blank or n/a
const verifyNoNaOrBlank=(arg_function: string, arg_element: any)=>{
    if(arg_element=='n/a')throw ('generic.commands => '+arg_function+' :: ALL DATA N/A')
    if(arg_element==' ')throw ('generic.commands => '+arg_function+' :: ALL DATA BLANK')
}

/***************************************************************/
let obj_method=new Object;
//list of method for this object
obj_method.viewport=(arg: Array)=>{cy.cyViewport(arg[0],arg[1]);}
obj_method.openUrl=(arg: Array)=>{cy.cyOpenUrl(arg[1]);}
obj_method.wait=(arg: Array)=>{cy.cyWait(arg[1]);}
obj_method.scrollTo=(arg: Array)=>{cy.cyScrollTo(arg[0]);}
obj_method.click=(arg: Array)=>{cy.cyClick(arg[0],arg[1]);}
obj_method.verifyAttr=(arg: Array)=>{cy.cyVerifyAttr(arg[0],arg[1]);}
obj_method.verifyTextContains=(arg: Array)=>{cy.cyVerifyTextContains(arg[0],arg[1]);}
obj_method.verifyElementPresent=(arg: Array)=>{cy.cyVerifyElementPresent(arg[0]);}


/***************************************************************/
//Cypress Commands
//verifyElementPresent
//element | n/a
Cypress.Commands.add('cyVerifyElementPresent',(arg_value: string)=>{
    try{
        verifyNoNaOrBlank(arg_value);
        cy.checkUtilConsole(['INFO','generic.commands => cyVerifyElementPresent']
            ,['Verify if element is present','Element => '+arg_value]);
        cy.get(arg_value);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyVerifyElementPresent'],[ex]);
    }
})

//verifyTextContains
//element | expected text
Cypress.Commands.add('cyVerifyTextContains',(arg_value: string, arg_data: string)=>{
    try{
        verifyNoNaOrBlank(arg_value);
        verifyNoNaOrBlank(arg_data);
        cy.checkUtilConsole(['INFO','generic.commands => cyVerifyTextContains'],['Verify text','Get => '+arg_value+' Contains => '+arg_data]);
        cy.get(arg_value).contains(arg_data);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyVerifyTextContains'],[ex]);
    }
})

//verifyAttr => href, alt,...
//css location | [href][expected data]
Cypress.Commands.add('cyVerifyAttr',(arg_value: string, arg_data: string)=>{
    try{
        verifyNoNaOrBlank(arg_value);
        verifyNoNaOrBlank(arg_data);
        //get both attribute and value from arg_data field 
        let arg_data_attr=arg_data.split('][');
        arg_data_attr[0]=arg_data_attr[0].replace("[","");
        arg_data_attr[1]=arg_data_attr[1].replace("]","");
        cy.checkUtilConsole(['INFO','generic.commands => cyVerifyAttr']
            ,['Verify Attribute','Location => '+arg_value+' attribute => '+arg_data_attr[0]+' value => '+arg_data_attr[1]]);
        cy.get(arg_value).should('have.attr'
            ,arg_data_attr[0]
            ,arg_data_attr[1]
        );
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyVerifyAttr'],[ex]);
    }
})

//click
//value (css location) | next (text in the section if applicable) - n/a (if not applicable)
Cypress.Commands.add('cyClick',(arg_value: string, arg_data: string)=>{
    try{
        verifyNoNaOrBlank(arg_value);
        if(arg_data!='n/a'){
            verifyNoNaOrBlank(arg_data);
            cy.checkUtilConsole(['INFO','generic.commands => cyClick'],['Click','Get => '+arg_value+' Contains => '+arg_data]);
            cy.get(arg_value).contains(arg_data).click();
        }
        else{
            cy.checkUtilConsole(['INFO','generic.commands => cyClick'],['Click - without arg_data','Get => '+arg_value]);
            cy.get(arg_value).click();
        }
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyClick'],[ex]);
    }
})

//scrollTo
//footer (balise section) | n/a
Cypress.Commands.add('cyScrollTo',(arg_value: string)=>{
    try{
        verifyNoNaOrBlank(arg_value);
        cy.checkUtilConsole(['INFO','generic.commands => cyScrollTo'],['Scroll To',arg_value]);
        cy.get(arg_value).scrollIntoView();
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyScrollTo'],[ex]);
    }
});

//wait
//n/a | 8 (value in second)
Cypress.Commands.add('cyWait',(arg_data: string)=>{
    try{
        verifyNoNaOrBlank(arg_data);
        let value_number=0;
        try{
            value_number=(Number(arg_data))*1000;
        }
        catch(ex_value){
            cy.checkUtilConsole(['generic.commands => cyWait => value_number'],[ex_value]);
        }
        cy.checkUtilConsole(['INFO','generic.commands => cyWait'],['Wait',value_number+'ms']);
        cy.wait(value_number);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyWait'],[ex]);
    }
});

//openUrl 
//n/a | url
Cypress.Commands.add('cyOpenUrl',(arg_data: string)=>{
    try{
        verifyNoNaOrBlank(arg_data);
        if(arg_data.split('//')[0]!='http' || arg_data.split('//')[0]!='https')throw ('generic.commands => cyOpenUrl :: MISSING HTTP / HTTPS IN URL')
        cy.checkUtilConsole(['INFO','generic.commands => cyOpenUrl'],['Open URL',arg_data]);
        cy.visit(arg_data);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyViewport'],[ex]);
    }
});

//viewport
//desktop - mobile - n/a | n/a - n/a - 500x500 (custom dimension)
Cypress.Commands.add('cyViewport',(arg_value: string, arg_data: string)=>{
    try{
        let device_dimension=[[1600,1200],[320,480]];
        let list_device=['desktop','mobile'];
        let conf_width=0;let conf_height=0;
        if(arg_value=='n/a'){
            verifyNoNaOrBlank('cyViewport',arg_data);
            let new_dimension=arg_data.split('x');
            conf_width=Number(new_dimension[0]);
            conf_height=Number(new_dimension[1]);
        }
        else{
            verifyNoNaOrBlank('cyViewport',arg_value);
            list_device.forEach(Element=>{
                if(Element==arg_value.toLowerCase()){
                    conf_width=device_dimension[list_device.indexOf(Element)[0]];
                    conf_height=device_dimension[list_device.indexOf(Element)[1]];
                }
            })
        }
        cy.checkUtilConsole(['INFO','generic.commands => cyViewport'],['Width and Height for viewport',conf_width+'x'+conf_height]);
        cy.viewport(conf_width,conf_height);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyViewport'],[ex]);
    }
});


