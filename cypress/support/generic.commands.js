/***************************************************************/
//map function for visibility
const cmViewport=(arg: Array)=>{cy.cyViewport(arg[0],arg[1]);}
const cmOpenUrl=(arg: Array)=>{cy.cyOpenUrl(arg[1]);}
const cmWait=(arg: Array)=>{cy.cyWait(arg[1]);}
const cmScrollTo=(arg: Array)=>{cy.cyScrollTo(arg[0]);}
const cmClick=(arg: Array)=>{cy.cyClick(arg[0],arg[1]);}
const cmVerifyAttr=(arg: Array)=>{cy.cyVerifyAttr(arg[0],arg[1]);}
const cmVerifyTextContains=(arg: Array)=>{cy.cyVerifyTextContains(arg[0],arg[1]);}
const cmVerifyElementPresent=(arg: Array)=>{cy.cyVerifyElementPresent(arg[0]);}
const cmDownload_xml=(arg: Array)=>{cy.cyDownloadXml(arg[1]);}
const cmCapture=(arg: Array)=>{cy.cyCapture(arg[0],arg[1],arg[2],arg[3]);}
const cmGooglePageSpeed=(arg: Array)=>{cy.cyGooglePageSpeed(arg[1],arg[2],arg[3]);}
const cmGetLinks=(arg: Array)=>{cy.cyGetLinks(arg[1],arg[2],arg[3]);}
const cmTypeText=(arg: Array)=>{cy.cyTypeText(arg[0],arg[1]);}
//export to ObjGeneric
module.exports.cmViewport=cmViewport;
module.exports.cmOpenUrl=cmOpenUrl;
module.exports.cmWait=cmWait;
module.exports.cmScrollTo=cmScrollTo;
module.exports.cmClick=cmClick;
module.exports.cmVerifyAttr=cmVerifyAttr;
module.exports.cmVerifyTextContains=cmVerifyTextContains;
module.exports.cmVerifyElementPresent=cmVerifyElementPresent;
module.exports.cmDownload_xml=cmDownload_xml;
module.exports.cmCapture=cmCapture;
module.exports.cmGooglePageSpeed=cmGooglePageSpeed;
module.exports.cmGetLinks=cmGetLinks;
module.exports.cmTypeText=cmTypeText;
/***************************************************************/
//Import util
let util_commands=require('./util.commands');
/***************************************************************/
//Cypress Commands
//track test
//record all action for each step
Cypress.Commands.add('cyTrackTest',(arg_obj: array,arg_id: string)=>{
    try{
        let data_track_action='';
        arg_obj.forEach(data_row=>{
            data_track_action+=
                'Test Case :: '+data_row[0]+'\n'+
                'Test Step :: '+data_row[1]+'\n'+
                'Scenario :: '+data_row[2]+'\n'+
                'Test :: '+data_row[3]+'\n'+
                'Run Status :: '+data_row[4]+'\n'+
                '\n/***************************************************************/\n\n';
        })
        cy.writeFile('cypress/report/track_action/trackReport-'+arg_id+'.txt',data_track_action);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyTrackTest'],[ex]);
    }
})
//typeText
//css section | text
Cypress.Commands.add('cyTypeText',(arg_value : string, arg_data: string)=>{
    try{
        util_commands.verifyNoNaOrBlank(arg_value);
        util_commands.verifyNoNaOrBlank(arg_data);
        cy.get(arg_value).type(arg_data);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyTypeText'],[ex]);
    }
})
//getLinks (Get all links in the page)
//n/a | url (only 1 url per test)
//Cypress.Commands.add('utilGetAllLinksOfCurrentPage',(argTitle: string,argUrl: string,argReportId: Date,argRunStatus: Array)
Cypress.Commands.add('cyGetLinks',(arg_data: string, arg_testCase: string, arg_testStep: string)=>{
    try{
        let title='getLinks-'+arg_testCase+'-'+arg_testStep;
        let date_report=new Date();let report_id=date_report.getTime();
        util_commands.verifyNoNaOrBlank(arg_data);
        let arg_url=' ';
        if(arg_data.split('//')[0]=='http:' || arg_data.split('//')[0]=='https:')arg_url=arg_data
        if(arg_url!=' '){
            cy.utilGetAllLinksOfCurrentPage(
                title,
                arg_url,
                report_id,
                ['a_href:true','script:true','link:true']
            );
        }
        else if(arg_url==' ')console.warn('generic.commands => cyGetLinks :: arg_url is EMPTY')
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyGetLinks'],[ex]);
    }
})
//googlePageSpeed(PageSpeed Result)
//n/a | url
//use pagespeed.commands.js => cy.pageSpeed(arg_data : Array[title][Url])
Cypress.Commands.add('cyGooglePageSpeed',(arg_data: string, arg_testCase: string, arg_testStep: string)=>{
    try{
        util_commands.verifyNoNaOrBlank(arg_data);
        /* 
        Verify if this on ProdCD
        check if url start with www.
        */
        let url_to_scan='';
        if(arg_data.split('.')[0]=='https://www' || arg_data.split('.')[0]=='http://www')url_to_scan=arg_data
        let title=util_commands.generateTitle('googlePageSpeed-'+arg_testCase+arg_testStep);
        cy.checkUtilConsole(['INFO','generic.commands => cyGooglePageSpeed']
            ,['Google Page Speed','Title => '+title]);
        //if url_to_scan is setted, run the test else don't throw an exception but just show an warning information
        if(url_to_scan!='')cy.pageSpeed([[title,url_to_scan]]);
        else console.warn('WARN generic.commands/cyGooglePageSpeed => url_to_scan :: "EMPTY" ');
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commnands => cyGooglePageSpeed'],[ex]);
    }
})
//capture (take screenshot) 
//css section (not mandatory) | title (not mandatory)
Cypress.Commands.add('cyCapture',(arg_value: string, arg_data: string, arg_testCase: string, arg_testStep: string)=>{
    try{
        if(arg_data==' ' || arg_data=='n/a') arg_data='title';
        let title=util_commands.generateTitle(arg_data+'-'+arg_testCase+'-'+arg_testStep);
        cy.checkUtilConsole(['INFO','generic.commands => cyCapture']
            ,['Take screenshot','Title => '+title]);
        if(arg_value==' ' || arg_value =='n/a')cy.checkVortexOpenAndTakeScreenShot(title);
        else cy.checkVortexOpenAndTakeScreenShot(title,arg_value);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyCapture'],[ex]);
    }
})
//download_xml
//n/a | base_url
Cypress.Commands.add('cyDownloadXml',(arg_data: string)=>{
    try{
        util_commands.verifyNoNaOrBlank(arg_data);
        let xml_commands= require('./xml.commands');
        cy.checkUtilConsole(['INFO','generic.commands => cyDownloadXml']
            ,['Download sitemap.xml','Element => '+arg_data]);
        cy.checkUtilDownloadSitemapXML(xml_commands.getSiteMapUrl(xml_commands.getBaseUrl(arg_data)),'sitemap_xml');
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => download_xml'],[ex]);
    }
})
//verifyElementPresent
//element | n/a
Cypress.Commands.add('cyVerifyElementPresent',(arg_value: string)=>{
    try{
        util_commands.verifyNoNaOrBlank(arg_value);
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
        util_commands.verifyNoNaOrBlank(arg_value);
        util_commands.verifyNoNaOrBlank(arg_data);
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
        util_commands.verifyNoNaOrBlank(arg_value);
        util_commands.verifyNoNaOrBlank(arg_data);
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
        util_commands.verifyNoNaOrBlank(arg_value);
        if(arg_data!='n/a'){
            util_commands.verifyNoNaOrBlank(arg_data);
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
        util_commands.verifyNoNaOrBlank(arg_value);
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
        util_commands.verifyNoNaOrBlank(arg_data);
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
        util_commands.verifyNoNaOrBlank(arg_data);
        arg_data=String(arg_data);
        cy.checkUtilConsole(['INFO','generic.commands => cyOpenUrl'],['Open URL',arg_data]);
        cy.visit(arg_data);
    }
    catch(ex){
        cy.checkUtilConsole(['generic.commands => cyOpenUrl'],[ex]);
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
            util_commands.verifyNoNaOrBlank('cyViewport',arg_data);
            let new_dimension=arg_data.split('x');
            conf_width=Number(new_dimension[0]);
            conf_height=Number(new_dimension[1]);
        }
        else{
            util_commands.verifyNoNaOrBlank('cyViewport',arg_value);
            list_device.forEach(Element=>{
                if(Element==arg_value.toLowerCase()){
                    conf_width=device_dimension[list_device.indexOf(Element)][0];
                    conf_height=device_dimension[list_device.indexOf(Element)][1];
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


