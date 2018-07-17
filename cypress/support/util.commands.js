Cypress.Commands.add('checkUtilConsole',(argText,argValue)=>{
    try{
        if(argText.length!=argValue.length)throw('checkUtilConsole | argText.length != argValue.length')
        for(var compt=0;compt<argText.length;compt++){
            console.log(argText[compt]+' :: '+argValue[compt]);
        }
    }
    catch(ex){
        console.log('checkUtilConsole ::'+ex);
    }
});

const setCookie=(argCookieName, argCookieValue, argExDays)=>{
    try{
        let dateCookie = new Date();
        dateCookie.setTime(dateCookie.getTime()+(argExDays*24*60*60*1000));
        let expires = "expires="+ dateCookie.toUTCString();
        document.cookie = argCookieName + "=" + argCookieValue + ";" + expires + ";path=/";
    }
    catch(ex){
        console.log('setCookie ::'+ex);
    }
}

/*ISSUE WITH getCookie */
const getCookie=(argCookieName)=>{
    try{
        let name = argCookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        cy.checkUtilConsole(['getCookie value decoded cookie'],decodedCookie);
        let decodedCkieSplt = decodedCookie.split(';');
        cy.checkUtilConsole(['getCookie value decoded cookie split'],decodedCkieSplt[0]);
        cy.checkUtilConsole(['getCookie value decoded cookie split charAt'],decodedCkieSplt[0].charAt(0));
        cy.checkUtilConsole(['getCookie value decoded cookie split substring'],decodedCkieSplt[0].substring(1));
        for(var compt=0; compt<decodedCkieSplt.length; compt++) {
            var temp = decodedCkieSplt[compt];
            while (temp.charAt(0) == ' ') {
                temp=temp.substring(1);
            }
            if(temp.indexOf(name) == 0) {
                return temp.substring(name.length, temp.length);
            }
        }
        return "";
    }
    catch(ex){
        console.log('getCookie ::'+ex);
    }
}

const checkCookie=(argExDays)=>{
    try{
        if(getCookie(argExDays)!='')return true
        return false;
    }
    catch(ex){
        console.log('argExDays ::'+ex);
    }
};

const saveRequestInCookie=(argCookieName,argCookieValue)=>{
    try{
        cy.checkUtilConsole(['Check cookie exist'],[checkCookie(argCookieName)]);
        if(checkCookie(argCookieName)){
            cy.checkUtilConsole(['saveRequestInCookie add cookie'],['']);
            let tempCookieValue=getCookie(argCookieName);
            tempCookieValue+=argCookieValue;
            setCookie(argCookieName,tempCookieValue,1);
        }
        else{
            cy.checkUtilConsole(['saveRequestInCookie create cookie'],['']);
            setCookie(argCookieName,argCookieValue,1);
        }
    }
    catch(ex){
        console.log('saveRequestInCookie ::'+ex);
    }
}

Cypress.Commands.add('checkUtilGetReport',(argModule,argReportId,argData,argSeparator1,argSeparator2)=>{
    try{
        let temp='';
        let splitOperator=argSeparator2+argSeparator1;
        let dataSplited=argData.split(splitOperator);
        for(var compt=0;compt<dataSplited.length;compt++){
            let tempValue=dataSplited[compt];
            temp+=''+tempValue+'\n';
        }
        cy.writeFile('cypress/report/'+argModule+'/report-'+argModule+'Id'+argReportId+'.json','{'+temp+'}');
    }
    catch(ex){
        console.log('checkUtilGetReport ::'+ex);
    }
});

Cypress.Commands.add('checkUtilGetCookieReport',(argCookieName,argReportId)=>{
    try{
        let dataFromCookie=getCookie(argCookieName);
        cy.checkUtilGetReport('kraken-statusCode',argReportId,dataFromCookie,'[',']');
    }
    catch(ex){
        console.log('checkUtilGetCookieReport ::'+ex);
    }
});

Cypress.Commands.add('checkUtilGetStatusCodeReport',(argReportId)=>{
    try{
        cy.checkUtilGetCookieReport('utilStatusCode',argReportId);
    }
    catch(ex){
        console.log('checkUtilGetStatusCodeReport ::'+ex);
    }
});

const utilSendRequest =(argUrl)=>{
    try{
        let request=new XMLHttpRequest();
        request.open('GET',argUrl,false);
        request.send();
        return request;
    }
    catch(ex){
        console.log('utilSendRequest ::'+ex);
    }
};

const utilStatusCode =(argUrl)=>{
    try{
        let request=utilSendRequest(argUrl);
        let typeOfArgUrl=typeof request;
        console.log("utilStatusCode type of argUrl ::"+typeOfArgUrl);
        if(typeOfArgUrl!=='object')throw ('Error utilStatusCode || XMLHttpRequest')
        console.log("utilStatusCode status code ::"+request.status);
        saveRequestInCookie('utilStatusCode','[ '+argUrl+' => '+request.status+' ]');
        if(request.status!==500 || request.status!==404) return true
        return false;
    }
    catch(ex){
        console.log('utilStatusCode ::'+ex);
    }
};

Cypress.Commands.add('checkUtilTakeScreenShotIfNotErrorPage',(argUrl,argTitle)=>{
    try{
        if(utilStatusCode(argUrl)){
            cy.visit(argUrl);
            cy.checkVortexOpenAndTakeScreenShot(argTitle);
        }
    }
    catch(ex){
        console.log('checkUtilTakeScreenShotIfNotErrorPage ::'+ex);
    }
});

Cypress.Commands.add('checkUtilDownloadSitemapXML',(argSiteMapUrl,argTestTitle)=>{
    try{
        console.log('checkUtilDownloadSitemapXML');
        let baseUrl=argSiteMapUrl;
        console.log('Base Url for sitemap.xml '+baseUrl);
        let request=utilSendRequest(baseUrl);
        let xmlDocument=(request.responseXML);
        var oSerializer = new XMLSerializer();
        var sXML = oSerializer.serializeToString(xmlDocument);
        let dateDownload=new Date();
        let path='cypress/download/'+argTestTitle+'/';
        let title=argTestTitle+'-Id'+dateDownload.getTime()+'.xml';
        console.log('Path :'+path);
        console.log('Title :'+title);
        cy.writeFile(''+path+title+'',''+sXML+'');
    }
    catch(ex){
        console.log('checkUtilDownloadSitemapXML ::'+ex);
    }
});