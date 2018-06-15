//***************************************************************************************//
//**List Funtction Product Pure**//
Cypress.Commands.add('checkProductPureDataHub',(argHubThumbnail,argHubProdcutOasisText)=>{
    try{
        let hub=['Newborn','Baby','Toddler'];
        for(var compt=0;compt<3;compt++){
            cy.get('.slider-menu__item').contains(hub[compt]).click();
            cy.get('.l-main__container').children().contains(argHubProdcutOasisText).parent('div').should('have.attr','data-action-detail','hub_'+hub[1].toLowerCase()+'_pampers-pure');
            cy.get('.box-product-oasis__thumbnail').contains(argHubThumbnail);
            cy.get('.box-product-oasis__text').contains(argHubProdcutOasisText);
        }
    }
    catch(ex){
        console.log("checkProductPureDataHub ::"+ex);
    }
});
Cypress.Commands.add('checkProductPureBanner',(argTitle,argImgAlt,argShortText)=>{
    try{
        cy.get('.pure-top-landing__content').contains(argTitle);
        cy.get('.pure-top-landing__image').children('picture').children('img').should('have.attr','alt',argImgAlt[0]);
        cy.get('.pure-top-landing__protection').children('img').should('have.attr','alt',argImgAlt[1]);
        cy.get('.pure-top-landing__protection').contains(argShortText);
    }
    catch(ex){
        console.log("checkProductPureBanner ::"+ex);
    }
});
Cypress.Commands.add('checkProductPurePresentaiton',(argTitle,argDescription,argImgAlt,argBtn,argAdditionalText)=>{
    try{
        cy.get('.pure-presentation__title').contains(argTitle);
        cy.get('.pure-presentation__text').contains(argDescription);
        cy.get('.pure-presentation__image').children('img').should('have.attr','alt',argImgAlt);
        cy.get('#phmainproductcollection_0_ctl09_BuySectionPh').children('div.pure-presentation__btn').children('a').should('have.attr','data-action-detail',argBtn[0].toLowerCase().replace(' ','_')).contains(argBtn[0]);
        cy.get('#phmainproductcollection_0_ctl09_BuySectionPh').children('div.pure-presentation__btn').children('a').next().should('have.attr','data-action-detail',argBtn[1].toLowerCase().replace(' ','_')).contains(argBtn[1]);
        if(argAdditionalText)cy.get('.pure-additional-text').contains(argAdditionalText);
    }
    catch(ex){
        console.log("checkProductPurePresentaiton ::"+ex);
    }
});