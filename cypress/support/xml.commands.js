const utilSendRequest=(argType: string, argUrl: string, argSync: boolean)=>{
    try{
        let request=new XMLHttpRequest();
        cy.checkUtilConsole(['xml.command utilSendRequest INFO ARGURL'],[argUrl]);
        request.open(argType,argUrl,argSync);
        request.send();
        console.log('xml.commands -> utilSendRequest ::request completed');
        return request;
    }
    catch(ex){
        console.log('xml.commands => utilSendRequest ::'+ex);
    }
};

const getBaseUrl=(argUrl)=>{
    try{
        let result=null;
        let tempData=argUrl.split('/');
        let tempBase=tempData[2]
        result='https://'+tempBase;
        let listDoubleLang=['/en-us/','/es-us/','/ar-sa/','/en-sa/','/fr-ca/','/en-ca/','/en-eg/','/ar-eg/','/fr-be/','/nl-be/'];
        for(var compt=0;compt<listDoubleLang.length;listDoubleLang++){
            let tempStatus=argUrl.search(listDoubleLang[compt]);
            if(tempStatus>0){
                result+='/'+tempData[3];
                break;
            }
        }
        if(result===null)throw "getBaseUrl Error->unable to get baseUrl value==null "
        return result;
    }
    catch(ex){
        console.log('getBaseUrl ::'+ex);
    }
};

const getSiteMapUrl=(argUrl)=>{
    try{
        let result=getBaseUrl(argUrl);
        if(result===null)
            throw "getSiteMapUrl Error->unable to get Sitemap url value==null"
        let sitemap=result+'/sitemap.xml';
        return sitemap;
    }
    catch(ex){
        cy.checkUtilConsole(['xml.commands => getSiteMapUrl'],[ex]);
    }
};

const getXmlDocument=(argUrl: string)=>{
    try{
        let request = utilSendRequest('GET',argUrl,false);
        let xmlDocument=(request.responseXML).getElementsByTagName('loc');
        return xmlDocument;
    }
    catch(ex){
        cy.checkUtilConsole(['xml.commands => getXmlDocument'],[ex]);
    }
};

const getXmlDownloadListOfUrls=(argUrl: string, argDataXml, argStatusData: boolean)=>{
    try{
        let tempData=null;
        if(argStatusData==false)tempData=getXmlDocument(getSiteMapUrl(argUrl))
        else tempData=argDataXml
        if(tempData==null)
            throw 'xml.commands => checkUtilDownloadUrlsFromSiteMapXml :: tempData = null'
        let result=new Array(tempData.length);
        for(var compt=0;compt<tempData.length;compt++){
            result[compt]=tempData[compt].innerHTML+'\n';
        }
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
        if(tempDataXml=='null')
            throw 'xml.commands => verifyUrlsInsSiteMapXml :: tempDataXml = null'
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
        cy.checkUtilDownloadSitemapXML(baseUrl,'sitemap_xml');
    }
    catch(ex){
        console.log('xml.commands => checkArticleV2DownloadSitemapXML ::'+ex);
    }
});

//assistance pour recup href
const getLinkValueFromTagName=(argListElement: string, argTypeOfAttr: string)=>{
    try{
        //http://localhost:60251/__cypress/
        let result='';
        for(var compt=0;compt<argListElement.length;compt++){
            if(argTypeOfAttr=='href'){
                if(argListElement[compt].href!='javascript:void(0)' 
                    && argListElement[compt].href!='' 
                        && argListElement[compt].href.split('/')[2]!='localhost:60251'){
                            result+=argListElement[compt].href+'\n';
                }
            }
            if(argTypeOfAttr=='src'){
                if(argListElement[compt].src!='javascript:void(0)' 
                    && argListElement[compt].src!='' 
                        && argListElement[compt].src.split('/')[2]!='localhost:60251'){
                            result+=argListElement[compt].src+'\n';
                }
            }
        }
        return result;
    }
    catch(ex){
        cy.checkUtilConsole(['xml.commands -> getLinkValueFromTagName'],[ex]);
    }
};

//get all links in current page
Cypress.Commands.add('utilGetAllLinksOfCurrentPage',(argTitle: string,argUrl: string,argReportId: Date,argRunStatus: Array)=>{
    try{
        let request = new XMLHttpRequest();
        let stringResponse='';
        request.open('GET',argUrl,false);
        request.onload=()=>{
            let response=request.response;
            stringResponse=response;
        }
        request.send();
        let htmlResponse=document.createElement('div');
        htmlResponse.innerHTML=stringResponse;
        let tempScriptSrc=['N/A'];let tempAHref=['N/A'];let tempLinkHref=['N/A'];
        if(argRunStatus[0].split(':')[1]=='true') tempAHref=getLinkValueFromTagName(htmlResponse.getElementsByTagName('a'),'href');
        if(argRunStatus[1].split(':')[1]=='true') tempScriptSrc=getLinkValueFromTagName(htmlResponse.getElementsByTagName('script'),'src');
        if(argRunStatus[2].split(':')[1]=='true]') tempLinkHref=getLinkValueFromTagName(htmlResponse.getElementsByTagName('link'),'href');
        let finalResult='****************CURRENT URL****************\n'
                            +'\n'+argUrl+'\n'
                        +'\n****************A HREF****************\n'
                            +'\n'+tempAHref+'\n'
                        +'\n****************LINK HREF****************\n'
                            +'\n'+tempLinkHref+'\n'
                        +'\n****************SCRIPT SRC****************\n'
                            +'\n'+tempScriptSrc+'\n'
                        +'\n****************END****************\n';
        cy.reportListUrlsInCurrentPage(argTitle,finalResult,new Date().getTime());
     }
    catch(ex){
        cy.checkUtilConsole(['util.commands -> utilGetAllLinksOfCurrentPage'],[ex]);
    }
});

//export
module.exports.getBaseUrl = getBaseUrl;
module.exports.getSiteMapUrl=getSiteMapUrl;