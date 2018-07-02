//***************************************************************************************//
//**Load Data**//
import dataFromJson from '../../fixtures/opsVortex.json';
describe('Guides and downloadables', () => {
//***************************************************************************************//
//**util**//
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
    const selectMarket=(argRun,argListMarkets)=>{
        try{
            let result=new Array(2);
            for(var compt=0;compt<argListMarkets.length;compt++){
                if(argRun===argListMarkets[compt][0]){
                    result[0]=argRun;
                    result[1]=argListMarkets[compt][1];
                }
            }
            return result;
        }
        catch(ex){
            console.log("opsVortex.spec.js | selectMarket ::"+ex);
        }
    }
//***************************************************************************************//
//**getDataFromJson**//  
    let listMarkets=getTable2DFromJson(dataFromJson.markets.split('],['));
    let market=selectMarket(dataFromJson.run,listMarkets);
    beforeEach(() => {
        //Gestion d'erreur
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        //resolution 
        cy.viewport(2900, 2200);
    });
    it('VortexChecking || Verify Vortex Popin - Header ', () => {
        cy.visit(market[1]);
        cy.checkVortexPopInHeader(market[0]);
    });
})