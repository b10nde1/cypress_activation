Cypress.Commands.add('checkUtilConsole',(argText,argValue)=>{
    try{
        argText.forEach(element=>{
            if(argValue)console.log(element+' :: '+argValue[argText.indexOf(element)])
            else console.log(element)
        });
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
        decodedCkieSplt.forEach(element=>{
            let temp = element;
            while (temp.charAt(0) == ' ') {
                temp=temp.substring(1);
            }
            if(temp.indexOf(name) == 0) {
                return temp.substring(name.length, temp.length);
            }
        });
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
        dataSplited.forEach(element=>{
            let tempValue=element;
            temp+=''+tempValue+'\n';
        });
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
        cy.wait(6000);
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
Cypress.Commands.add('checkUtilCloseCookieBanner',(argBannerCloseIcon)=>{
    try{
        cy.get(argBannerCloseIcon).click({force:true});
    }
    catch(ex){
        cy.checkUtilConsole(['checkUtilCloseCookieBanner'],[ex]);
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
//fonction get indicatif domaine
const getIndicMarket=(argUrls)=>{
    try{
        return argUrls.split('/')[2];
    }
    catch(ex){
        cy.checkUtilConsole(['getIndicMarket'],[ex]);
    }
}

const utilGetNumberOfMarket=(argListOfUrls)=>{
    try{
        let lengthIdMarket=1;
        /*MERCI DE NE PAS CHANGER LA CETTE BOUCLE!*/
        for(var comptIdMarket=0;comptIdMarket<argListOfUrls.length;comptIdMarket++){
            let tempIdMarketFullUrl=argListOfUrls[comptIdMarket][1];
            let tempIdMarketBaseUrl=tempIdMarketFullUrl.split('/')[2];
            argListOfUrls.forEach(element=>{
                let tempMarketFullUrl=element[1];
                let tempMarketBaseUrl=tempMarketFullUrl.split('/')[2];
                if(tempIdMarketBaseUrl!=tempMarketBaseUrl){
                    lengthIdMarket++;
                    comptIdMarket=argListOfUrls.indexOf(element);
                }
            });
        }
        return lengthIdMarket;
    }
    catch(ex){

    }
}

const utilSplitMarket=(argListOfUrls)=>{
    try{
        let listMarket= new Array (utilGetNumberOfMarket(argListOfUrls));let comptListMarket=1;
        argListOfUrls.forEach(element=>{
            element[0]=element[1].split('/')[2];
        });
        listMarket.forEach(element=>{
            element=argListOfUrls[0][0];
        });
        /*MERCI DE NE PAS TOUCHER A CETTE BOUCLE*/
        for(var comptIdMarket=0;comptIdMarket<argListOfUrls.length;comptIdMarket++){
            let tempIdMarketFullUrl=argListOfUrls[comptIdMarket][1];
            let tempIdMarketBaseUrl=tempIdMarketFullUrl.split('/')[2];
            argListOfUrls.forEach(element=>{
                let tempMarketFullUrl=element[1];
                let tempMarketBaseUrl=tempMarketFullUrl.split('/')[2];
                if(tempIdMarketBaseUrl!=tempMarketBaseUrl){
                    listMarket[comptListMarket]=tempMarketBaseUrl;
                    comptListMarket++;
                    comptIdMarket=argListOfUrls.indexOf(element);
                }
            });
        }
        cy.checkUtilConsole(['utilSplitMarket listMarket'],[listMarket]);
        let result=new Array(listMarket.length);let comptResult=0;
        /*MERCI DE NE PAS TOUCHER A CETTE BOUCLE*/
        for(var compt=0;compt<result.length;compt++){
            result[compt]=[];
            for(var comptList=0;comptList<argListOfUrls.length;comptList++){
                if(listMarket[compt]==argListOfUrls[comptList][0]){
                    result[compt][comptResult]=argListOfUrls[comptList][1];
                    comptResult++;
                }
            }
            comptResult=0;
        }
        cy.checkUtilConsole(['utilSplitMarket result'],[result]);
        return result;
    }
    catch(ex){
        cy.checkUtilConsole(['utilSplitMarket'],[ex]);
    }
}

//cette fonction verifie si la list provient du meme market ou pas
const getListOfSiteMap=(argListOfUrls)=>{
    try{
        cy.checkUtilConsole(['getListOfSiteMap'],['Start']);
        let tableOfMarket=utilSplitMarket(argListOfUrls);
        /*MERCI DE NE PAS TOUCHER A CETTE BOUCLE!*/
        for(var comptLv1=0;comptLv1<tableOfMarket.length;comptLv1++){
            tableOfMarket[comptLv1].forEach(element=>{
                let temp=tableOfMarket[comptLv1][tableOfMarket[comptLv1].indexOf(element)];
                tableOfMarket[comptLv1][tableOfMarket[comptLv1].indexOf(element)]=new Array(2);
                tableOfMarket[comptLv1][tableOfMarket[comptLv1].indexOf(element)][0]='kraken_multiple_countries';
                tableOfMarket[comptLv1][tableOfMarket[comptLv1].indexOf(element)][1]=temp;
            });
        }
        cy.checkUtilConsole(['getListOfSiteMap'],['END']);
        return tableOfMarket;
    }
    catch(ex){
        cy.checkUtilConsole(['getListOfSiteMap'],[ex]);
    }
}
//Cette fonction verifie les urls pour chaque sitemap.xml
Cypress.Commands.add('checkUtilVerifyUrlsInSitemapXML',(argListMarkets,argReportId)=>{
    try{
        let tempListOfSiteMap=getListOfSiteMap(argListMarkets);
        tempListOfSiteMap.forEach(element=>{
            cy.checkArticleV2Sitemap(element,argReportId+tempListOfSiteMap.indexOf(element));
        });
    }
    catch(ex){
        cy.checkUtilConsole(['checkUtilVerifyUrlsInSitemapXML'],[ex]);
    }
});
//Cette fonction telecharge la liste de sitemap.xml
Cypress.Commands.add('checkUtilDownloadMultipleSitemapXML',(argListMarkets)=>{
    try{
        let tempListOfSiteMap=getListOfSiteMap(argListMarkets);
        tempListOfSiteMap.forEach(element=>{
            cy.checkArticleV2DownloadSitemapXML(element);
        });
    }
    catch(ex){
        cy.checkUtilConsole(['checkUtilDownloadMultipleSitemapXML'],[ex]);
    }
});
//fonction pour ouvrir un element du NavMenu
Cypress.Commands.add('checkUtilOpenNavMenu',(argIdNavMenu)=>{
    try{
        cy.get('#phmainbodytop_0_ctl01_NavigationHeader > div > div.menu__option__container.js-menu-content-oasis > ul > li:nth-child('+argIdNavMenu+') > div')
            .invoke('attr','class','menu__option__content collapse js-menu-content in')
            .should('have.attr','class','menu__option__content collapse js-menu-content in');
    }
    catch(ex){
        cy.checkUtilConsole(['checkUtilOpenNavMenu'],[ex]);
    }
});