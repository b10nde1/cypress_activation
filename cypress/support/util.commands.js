Cypress.Commands.add('checkUtilConsole',(argText,argValue)=>{
    try{
        for(var compt=0;compt<argText.length;compt++){
            if(argValue)console.log(argText[compt]+' :: '+argValue[compt])
            else console.log(argText[compt])
        }
    }
    catch(ex){
        console.log('checkUtilConsole :: '+ex);
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

const getCookie=(argCookieName)=>{
    try{
        let name = argCookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        cy.checkUtilConsole(['getCookie value decoded cookie'],[decodedCookie]);
        let decodedCkieSplt = decodedCookie.split(';');
        cy.checkUtilConsole(['getCookie value decoded cookie split'],[decodedCkieSplt[0]]);
        cy.checkUtilConsole(['getCookie value decoded cookie split charAt'],[decodedCkieSplt[0].charAt(0)]);
        cy.checkUtilConsole(['getCookie value decoded cookie split substring'],[decodedCkieSplt[0].substring(1)]);
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
            cy.checkUtilConsole(['saveRequestInCookie add cookie']);
            let tempCookieValue=getCookie(argCookieName);
            tempCookieValue+=argCookieValue;
            setCookie(argCookieName,tempCookieValue,1);
        }
        else{
            cy.checkUtilConsole(['saveRequestInCookie create cookie']);
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

Cypress.Commands.add('checkUtilGetStatusCodeReport',(argModule,argListUrls,argReportId)=>{
    try{
        let tableOfResult=new Array(argListUrls.length);
        let compt200=0; let comptOther=0;var compt=0;
        for(;compt<argListUrls.length;compt++){
            let tempRequest=utilSendRequest(argListUrls[compt][1]);
            let tempStatusCode=tempRequest.status;
            let tempCodeColor='green';let tempDivId='status-200';
            if(tempStatusCode!=200){
                tempCodeColor='red';
                tempDivId='status-error';
                comptOther++;
            }
            else compt200++
            let tempURL='<a href="'+argListUrls[compt][1]+'">'+argListUrls[compt][1]+'</a>';
            tableOfResult[compt]='<div id="'+tempDivId+'">Status :: <button style="color:'+tempCodeColor+'">'+tempStatusCode+'</button> Element :: '+argListUrls[compt][0]+' | URL :: '+tempURL+'</div>';
        }
        let headerFilter='<div><p>All ('+compt+')</p><p>Status-200 ('+compt200+')</p><p>Other-status ('+comptOther+')</p></div>';
        cy.writeFile('cypress/report/'+argModule+'/statusCodeReport-'+argReportId+'.html',''+headerFilter+tableOfResult+'');
    }
    catch(ex){
        console.log('checkUtilGetStatusCodeReport ::'+ex);
    }
});

const utilStatusCode =(argUrl)=>{
    try{
        let request=utilSendRequest(argUrl);
        let typeOfArgUrl=typeof request;
        console.log("utilStatusCode type of argUrl ::"+typeOfArgUrl);
        if(typeOfArgUrl!=='object')throw ('Error utilStatusCode || XMLHttpRequest')
        console.log("utilStatusCode status code ::"+request.status);
        if(request.status!==500 || request.status!==404) return true
        return false;
    }
    catch(ex){
        cy.checkUtilConsole(['utilStatusCode'],[ex]);
    }
};

const openWaitAndTakeScreenShot=(argUrl)=>{
    try{
        cy.visit(argUrl);
        cy.wait(7000);
    }
    catch(ex){
        cy.checkUtilConsole(['openWaitAndTakeScreenShot'],[ex]);
    }
}

Cypress.Commands.add('checkUtilTakeScreenShotIfNotErrorPage',(argUrl,argOnlyStatus200)=>{
    try{
        if(argOnlyStatus200){
            if(utilStatusCode(argUrl)){
                openWaitAndTakeScreenShot(argUrl);
            }
        }
        else openWaitAndTakeScreenShot(argUrl);
    }
    catch(ex){
        console.log('checkUtilTakeScreenShotIfNotErrorPage ::'+ex);
    }
});
Cypress.Commands.add('checkUtilHideEvidonCookieBanner',()=>{
    try{
        cy.get('.evidon-banner-acceptbutton').click();
    }
    catch(ex){
        cy.checkUtilConsole(['checkUtilHideEvidonCookieBanner'],[ex]);
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