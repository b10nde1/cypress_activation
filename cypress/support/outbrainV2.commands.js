//unable to get <a>
Cypress.Commands.add('checkOutbrainV2ClosedBox',()=>{
    try{
        cy.get('.outbrain_container a').should(($a) => {expect($a).to.have.length(3)});
    }
    catch(ex){
        console.log('checkOutbrainV2ClosedBox ::'+ex);
    }
});
const preparOutbrainRecommendedText=(argText)=>{
    try{
        let textLowerCase=argText.toLowerCase();
        return textLowerCase.charAt[0].toUpperCase()+textLowerCase.slice(1);
    }
    catch(ex){
        console.log("preparOutbrainRecommendedText ::"+ex);
    }
};
Cypress.Commands.add('checkOutbrainV2FooterText',(argFooterText)=>{
    try{
        cy.get('.ob-api-what.ob-one-line').children('span').containspreparOutbrainRecommendedText((argFooterText));
    }
    catch(ex){
        console.log('checkOutbrainV2FooterText ::'+ex);
    }
});
Cypress.Commands.add('checkOutbrainV2Popin',()=>{
    try{
        cy.get('.ob-api-what.ob-one-line').click({force:true});
        //unable to get .mainContent -> need to wait outbrain js 
        cy.get('.mainContentContainer').children('div.logo');
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