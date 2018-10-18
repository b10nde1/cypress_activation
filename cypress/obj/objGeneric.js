/***************************************************************/
//Object 
class ObjGeneric{
    //constructor
    constructor (arg_testCase: string, arg_testStep: string, arg_scenario: string, arg_test: string,arg_run: boolean, arg_action: string, arg_value: string, arg_data: string){
        this.testCase=arg_testCase;
        this.testStep=arg_testStep;
        this.scenario=arg_scenario;
        this.test=arg_test;
        this.run=arg_run;
        this.action=arg_action;
        this.value=arg_value;
        this.data=arg_data;
    }
    //list of generic commands
    //arg=[value][data][testCase][testStep]
    let cy=require('../support/generic.commands');
    viewport=(arg: Array)=>{cy.cmViewport(arg);}
    openUrl=(arg: Array)=>{cy.cmOpenUrl(arg);}
    wait=(arg: Array)=>{cy.cmWait(arg);}
    scrollTo=(arg: Array)=>{cy.cmScrollTo(arg);}
    click=(arg: Array)=>{cy.cmClick(arg);}
    verifyAttr=(arg: Array)=>{cy.cmVerifyAttr(arg);}
    verifyTextContains=(arg: Array)=>{cy.cmVerifyTextContains(arg);}
    verifyElementPresent=(arg: Array)=>{cy.cmVerifyElementPresent(arg);}
    download_xml=(arg: Array)=>{cy.cmDownloadXml(arg);}
    capture=(arg: Array)=>{cy.cmCapture(arg);}
    googlePageSpeed=(arg: Array)=>{cy.cmGooglePageSpeed(arg);}
    getLinks=(arg: Array)=>{cy.cmGetLinks(arg);}
}
module.exports=ObjGeneric;