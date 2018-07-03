Cypress.Commands.add('checkArticleV2Breadcrumb',()=>{
    try{
        cy.get('.c-breadcrumb__list').should('have.attr','itemtype','http://data-vocabulary.org/Breadcrumb');
    }
    catch(ex){
        console.log('checkArticleV2Breadcrumb ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2Title',()=>{
    try{
        cy.get('.article-oasis__title');
    }
    catch(ex){
        console.log('checkArticleV2Title ::'+ex);
    }
});