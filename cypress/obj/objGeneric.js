/***************************************************************/
//Object 
class ObjGeneric{
    //constructor
    constructor (arg_testCase: string, arg_testStep: string, arg_scenario: string, arg_test: string,arg_run: boolean, arg_action: string, arg_value: string, arg_data: string){
        this.testCase=String(arg_testCase);
        this.testStep=String(arg_testStep);
        this.scenario=String(arg_scenario);
        this.test=String(arg_test);
        this.run=String(arg_run);
        this.action=String(arg_action);
        this.value=String(arg_value);
        this.data=String(arg_data);
    }
    //list of generic commands
    //arg=[value][data][testCase][testStep]
    viewport(arg: Array){cy.cyViewport(arg[0],arg[1]);}
    openUrl(arg: Array){cy.cyOpenUrl(arg[1]);}
    wait(arg: Array){cy.cyWait(arg[1]);}
    scrollTo(arg: Array){cy.cyScrollTo(arg[0]);}
    click(arg: Array){cy.cyClick(arg[0],arg[1]);}
    verifyAttr(arg: Array){cy.cyVerifyAttr(arg[0],arg[1]);}
    verifyTextContains(arg: Array){cy.cyVerifyTextContains(arg[0],arg[1]);}
    verifyElementPresent(arg: Array){cy.cyVerifyElementPresent(arg[0]);}
    download_xml(arg: Array){cy.cyDownloadXml(arg[1]);}
    capture(arg: Array){cy.cyCapture(arg[0],arg[1],arg[2],arg[3]);}
    googlePageSpeed(arg: Array){cy.cyGooglePageSpeed(arg[1],arg[2],arg[3]);}
    getLinks(arg: Array){cy.cyGetLinks(arg[1],arg[2],arg[3]);}
    typeText(arg: Array){cy.cyTypeText(arg[0],arg[1]);}
    sourceCode(arg: Array){cy.cySourceCode(arg[1]);}
}
module.exports=ObjGeneric;