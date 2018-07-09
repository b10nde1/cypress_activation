import dataFromJson from '../../fixtures/data/outbrainv2.json';
describe('Outbrain',()=>{
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        for(var compt=0;compt<argSplit.length;compt++){
            result[compt]=argSplit[compt];
        }
        return result;
    };
    const getTable2DFromJson=(argTableTestimonialContent)=>{
        let result=new Array(argTableTestimonialContent.length);
        for(var compt=0;compt<argTableTestimonialContent.length;compt++){
            result[compt]=alignTableFromJson(argTableTestimonialContent[compt].split('/*/'));
            result[compt][0]=result[compt][0].replace("[","");
            result[compt][1]=result[compt][1].replace("]","");
        }
        return result;
    };
    let listUrls=getTable2DFromJson(dataFromJson.urls.split('],['));
    let dateReport=new Date();
    let reportId=dateReport.getTime();
    let confScreenShotMobile=dataFromJson.screenShotMobile;
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
    });
    for(var compt=0;compt<listUrls.length;compt++){
        let temp=compt;
        //open Url
        //check og title and url
        it('Open URL for :: '+listUrls[temp][0]+'',()=>{
            cy.viewport(1600, 1200);
            cy.visit(listUrls[temp][1]);
        });
        //take screenshot
        it('TC'+temp+'-0 Article V2 take screenshot ::'+listUrls[temp][0]+'',()=>{
            cy.checkVortexOpenAndTakeScreenShot('TC'+temp+' '+listUrls[temp][0]);
        });
    }
    if(confScreenShotMobile){
        for(var compt=0;compt<listUrls.length;compt++){
            let temp=compt;
            //take screenshot on mobile
                it('MobileVersion-'+temp+' :: '+listUrls[temp][0]+'',()=>{
                    cy.viewport(320, 480);
                    cy.visit(listUrls[temp][1]);
                    cy.checkVortexOpenAndTakeScreenShot('MobileVersion-'+temp+'-'+listUrls[temp][0]+'');
                });
            }
    }
    //report json for screenshot with tcid+article name + url
    it('Report id :: articlev2Id'+reportId+'',()=>{
        cy.checkArticleV2Report(listUrls,reportId);
    });
});