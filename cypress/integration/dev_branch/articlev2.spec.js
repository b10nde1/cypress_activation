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
    let listMarkets=getTable2DFromJson(dataFromJson.urls.split('],['));
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        cy.viewport(1600, 1200);
    });
    for(var compt=0;compt<listMarkets.length;compt++){
        let temp=compt;
        it('Article V2 take screenshot'+listMarkets[temp][0]+'',()=>{
            cy.visit(listMarkets[temp][1]);
            cy.checkVortexOpenAndTakeScreenShot(listMarkets[temp][0]);
        });
        it('Article V2 verify element braedcrumb is present '+listMarkets[temp][0]+'',()=>{
            cy.checkArticleV2Breadcrumb();
        });
        //verify element title is present

        //verify element author name is present
        //both header and footer

        //verify element read time section is present

        //verift element like section is present

        //verify element progressbar is present
        //check div.child(progress).should.max="100"

        //verify element print is present

    }
})