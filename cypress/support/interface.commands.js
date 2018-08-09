const writeFile=(argFileTitle,argReportId,argFileExt,argData)=>{
    try{
        cy.writeFile('cypress/report/'+argFileTitle+'/statusCodeReport-'+argReportId+'.'+argFileExt+'',''+argData+'');
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> writeFile'],[ex]);
    }
}

Cypress.Commands.add('interfaceStatusCodeReport',(argTitle,argReportId,argHeaderSection,argDataSection)=>{
    try{
        let extractHeaderSection='';let extractDataSection=new Array(argDataSection.length);
        for(var compt=0;compt<argDataSection.length;compt++){
            let tempSplit=argDataSection[compt].split('/*/');
            let tempColor='green';
            if(tempSplit[0]!=200) tempColor='red'
            extractDataSection[compt]='<div id='+tempSplit[1]+'><button style="color:'+tempColor+'">'+tempSplit[0]+'</button> <a href="'+tempSplit[2]+'">Item : '+tempSplit[1]+'</a></div>';
        }
        for(var compt=0;compt<argHeaderSection[0].length;compt++){
            extractHeaderSection+='<div id='+argHeaderSection[0][compt]+'><p>'+argHeaderSection[0][compt]+' :: '+argHeaderSection[1][compt]+'</p></div>';
        }
        writeFile(argTitle,argReportId,'html',extractHeaderSection+extractDataSection);
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> interfaceStatusCodeReport'],[ex]);
    }
});