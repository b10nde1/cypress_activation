const writeFile=(argFileTitle,argReportId,argFileExt,argData)=>{
    try{
        let htmlContent=createHtml(argFileTitle,argData,'','');
        //cy.writeFile('cypress/report/'+argFileTitle+'-'+argReportId+'/report'+argFileTitle+'-'+argReportId+'.'+argFileExt+'',''+htmlContent+'');
        cy.writeFile('cypress/report/'+argFileTitle+'-'+argReportId+'/report'+argFileTitle+'-'+argReportId+'.'+argFileExt+'',''+htmlContent+'');
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> writeFile'],[ex]);
    }
}

const getBaliseOption=(argOption)=>{
    try{
        //for option ->
        //[0] = open or close '/' if close
        //[1] = class or id
        //[2] = class or id value
        let option=['','',''];
        for(var compt=0;compt<3;compt++){
            if(argOption[compt]!=null)option[compt]=argOption[compt]
        }
        return option;
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> getBaliseOption'],[ex]);
    }
}

//['div','p','p','div']+[['','class','test'],['','',''],['/','',''],['/','','']]+true+true => <div class="test"><p></p></div>
//['div','p','p','div']+[['','class','test'],['','',''],['/','',''],['/','','']]+true+false => ['<div class="test">','<p>','</p>','</div>']
//['div']+['','','']+false+true => <div></div>
//['div']+['','','']+false+false => ['<div>','</div>']
const createBalise=(argListBalise,argOption,argMultipleOption,argAligned)=>{
    try{
        let option=null;let resultAligned='';let resultNotAligned=new Array(argListBalise.length);
        //case argMultipleOption true
        if(argMultipleOption){
            let tableOfOption=new Array(argOption.length);
            for(var compt=0;compt<argOption.length;compt++){
                tableOfOption[compt]=new Array(3);
                tableOfOption[compt]=getBaliseOption(argOption[compt]);
            }
            for(var compt=0;compt<argListBalise.length;compt++){
                option=getBaliseOption(tableOfOption[compt]);
                let optionBalise=' '+option[1]+'="'+option[2]+'"';
                if(option[1]=='')optionBalise='';
                if(argAligned)resultAligned+='<'+option[0]+''+argListBalise[compt]+''+optionBalise+'>'
                else resultNotAligned[compt]='<'+option[0]+''+argListBalise[compt]+''+optionBalise+'>';
            }
        }
        //case argMultipleOption false
        else {
            option=getBaliseOption(argOption);
            let optionBalise=' '+option[1]+'="'+option[0]+'"';
            if(option[1]=='')optionBalise='';
            for(var compt;compt<argListBalise.length;compt++){
                if(argAligned)resultAligned+='<'+option[0]+''+argListBalise[compt]+''+optionBalise+'>';
                else resultNotAligned[compt]='<'+option[0]+''+argListBalise[compt]+''+optionBalise+'>';
            }
        }
        if(argAligned)return resultAligned;
        else return resultNotAligned;
        throw('interface commands -> createBalise : ERROR NO RESULT');
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> closeBalise'],[ex]);
    }
}

/*
<table>
    <tbody>
        <tr>
            <th></th>
        </tr>
        <tr>
            <td>
*/
//argBody[0]=col1Value, [1]=col2Value, if [2]!=null [2]=href for col2Value else href=[1]
const createTable=(argTableTitle,argBody,argCol1,argCol2)=>{
    try{
        let col1=argCol1;let col2=argCol2;
        if(argCol1==null)col1='Col-1-'+argTableTitle+''
        if(argCol2==null)col2='Col-2-'+argTableTitle+''
        let table='<div><h1>'
            +argTableTitle+'</h1><table><tbody><tr><th>'
            +col1+
            '</th><th>'
            +col2+'</th></tr>';
        for(var compt=0;compt<argBody.length;compt++){
            let hrefValue=argBody[compt][1];
            if(argBody[compt].length>2)hrefValue=argBody[compt][3];
            table+='<tr><td>'
                +argBody[compt][0]+
                '</td><td><a href="'
                    +hrefValue+
                    '">'
                    +argBody[compt][1]+
                '</a></td></tr>';
        }
        return table+'</tbody></table></div>';
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> createTable'],[ex]);
    }
}

const createHtml=(argTitle,argBody,argCss,argJs)=>{
    try{
        let listBalise=createBalise(
            ['html','html','head','head','body','body','title','title','style','style','script','script']
            ,[['','',''],['/','',''],['','',''],['/','',''],['','',''],['/','',''],['','',''],['/','',''],['','',''],['/','',''],['','',''],['/','','']]
            ,true
            ,false);
        return listBalise[0]/*html*/
                    +listBalise[2]/*head*/
                        +listBalise[6]+argTitle+listBalise[7]/*title*/
                        +listBalise[8]+argCss+listBalise[9]/*style*/
                        +listBalise[10]+argJs+listBalise[11]/*script*/
                    +listBalise[3]
                    +listBalise[4]/*body*/
                        +createTable(argTitle,argBody,null,null)
                    +listBalise[5]
                +listBalise[1];
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> createHtml'],[ex]);
    }
}

Cypress.Commands.add('interfaceStatusCodeReport',(argTitle,argReportId,argHeaderSection,argDataSection)=>{
    try{
        let extractHeaderSection='';let extractDataSection=new Array(argDataSection.length);
        for(var compt=0;compt<argDataSection.length;compt++){
            let tempSplit=argDataSection[compt].split('/*/');
            let tempColor='green';
            if(tempSplit[0]!=200) tempColor='red'
            extractDataSection[compt]='<div id='
                +tempSplit[1]+'><button style="color:'
                +tempColor+'">'
                +tempSplit[0]+'</button> <a href="'
                +tempSplit[2]+'">Item : '
                +tempSplit[1]+'</a></div>';
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

Cypress.Commands.add('interfaceScreenShotReport',(argModule,argReportId,argData)=>{
    try{
        let extractData=new Array(argData.length);
        for(var compt=0;compt<argData.length;compt++){
            extractData[compt]=new Array(2);
            extractData[compt][0]=argData[compt][0];
            extractData[compt][1]=argData[compt][1];
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
            extractData[compt]=new Array(3);
            let tempData=argData.split('/*/'); let tempColor='blue';
            if(tempData[0]!='OK')tempColor='silver';
            //extractData[compt]='<div id="'+tempData[1]+'"><a href="'+tempData[2]+'"><button style="color:'+tempColor+'">'+tempData[1]+'</button></a></div>';
            extractData[compt][0]='<button style="color:'+tempColor+'">'+tempData[0]+'</button>';
            extractData[compt][1]=tempData[1];
            extractData[compt][1]=tempData[2];
        }
        writeFile(argModule,argReportId,'html',extractData);
    }
    catch(ex){
        cy.checkUtilConsole(['interface commands -> interfaceSitemapReport'],[ex]);
    }
});
