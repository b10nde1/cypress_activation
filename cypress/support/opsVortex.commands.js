Cypress.Commands.add("checkVortexUtiltakeScreenShot",(argTitle,argTakeSpecificSection,argCssSection)=>{
    try{
        document.getElementsByClassName('__ADORIC__2').display="none";
        document.getElementsByClassName('__ADORIC__1').display="none";
        if(argTakeSpecificSection)cy.get(argCssSection).screenshot(argTitle);
        else cy.screenshot(argTitle);
    }
    catch(ex){
        console.log("checkVortexUtiltakeScreenShot ::"+ex);
    }
});

const checkVortexUtilPrepareTitle=(argMarket,argFunction)=>{
    try{
        let tempDate = new Date();
        let result = argMarket+'-'+argFunction+tempDate.getTime();
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
        cy.checkVortexUtiltakeScreenShot(title,true,'.ajs-dialog');
    }
    catch(ex){
        console.log("checkVortexPopinHeader ::"+ex);
    }
});

Cypress.Commands.add('checkVortexOpenAndTakeScreenShot',(argElmnt,argCssSection)=>{
    try{
        let title=checkVortexUtilPrepareTitle(argElmnt,'full_page');
        if(argCssSection)cy.checkVortexUtiltakeScreenShot(title,true,argCssSection);
        else cy.checkVortexUtiltakeScreenShot(title,false);
    }
    catch(ex){
        console.log("checkVortexOpenAndTakeScreenShot ::"+ex);
    }
});