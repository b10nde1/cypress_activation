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
        let typeOfArgUrl=typeof utilSendRequest(argUrl);
        console.log("utilStatusCode type of argUrl ::"+typeOfArgUrl);
        if(typeOfArgUrl!=='XMLHttpRequest')throw ('Error utilStatusCode || XMLHttpRequest')
        console.log("utilStatusCode status code ::"+typeOfArgUrl.status);
        if(typeOfArgUrl.status!==500 || typeOfArgUrl.status!==404) return true
        return false;
    }
    catch(ex){
        console.log('utilStatusCode ::'+ex);
    }
};

Cypress.Commands.add('checkUtilTakeScreenShotIfNotErrorPage',(argUrl,argTitle)=>{
    try{
        if(utilStatusCode(argUrl)){
            cy.visit(argUrl)
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
        /*
        let request=new XMLHttpRequest();
        request.open('GET',baseUrl,false);
        request.send();
        */
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