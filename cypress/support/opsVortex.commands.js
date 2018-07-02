Cypress.Commands.add("checkVortexUtiltakeScreenShot",(argTitle)=>{
    try{
        cy.wait(5000);
        document.getElementsByClassName('__ADORIC__2').display="none";
        document.getElementsByClassName('__ADORIC__1').display="none";
        cy.get('.ajs-dialog').screenshot(argTitle,'viewport');
    }
    catch(ex){
        console.log("checkVortexUtiltakeScreenShot ::"+ex);
    }
});

Cypress.Commands.add('checkVortexPopInHeader',(argMarket)=>{
    try{
        let tempDate = new Date();
        let title=tempDate.toDateString()+'-'+argMarket+'-HeaderPopin';
        cy.get('#phmainbodytop_0_ctl01_ctl06_loginUrl').click();
        cy.checkVortexUtiltakeScreenShot(title);
    }
    catch(ex){
        console.log("checkVortexPopinHeader ::"+ex);
    }
});
