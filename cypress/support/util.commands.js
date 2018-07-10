
Cypress.Commands.add('checkUtilDownloadSitemapXML',(argSiteMapUrl,argTestTitle)=>{
    try{
        console.log('checkUtilDownloadSitemapXML');
        let baseUrl=argSiteMapUrl;
        console.log('Base Url for sitemap.xml '+baseUrl);
        let request=new XMLHttpRequest();
        request.open('GET',baseUrl,false);
        request.send();
        let xmlDocument=(request.responseXML).innerHTML;
        let dateDownload=new Date();
        cy.writeFile('cypress/download/'+argTestTitle+'/'+argTestTitle+'-Id'+dateDownload.getTime()+'.xml',''+xmlDocument+'');
    }
    catch(ex){
        console.log('checkUtilDownloadSitemapXML ::'+ex);
    }
});