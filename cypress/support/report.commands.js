const getDisplayNameItem=(argUrl)=>{
    try{
        let urlSplit=argUrl.split('/');
        let displayNameWithDash=urlSplit[(urlSplit.length-1)];
        let result=displayNameWithDash.replace('-',' ');
        return result;
    }
    catch(ex){
        cy.checkUtilConsole(['report commands -> getDisplayNameItem'],[ex]);
    }
};

Cypress.Commands.add('reportForSitemap',(argListStatus,argReportId)=>{
    try{
        let tempResult='';let tableOfResult=new Array(argListStatus.length);
        for(var compt=0;compt<argListStatus.length;compt++){
            tableOfResult[compt]=argListStatus[compt][0]+'/*/'+getDisplayNameItem(argListStatus[compt][1])+'/*/'+argListStatus[compt][1];
        }
        console.log(tempResult);
        cy.interfaceSitemapReport('sitemapVerification',argReportId,tableOfResult);
    }
    catch(ex){
        cy.checkUtilConsole(['report commands -> reportForSitemap'],[ex]);
    }
});

Cypress.Commands.add('checkGlobalScreenShotReport',(argModule,argUrls,argReportId)=>{
    try{
        cy.interfaceScreenShotReport(argModule,argReportId,argUrls);
    }
    catch(ex){
        cy.checkUtilConsole(['report commands -> checkGlobalScreenShotReport'],[ex]);
    }
});

Cypress.Commands.add('checkUtilGetStatusCodeReport',(argModule,argListUrls,argReportId)=>{
    try{
        let tableOfResult=new Array(argListUrls.length);
        let compt200=0; let comptOther=0;var compt=0;
        for(;compt<argListUrls.length;compt++){
            let request=new XMLHttpRequest();
            request.open('GET',argListUrls[compt][1],false);
            request.send();
            let tempRequest=request;
            let tempStatusCode=tempRequest.status;
            if(tempStatusCode!=200)comptOther++
            else compt200++
            tableOfResult[compt]=''+tempStatusCode+'/*/'+argListUrls[compt][0]+'/*/'+argListUrls[compt][1]+'';
        }
        let headerFilter = ['Total','Status 200','Other status'][compt,compt200,comptOther];
        cy.interfaceStatusCodeReport(argModule,argReportId,headerFilter,tableOfResult);
    }
    catch(ex){
        cy.checkUtilConsole(['report commands -> checkUtilGetStatusCodeReport'],[ex]);
    }
});