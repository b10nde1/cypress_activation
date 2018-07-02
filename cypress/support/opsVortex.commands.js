Cypress.Commands.add('checkVortexPopInHeader',(argMarket)=>{
    try{
        let tempDate = new Date();
        let title=tempDate.toDateString()+'-'+argMarket+'-HeaderPopin';
        cy.wait(5000);
        cy.get('#phmainbodytop_0_ctl01_ctl06_loginUrl').click();
        cy.screenshot(title,'viewport');
    }
    catch(ex){
        console.log("checkVortexPopinHeader ::"+ex);
    }
});
