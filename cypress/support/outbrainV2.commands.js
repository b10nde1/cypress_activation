Cypress.Commands.add('checkOutbrainV2ClosedBox',()=>{
    try{
        cy.wait(6000);
        cy.get('.outbrain_container a').should(($a) => {expect($a).to.have.length(3)});
    }
    catch(ex){
        console.log('checkOutbrainV2ClosedBox ::'+ex);
    }
});
const preparOutbrainRecommendedText=(argText)=>{
    try{
        let textLowerCase=argText.toLowerCase();
        return textLowerCase.charAt(0).toUpperCase()+textLowerCase.slice(1);
    }
    catch(ex){
        console.log("preparOutbrainRecommendedText ::"+ex);
    }
};
Cypress.Commands.add('checkOutbrainV2FooterText',(argFooterText)=>{
    try{
        cy.get('.ob-api-what.ob-one-line').children('span').contains(preparOutbrainRecommendedText(argFooterText));
    }
    catch(ex){
        console.log('checkOutbrainV2FooterText ::'+ex);
    }
});
Cypress.Commands.add('checkOutbrainV2Popin',(argText)=>{
    try{
        cy.get('.ob-api-what.ob-one-line').children('span.ob-text').contains(preparOutbrainRecommendedText(argText)).click({force:true});
        cy.wait(6000);
        cy.get('#ob_iframe_modal').should('have.attr','class','ob_iframe_modal');
        cy.get('.ob_modal_close').click({force:true});

    }
    catch(ex){
        console.log('checkOutbrainV2Popin ::'+ex);
    }
});
const prepareH2Title=(argTitle)=>{
    return containspreparOutbrainRecommendedText(argTitle+':');
};
Cypress.Commands.add('checkOutbrainV2H2Title',(argTitle)=>{
    try{
        cy.get('.c-suggestion-v2__title').contains(prepareH2Title(argTitle));
    }
    catch(ex){
        console.log('checkOutbrainV2H2Title ::'+ex);
    }
});