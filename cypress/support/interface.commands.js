const writeFile=(argFileTitle,argReportId,argFileExt:String,argData)=>{
    try{
        cy.writeFile('cypress/report/'+argFileTitle+'-'+argReportId+'/report'+argFileTitle+'-'+argReportId+'.'+argFileExt+'',''+argData+'');
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

CYpress.Commands.add('interfaceScreenShotReport',(argModule,argReportId,argData)=>{
    try{
        let extractData=new Array(argData.length);
        for(var compt=0;compt<argData.length;compt++){
            extractData[compt]='<div id="'+argData[compt][0]+'">'+argData[compt][0]+'<a href="'+argData[compt][1]+'">'+argData[compt][1]+'</a></div>';
        }
        writeFile(argModule,argReportId,'html',extractData);
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> interfaceScreenShotReport'],[ex]);
    }
});

Cypress.Commands.add('interfaceSitemapReport',(argModule,argReportId,argData)=>{
    try{
        let extractData=new Array(argData.length);
        for(var compt=0;compt<argData.length;compt++){
            let tempData=argData.split('/*/'); let tempColor='blue';
            if(tempData[0]!='OK')tempColor='silver';
            extractData[compt]='<div id="'+tempData[1]+'"><a href="'+tempData[2]+'"><button style="color:'+tempColor+'">'+tempData[1]+'</button></a></div>';
        }
        writeFile(argModule,argReportId,'html',extractData);
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> interfaceSitemapReport'],[ex]);
    }
});