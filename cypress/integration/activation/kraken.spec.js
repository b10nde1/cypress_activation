import dataFromJson from '../../fixtures/data/kraken.json';
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
        it('Kraken '+listMarkets[temp][0]+'',()=>{
            cy.visit(listMarkets[temp][1]);
            cy.checkVortexOpenAndTakeScreenShot(listMarkets[temp][0]);
        });
    }
})