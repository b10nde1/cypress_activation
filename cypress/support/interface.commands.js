const writeFile=(argFileTitle: string,argReportId: Date,argFileExt: string,argData: Array,argCol1: string,argCol2: string)=>{
    try{
        let col=null;
        if(argCol1!=null && argCol2!=null)col=[argCol1,argCol2];
        let htmlContent=createHtml(argFileTitle,argData,'',copyElement(),col);
        if(argFileExt!='html')throw('Interface commands -> write file :: Error expect html | actual :'+argFileExt);
        cy.writeFile('cypress/report/'+argFileTitle+'-'+argReportId+'/report'+argFileTitle+'-'+argReportId+'.'+argFileExt+'',''+htmlContent+'');
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> writeFile'],[ex]);
    }
}

const getBaliseOption=(argOption: Array)=>{
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
         cy.checkUtilConsole(['interface.commands => interface commands -> getBaliseOption'],[ex]);
    }
}

//['div','p','p','div']+[['','class','test'],['','',''],['/','',''],['/','','']]+true+true => <div class="test"><p></p></div>
//['div','p','p','div']+[['','class','test'],['','',''],['/','',''],['/','','']]+true+false => ['<div class="test">','<p>','</p>','</div>']
//['div']+['','','']+false+true => <div></div>
//['div']+['','','']+false+false => ['<div>','</div>']
const createBalise=(argListBalise: Array,argOption: Array,argMultipleOption: boolean,argAligned: boolean)=>{
    try{
        let option=null;let resultAligned='';let resultNotAligned=new Array(argListBalise.length);
        //case argMultipleOption true
        if(argMultipleOption){
            let tableOfOption=new Array(argOption.length);
            argOption.forEach(element=>{
                tableOfOption[argOption.indexOf(element)]=new Array(3);
                tableOfOption[argOption.indexOf(element)]=getBaliseOption(element);
            });
            argListBalise.forEach(element=>{
                option=getBaliseOption(tableOfOption[argListBalise.indexOf(element)]);
                let optionBalise=' '+option[1]+'="'+option[2]+'"';
                if(option[1]=='')optionBalise='';
                if(argAligned)resultAligned+='<'+option[0]+''+element+''+optionBalise+'>'
                else resultNotAligned[argListBalise.indexOf(element)]='<'+option[0]+''+element+''+optionBalise+'>';
            });
        }
        //case argMultipleOption false
        else {
            option=getBaliseOption(argOption);
            let optionBalise=' '+option[1]+'="'+option[0]+'"';
            if(option[1]=='')optionBalise='';
            argListBalise.forEach(element=>{
                if(argAligned)resultAligned+='<'+option[0]+''+element+''+optionBalise+'>';
                else resultNotAligned[argListBalise.indexOf(element)]='<'+option[0]+''+element+''+optionBalise+'>';
            });
        }
        if(argAligned)return resultAligned;
        else return resultNotAligned;
        throw('interface commands -> createBalise : ERROR NO RESULT');
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> closeBalise'],[ex]);
    }
}

//argBody[0]=col1Value, [1]=col2Value, if [2]!=null [2]=href for col2Value else href=[1]
const createTable=(argTableTitle: string,argBody: Array,argCol1: string,argCol2: string)=>{
    try{
        let col1=argCol1;let col2=argCol2;
        if(argCol1==null)col1='Col-1-'+argTableTitle+''
        if(argCol2==null)col2='Col-2-'+argTableTitle+''
        let table='<div><h1>'
            +argTableTitle+'</h1><table class="tableCss"><tbody align="center"><tr><th>'
            +col1+'</th><th>'
            +col2+'</th><th>'
            +'Option</th></tr>';
        for(var compt=0;compt<argBody.length;compt++){
            let hrefValue=argBody[compt][1];
            if(argBody[compt].length>2)hrefValue=argBody[compt][2];
            table+='<tr id="tr-'+argBody[compt][0]+'"><td>'
                    +argBody[compt][0]
                +'</td><td id="td-'+argBody[compt][0]+'">'
                    +argBody[compt][1]
                +'</td><td>'
                    +'<p id="link-'+argBody[compt][0]+'">'+hrefValue+'</p>'
                    +'<a href="javascript:window.open(\''+hrefValue+'\')">open</a>'
                    +' || '
                    +'<a href="javascript:copyElement(document.getElementById(\'link-'+argBody[compt][0]+'\'))">copy link</a>'
                +'</td></tr>';
        }
        return table+'</tbody></table></div>';
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> createTable'],[ex]);
    }
}

//fonction copy past pour le report html
const copyElement=()=>{
    try{
        return 'const copyElement=(el)=>{'
            +'console.log("Copy Element :: "+el);'
            +'let body = document.body, range, sel;'
            +'if (document.createRange && window.getSelection) {'
                +'range = document.createRange();'
                +'sel = window.getSelection();'
                +'sel.removeAllRanges();'
                +'try {'
                    +'range.selectNodeContents(el);'
                    +'sel.addRange(range);'
                +'} catch (e) {'
                    +'range.selectNode(el);'
                    +'sel.addRange(range);'
                +'}'
            +'} else if (body.createTextRange) {'
                +'range = body.createTextRange();'
                +'range.moveToElementText(el);'
                +'range.select();'
            +'}'
            +'document.execCommand("Copy");'
        +'}';
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> copyElement'],[ex]);
    }
}

//creation du html
const createHtml=(argTitle: string,argBody: Array,argCss: string,argJs: string,argCol: Array)=>{
    try{
        let listBalise=createBalise(
            ['html','html','head','head','body','body','title','title','style','style','script','script']
            ,[['','',''],['/','',''],['','',''],['/','',''],['','',''],['/','',''],['','',''],['/','',''],['','type','text/css'],['/','',''],['','type','text/javascript'],['/','','']]
            ,true
            ,false);
        let data_table='';
        if(argCol!=null)data_table=createTable(argTitle,argBody,argCol[0],argCol[1]);
        else data_table=createTable(argTitle,argBody,null,null);
        return listBalise[0]/*html*/
                    +listBalise[2]/*head*/
                        +listBalise[6]+argTitle+listBalise[7]/*title*/
                        +listBalise[8]/*style*/
                        +'body{margin:auto;width:80%;padding:10px;}'
                        +'table.tableCss {border: 1px solid #FFFFFF;background-color: #EEEEEE;width: 95%;height: 100px;text-align: center;border-collapse: collapse;}'
                        +'table.tableCss td, table.tableCss th {border: 1px solid #FFFFFF;}'
                        +'table.tableCss tbody td {font-size: 14px;}'
                        +'table.tableCss tr:nth-child(even) {background: #D0E4F5;}'
                        +'table.tableCss thead {background: #0B6FA4;border-bottom: 5px solid #FFFFFF;}'
                        +'table.tableCss thead th {font-size: 16px;font-weight: bold;color: #FFFFFF;text-align: center;border-left: 2px solid #FFFFFF;}'
                        +'table.tableCss thead th:first-child {border-left: none;}'
                        +'table.tableCss tfoot td { font-size: 14px;}'
                        +listBalise[9]
                        +listBalise[8]+argCss+listBalise[9]/*style*/
                    +listBalise[3]
                    +listBalise[4]/*body*/
                        +'<div>'+data_table
                        +listBalise[10]+argJs+listBalise[11]/*script*/
                        +'</div>'
                    +listBalise[5]
                +listBalise[1];
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> createHtml'],[ex]);
    }
}

Cypress.Commands.add('interfaceGooglePageSpeed',(argTitle: string,argData: Array,argReportId: Date)=>{
    try{
        let extract_data_section=new Array(argData.length);
        argData.forEach(element => {
            extract_data_section[argData.indexOf(element)]=[element[3]
                ,element[1]+' || '+element[2]
                ,element[0]];
        });
        writeFile(argTitle,argReportId,'html',extract_data_section,'Page','Desktop || Mobile');
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> interfaceGooglePageSpeed'],[ex]);
    }
});

Cypress.Commands.add('interfaceStatusCodeReport',(argTitle: string,argReportId: Date,argHeaderSection: Array,argDataSection: Array)=>{
    try{
        let extractDataSection=new Array(argDataSection.length);
        argDataSection.forEach(element=>{
            extractDataSection[argDataSection.indexOf(element)]=new Array(3);
            let tempSplit=element.split('/*/');
            let tempColor='blue';
            if(tempSplit[0]!=200) tempColor='red'
            [extractDataSection[compt][0],extractDataSection[compt][1],extractDataSection[compt][2]]=['<button style="color=white;background-color:'+tempColor+'">'+tempSplit[0]+'</button>'
                ,tempSplit[1]
                ,tempSplit[2]];    
        }
        for(var compt=0;compt<argHeaderSection[0].length;compt++){
            extractHeaderSection+='<div id='+argHeaderSection[0][compt]+'><p>'+argHeaderSection[0][compt]+' :: '+argHeaderSection[1][compt]+'</p></div>';
        }
        writeFile(argTitle,argReportId,'html',extractDataSection,'','');
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> interfaceStatusCodeReport'],[ex]);
    }
});

Cypress.Commands.add('interfaceScreenShotReport',(argModule: string,argReportId: Date,argData: Array)=>{
    try{
        let extractData=new Array(argData.length);
        for(var compt=0;compt<argData.length;compt++){
            extractData[compt]=new Array(2);
            [extractData[compt][0],extractData[compt][1]]=[argData[compt][0],argData[compt][1]];
        }
        writeFile(argModule,argReportId,'html',extractData,'','');
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> interfaceScreenShotReport'],[ex]);
    }
});

Cypress.Commands.add('interfaceSitemapReport',(argModule: string,argReportId: Date,argData: Array)=>{
    try{
        let extractData=new Array(argData.length);
        for(var compt=0;compt<argData.length;compt++){
            extractData[compt]=new Array(3);
            let tempData=argData[compt].split('/*/');
            extractData[compt][0]=tempData[0];
            extractData[compt][1]=tempData[1];
            extractData[compt][2]=tempData[2];
        }
        writeFile(argModule,argReportId,'html',extractData,'','');
    }
    catch(ex){
         cy.checkUtilConsole(['interface.commands => interface commands -> interfaceSitemapReport'],[ex]);
    }
});
