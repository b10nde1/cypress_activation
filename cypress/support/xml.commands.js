const utilSendRequest=(argType: string, argUrl: string, argSync: boolean)=>{
    try{
        let request=new XMLHttpRequest();
        request.open(argType,argUrl,argSync);
        request.send();
        return request;
    }
    catch(ex){
        console.log('xml.commands => utilSendRequest ::'+ex);
    }
};

const getSiteMapUrl=(argUrl)=>{
    try{
        let result=getBaseUrl(argUrl);
        if(result===null)throw "getSiteMapUrl Error->unable to get Sitemap url value==null"
        let sitemap=result+'/sitemap.xml';
        return sitemap;
    }
    catch(ex){
        console.log('xml.commands => getSiteMapUrl ::'+ex);
    }
};

const getXmlDocument=(argUrl: string)=>{
    let request = utilSendRequest('GET',argUrl,false);
    let xmlDocument=(request.responseXML).getElementsByTagName('loc');
    return xmlDocument;
};

const getXmlDownloadListOfUrls=(argUrl: string, argDataXml, argStatusData: boolean)=>{
    try{
        let tempData=null;
        if(argStatusData==false)tempData=getXmlDocument(argUrl)
        else tempData=argDataXml
        if(tempData==null)throw 'xml.commands => checkUtilDownloadUrlsFromSiteMapXml :: tempData = null'
        let result=new Array(tempData.length);
        tempData.forEach(element=>{
            result[tempData.indexOf(element)]=element.innerHTML;
        });
        let dateForReport=new Date();
        cy.reportListUrlsInSiteMapXml(result,dateForReport.getTime());
        return result;
    }
    catch(ex){
        cy.checkUtilConsole(['xml.commands => checkUtilDownloadUrlsFromSiteMapXml'],[ex]);
    }
};

const verifyUrlsInsSiteMapXml=(argListData: Array,argReportId: Date,argXml, argStatusData: boolean)=>{
    try{
        let tempDataXml=null;
        let tempResultStatus=argListData;
        if(argStatusData==false) tempDataXml=getXmlDocument(getSiteMapUrl(argListData[0][1]));
        else tempDataXml=argXml;
        if(tempDataXml=='null')throw 'xml.commands => verifyUrlsInsSiteMapXml :: tempDataXml = null'
        for(var comptArticle=0;comptArticle<tempResultStatus.length;comptArticle++){
            tempResultStatus[comptArticle][0]='KO';
            for(var comptXml=0;comptXml<tempDataXml.length;comptXml++){
                let tempXmlUrl=tempDataXml[comptXml].innerHTML;
                if(tempResultStatus[comptArticle][1]===tempXmlUrl){
                    tempResultStatus[comptArticle][0]='OK';
                }
            }
        }
        cy.reportForSitemap(tempResultStatus,argReportId);
    }
    catch(ex){
        console.log('xml.commands => checkArticleV2Sitemap ::'+ex);
    }
};

Cypress.Commands.add('checkArticleV2Sitemap',(argListData: Array,argReportId: Date)=>{
    verifyUrlsInsSiteMapXml(argListData,argReportId,false);
});

Cypress.Commands.add('xmlDownloadListOfUrls',(argUrl: string)=>{
    let listUrls=getXmlDownloadListOfUrls(argUrl,null,false);
})
//dans le cas ou get list of Urls in sitemap.xml et download sitemap.xml
Cypress.Commands.add('xmlGetListOfUrlsAndVerify',(argUrl: string,argListData: Array, argReportId: Date)=>{
    let tempData=getXmlDocument(argUrl);
    let listUrls=getXmlDownloadListOfUrls(null,tempData,true);
    verifyUrlsInsSiteMapXml(argListData,argReportId);
});

Cypress.Commands.add('checkArticleV2DownloadSitemapXML',(argListData)=>{
    try{
        let baseUrl=getSiteMapUrl(argListData[0][1]);
        cy.checkUtilDownloadSitemapXML(baseUrl,'articleV2');
    }
    catch(ex){
        console.log('xml.commands => checkArticleV2DownloadSitemapXML ::'+ex);
    }
});