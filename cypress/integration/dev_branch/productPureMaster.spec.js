//***************************************************************************************//
//**Load Data**//
import dataFromJson from '../../fixtures/data.json';
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
//***************************************************************************************//
//**Config**//
    let confBaseUrl=dataFromJson.confBaseUrl;
    let confTranslationForProduct=dataFromJson.confTranslationForProduct;
    let confHubDataActionDetail=dataFromJson.confHubDataActionDetail;
    let confHubThumbnail=dataFromJson.confHubThumbnail;
    let confHubProdcutOasisText=dataFromJson.confHubProdcutOasisText;
//***************************************************************************************//
//**Cypress**//
    beforeEach(() => {
        //Gestion d'erreur
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        //resolution 
        cy.viewport(1366, 768);
    });
    it('Product Pure TC01 || Verify Product Hub',()=>{
        cy.visit(confBaseUrl);
        cy.get('.js-menu-list').contains(confTranslationForProduct).click();
        //verify if Product Pure is present in each hub
        cy.checkDataHub(confHubDataActionDetail,confHubThumbnail,confHubProdcutOasisText);
    });
    /*it('Product Pure TC02 || Verify Product Pure LP',()=>{

    });
    it('Product Pure TC03 || Verify Wipes',()=>{

    });
    it('Product Pure TC04 || Verify Diapers',()=>{

    });*/
});