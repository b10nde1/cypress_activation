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