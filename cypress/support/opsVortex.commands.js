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
        let result = tempDate.toDateString()+'-'+argMarket+'-'+argFunction+tempDate.getTime();
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

Cypress.Commands.add('checkVortexOpenAndTakeScreenShot',(argElmnt)=>{
    try{
        let title=checkVortexUtilPrepareTitle(argElmnt,'full_page');
        cy.checkVortexUtiltakeScreenShot(title,false);
    }
    catch(ex){
        console.log("checkVortexOpenAndTakeScreenShot ::"+ex);
    }
});
//in case specific css section
Cypress.Commands.add('checkVortexOpenAndTakeScreenShot',(argElmnt,argSection)=>{
    try{
        let title=checkVortexUtilPrepareTitle(argElmnt,'full_page');
        cy.checkVortexUtiltakeScreenShot(title,true,argSection);
    }
    catch(ex){
        console.log("checkVortexOpenAndTakeScreenShot ::"+ex);
    }
});