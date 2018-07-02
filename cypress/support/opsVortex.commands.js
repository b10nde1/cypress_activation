Cypress.Commands.add("checkVortexUtiltakeScreenShot",(argTitle,argIfForVortexPopin)=>{
    try{
        document.getElementsByClassName('__ADORIC__2').display="none";
        document.getElementsByClassName('__ADORIC__1').display="none";
        if(argIfForVortexPopin)cy.get('.ajs-dialog').screenshot(argTitle);
        else cy.screenshot(argTitle);
    }
    catch(ex){
        console.log("checkVortexUtiltakeScreenShot ::"+ex);
    }
});

const checkVortexUtilPrepareTitle=(argMarket,argFunction)=>{
    try{
        let tempDate = new Date();
        let result = tempDate.toDateString()+'-'+argMarket+'-'+argFunction;
        return result;
    }
    catch(ex){
        console.log("checkVortexUtilPrepareTitle ::"+ex);
    }
};

Cypress.Commands.add('checkVortexPopInHeader',(argMarket)=>{
    try{
        let title=checkVortexUtilPrepareTitle(argMarket,'checkVortexPopInHeader');
        cy.get('#phmainbodytop_0_ctl01_ctl06_loginUrl').click();
        cy.checkVortexUtiltakeScreenShot(title,true);
    }
    catch(ex){
        console.log("checkVortexPopinHeader ::"+ex);
    }
});

Cypress.Commands.add('checkVortexOpenAndTakeScreenShot',(argElmnt)=>{
    try{
        let title=checkVortexUtilPrepareTitle(argElmnt,'full_page');
        cy.checkVortexUtiltakeScreenShot(title,false);
    }
    catch(ex){
        console.log("checkVortexOpenAndTakeScreenShot ::"+ex);
    }
});
