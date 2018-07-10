import dataFromJson from '../../fixtures/data/outbrainv2.json';
describe('Outbrain V2',()=>{
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        for(var compt=0;compt<argSplit.length;compt++){
            result[compt]=argSplit[compt];
        }
        return result;
    };
    const getTable2DFromJson=(argTableTestimonialContent)=>{
        try{
            let result=new Array(argTableTestimonialContent.length);
            for(var compt=0;compt<argTableTestimonialContent.length;compt++){
                result[compt]=alignTableFromJson(argTableTestimonialContent[compt].split('/*/'));
                result[compt][0]=result[compt][0].replace("[","");
                result[compt][1]=result[compt][1].replace("]","");
            }
            return result;
        }
        catch(ex){
            console.log("DataIn ::"+argTableTestimonialContent+" | DataOut ::"+result+" | getTable2DFromJson ::"+ex);
        }
    };
    let listUrls=getTable2DFromJson(dataFromJson.urls.split('],['));
    let dateReport=new Date();
    let reportId=dateReport.getTime();
    let confScreenShotMobile=dataFromJson.screenShotMobile;
    let confRecommendedByText=dataFromJson.recommendedText;
    let confH2Title=dataFromJson.h2Title;
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        cy.viewport(1600, 1200);
    });
    for(var compt=0;compt<1;compt++){
        let temp=compt;
        //open Url
        //check og title and url
        it('Open URL for :: '+listUrls[temp][0]+'',()=>{
            cy.visit(listUrls[temp][1]);
        });
        //take screenshot
        it('TC'+temp+'-0 Outbrain V2 take screenshot ::'+listUrls[temp][0]+'',()=>{
            cy.wait(6000);
            cy.checkVortexOpenAndTakeScreenShot('TC'+temp+'-OutbrainV2-'+listUrls[temp][0],'.c-suggestion-v2.js-outbrain-v2');
        });
        /*
        //verify 3 closed box are present
        it('TC'+temp+'-1 Outbrain V2 verify element closed box ::'+listUrls[temp][0]+'',()=>{
            cy.checkOutbrainV2ClosedBox();
        });
        //verify footer text
        it('TC'+temp+'-2 Outbrain V2 verify footer text ::'+listUrls[temp][0]+'',()=>{
            cy.checkOutbrainV2FooterText(confRecommendedByText);
        });
        //verify Outbrain Popin
        it('TC'+temp+'-3 Outbrain V2 verify Popin ::'+listUrls[temp][0]+'',()=>{
            cy.checkOutbrainV2Popin(confRecommendedByText);
        });
        //Verify h1 for outbrain section 
        it('TC'+temp+'-4 Outbrain V2 verify title is present ::'+listUrls[temp][0]+'',()=>{
            cy.checkOutbrainV2H2Title(confH2Title);
        });
        */
    }
    //screenshot on mobiles
    if(confScreenShotMobile){
        try{
            if(listUrls===null)throw("Error || confScreenShotMobile :: ListUrls is null");
            for(var compt=0;compt<1;compt++){
                let temp=compt;
                it('MobileVersion-Outbrain-'+temp+' :: '+listUrls[temp][0]+'',()=>{
                    cy.viewport(320, 480);
                    cy.visit(listUrls[temp][1]);
                    cy.wait(6000);
                    cy.checkVortexOpenAndTakeScreenShot('MobileVersion-Outbrain-'+temp+'-'+listUrls[temp][0],'.c-suggestion-v2.js-outbrain-v2');
                });
            }
        }
        catch(ex){
            console.log("Error || confScreenShotMobile === true ::"+ex);
        }
    }
    //report json for screenshot with tcid+article name + url
    it('Report id :: OutbrainV2id'+reportId+'',()=>{
        cy.checkGlobalScreenShotReport('outbrainV2',listUrls,reportId);
    });
});