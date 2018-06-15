//***************************************************************************************//
//**List Funtction Product Pure**//
Cypress.Commands.add('checkProductPureDataHub',(argHubThumbnail,argHubProdcutOasisText)=>{
    let hub=['Newborn','Baby','Toddler'];
    for(var compt=0;compt<3;compt++){
        cy.get('.slider-menu__item').contains(hub[compt]).click();
        cy.get('.l-main__container').children().contains(argHubProdcutOasisText).parent('div').should('have.attr','data-action-detail','hub_'+hub[1].toLowerCase()+'_pampers-pure');
        cy.get('.box-product-oasis__thumbnail').contains(argHubThumbnail);
        cy.get('.box-product-oasis__text').contains(argHubProdcutOasisText);
    }
});
Cypress.Commands.add('checkProductPureBanner',(argTitle,argImgAlt,argShortText)=>{
    cy.get('.pure-top-landing__content').contains(argTitle);
    cy.get('.pure-top-landing__image').children('picture').children('img').should('have.attr','alt',argImgAlt[0]);
    cy.get('.pure-top-landing__protection').children('img').should('have.attr','alt',argImgAlt[1]);
    cy.get('.pure-top-landing__protection').contains(argShortText);
});