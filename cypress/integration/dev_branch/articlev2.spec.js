import dataFromJson from '../../fixtures/data/articlev2.json';
describe('Screenshot', () => {
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
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        cy.viewport(1600, 1200);
    });
    for(var compt=0;compt<listUrls.length;compt++){
        let temp=compt;
        //open Url
        //check og title and url
        it('TC'+temp+'-Check Page Info ::'+listUrls[temp][0]+'',()=>{
            cy.visit(listUrls[temp][1]);
            cy.checkArticleV2PageInfo(listUrls[temp]);
        });
        //take screenshot
        it('TC'+temp+'-0 Article V2 take screenshot ::'+listUrls[temp][0]+'',()=>{
            cy.checkVortexOpenAndTakeScreenShot('TC'+temp+' '+listUrls[temp][0]);
        });
        //verify if element breadcumb contains itemptype data-vocabulary.org/breadcrumb
        it('TC'+temp+'-1 Article V2 verify element braedcrumb vocabulary is present ::'+listUrls[temp][0]+'',()=>{
            cy.checkArticleV2Breadcrumb();
        });
        //verify element title is present
        it('TC'+temp+'-2 Article V2 verify element Title class is present ::'+listUrls[temp][0]+'',()=>{
            cy.checkArticleV2Title();
        });
        //verify element author name is present
        //both header and footer
        it('TC'+temp+'-3 Article V2 verify data action detail for element author name ::'+listUrls[temp][0]+'',()=>{
            cy.checkArticleV2AuthorName();
        });
        //verify element read time section is present
        it('TC'+temp+'-4 Article V2 Verify CSS class for element date and time ::'+listUrls[temp][0]+'',()=>{
            cy.checkArticleV2DateAndTimeInfo();
        });
        //verify element share and print is present
        it('TC'+temp+'-5 Article V2 Verify both Share section and print icon are present ::'+listUrls[temp][0]+'',()=>{
            cy.checkArticleV2ShareSection();
        });
        //verift element like section is present
        it('TC'+temp+'-6 Article V2 Verify element like icon is present ::'+listUrls[temp][0]+'',()=>{
            cy.checkArticleV2LikeIcon();
        });
        //verify element progressbar is present
        //check div.child(progress).should.max="100"
        it('TC'+temp+'-7 Article V2 Verify element progressbar is present ::'+listUrls[temp][0]+'',()=>{
            cy.checkArticleV2ProgressBar();
        });
    }
    //report json with tcid+article name + url
    it('Report id :: articlev2Id'+reportId+'',()=>{
        cy.checkArticleV2Report(listUrls,reportId);
    });
})