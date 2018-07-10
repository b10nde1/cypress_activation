Cypress.Commands.add('checkArticleV2Breadcrumb',()=>{
    try{
        cy.get('.c-breadcrumb__list').should('have.attr','itemtype','http://data-vocabulary.org/Breadcrumb');
    }
    catch(ex){
        console.log('checkArticleV2Breadcrumb ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2PageInfo',(argTitle)=>{
    try{
        cy.get('head meta[property="og:title"]').should('have.attr','content',argTitle[0]);
        cy.get('head meta[property="og:url"]').should('have.attr','content',argTitle[1]);
    }
    catch(ex){
        console.log('checkArticleV2PageInfo ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2Title',(argTitle)=>{
    try{
        cy.get('.article-oasis__title');
        cy.get('.article-oasis__title').contains(argTitle);
    }
    catch(ex){
        console.log('checkArticleV2Title ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2AuthorName',()=>{
    try{
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisheaderinformation_0_AuthorLink').should('have.attr','data-action-detail','author-page_author_view-detail-link');
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_AuthorLink').should('have.attr','data-action-detail','author-page_author_view-detail-link');        
    }
    catch(ex){
        console.log('checkArticleV2AuthorName ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2DateAndTimeInfo',()=>{
    try{
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisheaderinformation_0_ReadTimeSection').should('have.class','article-oasis__details--item');
    }
    catch(ex){
        console.log('checkArticleV2DateAndTimeInfo ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2ShareSection',()=>{
    try{
        cy.get('.js-article-share-desktop');
        cy.get('.js-article-share-desktop').children('.icon__print.icon_print.overlay-oasis.js-share--print.event_print_page');
    }
    catch(ex){
        console.log('checkArticleV2ShareSection ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2LikeIcon',()=>{
    try{
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_LikeButton');
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_LikeButton').should('have.class','overlay-oasis js-add-favorites event_socialmedia_like');
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_LikeButton').should('have.attr','data-vortex-scenario','like');
    }
    catch(ex){
        console.log('checkArticleV2LikeIcon ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2ProgressBar',()=>{
    try{
        cy.get('.article-oasis__progressbar').children('progress').should('have.attr','max');
    }
    catch(ex){
        console.log('checkArticleV2ProgressBar ::'+ex);
    }
});

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
        if(result===null)throw "getSiteMapUrl Error->unable to get Sitemap url value==null"
        let sitemap=result+'/sitemap.xml';
        return sitemap;
    }
    catch(ex){
        console.log('getSiteMapUrl ::'+ex);
    }
};

const getDisplayNameItem=(argUrl)=>{
    try{
        let urlSplit=argUrl.split('/');
        let displayNameWithDash=urlSplit[(urlSplit.length-1)];
        let result=displayNameWithDash.replace('-',' ');
        return result;
    }
    catch(ex){
        console.log('getDisplayNameItem ::'+ex);
    }
};

const reportForSitemap=(argListStatus,argReportId)=>{
    try{
        let tempResult='';
        for(var compt=0;compt<argListStatus.length;compt++){
            let tempStatus='{\nStatus :: '+argListStatus[compt][0]+' || Display Name (Item) :: '+getDisplayNameItem(argListStatus[compt][1])+' || Link :: '+argListStatus[compt][1]+'\n}\n';
            tempResult+=tempStatus;
        }
        console.log(tempResult);
        cy.writeFile('cypress/report/articleV2/statusSitemapXmlArticlev2Id'+argReportId+'.json','{'+tempResult+'}');
    }
    catch(ex){
        console.log('reportForSitemap ::'+ex);
    }
};

Cypress.Commands.add('checkGlobalScreenShotReport',(argModule,argUrls,argReportId)=>{
    try{
        let tempResult='';
        for(var compt=0;compt<argUrls.length;compt++){
            let tempTitle='\nTitle-'+compt+' :: "'+argUrls[compt][0]+'",\n';
            let tempUrl='Url-TC'+compt+' :: "'+argUrls[compt][1]+'"\n';
            tempResult+=tempTitle+tempUrl;
        }
        cy.writeFile('cypress/report/'+argModule+'/screenshot'+argModule+'Id'+argReportId+'.json','{'+tempResult+'}');
    }
    catch(ex){
        console.log('checkGlobalScreenShotReport ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2Sitemap',(argListData,argReportId)=>{
    try{
        console.log('checkArticleV2Sitemap');
        let baseUrl=getSiteMapUrl(argListData[0][1]);
        console.log('Base Url for sitemap.xml '+baseUrl);
        let tempResultStatus=argListData;
        let request=new XMLHttpRequest();
        request.open('GET',baseUrl,false);
        request.send();
        let xmlDocument=(request.responseXML).getElementsByTagName('loc');
        console.log('Total New Ulrs '+tempResultStatus.length);
        console.log('Total Sitemap Ulrs '+xmlDocument.length);
        let test=xmlDocument[0];
        for(var comptArticle=0;comptArticle<tempResultStatus.length;comptArticle++){
            tempResultStatus[comptArticle][0]='KO';
            for(var comptXml=0;comptXml<xmlDocument.length;comptXml++){
                let tempXmlUrl=xmlDocument[comptXml].innerHTML;
                if(tempResultStatus[comptArticle][1]===tempXmlUrl){
                    tempResultStatus[comptArticle][0]='OK';
                }
            }
        }
        reportForSitemap(tempResultStatus,argReportId);
    }
    catch(ex){
        console.log('checkArticleV2Sitemap ::'+ex);
    }
});

Cypress.Commands.add('checkArticleV2DownloadSitemapXML',(argListData)=>{
    try{
        let baseUrl=getSiteMapUrl(argListData[0][1]);
        cy.checkUtilDownloadSitemapXML(baseUrl,'articleV2');
    }
    catch(ex){
        console.log('checkArticleV2DownloadSitemapXML ::'+ex);
    }
});