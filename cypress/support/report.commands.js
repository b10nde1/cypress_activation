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

Cypress.Commands.add('reportForGoogPageSpeed',(argData,argReportId)=>{
    try{
        cy.interfaceGooglePageSpeed('Google Page Speed',argData,argReportId);
    }
    catch(ex){
        cy.checkUtilConsole(['report commands -> reportForGoogPageSpeed'],[ex]);
    }
});

Cypress.Commands.add('reportForSitemap',(argListStatus,argReportId)=>{
    try{
        let tempResult='';let tableOfResult=new Array(argListStatus.length);
        argListStatus.forEach(element => {
            tableOfResult[argListStatus.indexOf(element)]=element[0]+'/*/'
                +getDisplayNameItem(element[1])+'/*/'
                +element[1];
        });
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
        let compt200=0; let comptOther=0;
        argListUrls.forEach(element=>{
            let request=new XMLHttpRequest();
            request.open('GET',element[1],false);
            request.send();
            let tempRequest=request;
            let tempStatusCode=tempRequest.status;
            if(tempStatusCode!=200)comptOther++
            else compt200++
            tableOfResult[argListUrls.indexOf(element)]=''+tempStatusCode+'/*/'
                +element[0]+'/*/'
                +element[1]+'';
        });
        let headerFilter = ['Total','Status 200','Other status'][compt,compt200,comptOther];
        cy.interfaceStatusCodeReport(argModule,argReportId,headerFilter,tableOfResult);
    }
    catch(ex){
        cy.checkUtilConsole(['report commands -> checkUtilGetStatusCodeReport'],[ex]);
    }
});