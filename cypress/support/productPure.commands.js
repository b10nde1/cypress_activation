//***************************************************************************************//
//**List Funtction Product Pure**//
Cypress.Commands.add('checkDataHub',(argHubDataActionDetail,argHubThumbnail,argHubProdcutOasisText)=>{
    let hub=['Newborn','Baby','Toddler'];
    for(var compt=0;compt<3;compt++){
        cy.get('.slider-menu__item').contains(hub[compt]).click();
        cy.get('.box.box-product-oasis.event_internal_link').should('have.attr','data-action-detail',argHubDataActionDetail);
        cy.get('.box-product-oasis__thumbnail').contains(argHubThumbnail);
        cy.get('.box-product-oasis__text').contains(argHubProdcutOasisText);
    }
});