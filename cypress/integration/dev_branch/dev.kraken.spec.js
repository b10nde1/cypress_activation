import dataFromJson from '../../fixtures/data/kraken.json';
describe('Screenshot', () => {
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        for(var compt=0;compt<argSplit.length;compt++){
            result[compt]=argSplit[compt];
        }
        return result;
    };
    const getTable2DFromJson=(argTableTestimonialContent,argSplit)=>{
        let result=new Array(argTableTestimonialContent.length);
        for(var compt=0;compt<argTableTestimonialContent.length;compt++){
            result[compt]=alignTableFromJson(argTableTestimonialContent[compt].split(argSplit));
            let tempResultLabel=result[compt][0].replace("[","");
            let tempResultLink=result[compt][1].replace("]","");
            if(tempResultLabel!='--')result[compt][0]=tempResultLabel
            else{
                let tempResultGenerateLabel=tempResultLink.split('/');
                result[compt][0]=tempResultGenerateLabel[(tempResultGenerateLabel.length)-1];
            }
            result[compt][1]=tempResultLink;
        }
        return result;
    };
    let conf_run_screen_shot=dataFromJson.runScreenShot;
    let confDevice='';let listMarkets='';let data_page_speed='';let temp_list_markets='';let temp_page_speed_urls='';
    let conf_base_url=dataFromJson.baseUrl;
    if(dataFromJson.device!='') confDevice=getTable2DFromJson(dataFromJson.device.split('],['),',');
    if(dataFromJson.urls!=''){
        temp_list_markets=getTable2DFromJson(dataFromJson.urls.split('],['),'/*/');
        if(dataFromJson.useBaseUrl){
            temp_list_markets.forEach(element => {
                element[1]=
                    conf_base_url+
                    element[1];
            });
        }
    }
    if(dataFromJson.pageSpeed!=''){
        temp_page_speed_urls=getTable2DFromJson(dataFromJson.pageSpeed.split('],['),'/*/');
        if(dataFromJson.useBaseUrl){ 
            temp_page_speed_urls.forEach(element=>{
            element[1]=
                conf_base_url+
                element[1];
            });
        }
    }
    //cette fonction ne marche que pour confGetAllLinkInCurrentPage
    const checkIfTrueOrFalse=(arg: Array)=>{
        for(var compt=0;compt<arg.length;compt++){
            if(arg[compt].split(':')[1]==='true' || arg[compt].split(':')[1]==='true]'){
                return true;
            }
        }
        return false;
    }
    listMarkets=temp_list_markets;
    data_page_speed=temp_page_speed_urls;
    let conf_run_page_speed=dataFromJson.runPageSpeed;
    let confGetStatusCodeReport=dataFromJson.getStatusCodeReport;
    let reportDate=new Date(); let reportId=reportDate.getTime();
    let confVerifySitemapXML=dataFromJson.verifySitemapXML;
    let confDownloadSitemapXML=dataFromJson.downloadSitemapXML;
    let confOpenNavMenu=dataFromJson.openNavMenu.split(',');
    let confCloseBanner=dataFromJson.closeBanner;
    let confOnlyStatus200=dataFromJson.onlyStatus200;
    let confGetUrlFromSiteMap=dataFromJson.getAllUrlInSiteMap;
    let dataConfGetAllLinkCurrentPage=dataFromJson.getAllLinkInCurrentPage.split('],[');
    let confGetAllLinkInCurrentPage=checkIfTrueOrFalse(dataConfGetAllLinkCurrentPage);
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        //hide css of _evidon_banner
        cy.checkUtilConsole(
            ['Kraken','Status 200','Status Code report'
                ,'PageSpeed','ScreenShot','OpenNavMenu'
                ,'CloseBanner','VerifySitemapXML'
                ,'Download SitemapXML','Device'
                ,'Run Meta Verification','Use Base Url'
                ,'GetAllUrlInSiteMapXml','getAllLinkInCurrentPage']
            ,['RUN-'+reportId,dataFromJson.onlyStatus200,dataFromJson.getStatusCodeReport
                ,dataFromJson.runPageSpeed,dataFromJson.runScreenShot,dataFromJson.openNavMenu
                ,dataFromJson.closeBanner,dataFromJson.verifySitemapXML
                ,dataFromJson.downloadSitemapXML,dataFromJson.device
                ,dataFromJson.runMetaVerification, dataFromJson.useBaseUrl
                ,confGetUrlFromSiteMap,confGetAllLinkInCurrentPage]);
    });
    if(conf_run_screen_shot){
        console.log('conf_run_screen_shot :: Start');
        let temp_indice_for_runMeta=0;
        for(var comptDevice=0;comptDevice<confDevice.length;comptDevice++){
            let confWidth=Number(confDevice[comptDevice][0]);
            let confHeight=Number(confDevice[comptDevice][1]);
            for(var compt=0;compt<listMarkets.length;compt++){
                let temp=compt;
                temp_indice_for_runMeta=temp;
                it('Url id '+comptDevice+'-'+compt+' | open url | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                    console.log('=======>'+confWidth+' X '+confHeight);
                    cy.checkUtilTakeScreenShotIfNotErrorPage(listMarkets[temp][1],confOnlyStatus200);
                });
                it('Scroll down',()=>{
                    cy.get('footer').scrollIntoView();
                    cy.wait(1000);
                });
                if(confCloseBanner){
                    it('Url id '+comptDevice+'-'+compt+' | adoric element text | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+' ',()=>{
                        cy.checkUtilCloseCookieBanner('.adoric_element.element-text');
                    });
                    it('Url id '+comptDevice+'-'+compt+' | adoric element light box | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+' ',()=>{
                        cy.checkUtilCloseCookieBanner('.adoric_element.element-text.closeLightboxButton');
                    });
                    it('Url id '+comptDevice+'-'+compt+' | adoric element light Shape | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+' ',()=>{
                        cy.checkUtilCloseCookieBanner('.adoric_element.element-shape.closeLightboxButton');
                    });
                    it('Url id '+comptDevice+'-'+compt+' | Evidon Banner | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                        cy.checkUtilCloseCookieBanner('.evidon-banner-acceptbutton');
                    });
                    it('Url id '+comptDevice+'-'+compt+' | Non Evidon Banner | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                        cy.checkUtilCloseCookieBanner('#_evh-ric-c');
                    });
                }
                it('Url id '+comptDevice+'-'+compt+'| take screenshot |'+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                    cy.viewport(confWidth,confHeight);
                    if(confOpenNavMenu[0]!=0 && confWidth>1023){
                        for(var comptNavMenu=0;comptNavMenu<confOpenNavMenu.length;confOpenNavMenu++){
                            cy.checkUtilOpenNavMenu(confOpenNavMenu[comptNavMenu]);
                            cy.checkVortexOpenAndTakeScreenShot(confWidth+'x'+confHeight+'-navMenuId'+comptNavMenu+'-'+listMarkets[temp][0]);
                        }
                    }
                    else cy.checkVortexOpenAndTakeScreenShot(confWidth+'x'+confHeight+'-'+listMarkets[temp][0]);
                });
            }
        }
        /**Revoir la logic de la boucle */
        if(dataFromJson.runMetaVerification==true){
            it('Kraken Meta Verification',()=>{
                cy.metaVerification(dataFromJson.metaInfo.split('],[')[temp_indice_for_runMeta]);
            });
        }
        //report json for screenshot with tcid+article name + url
        it('Kraken screenshot Report id :: kraken'+reportId+'',()=>{
            cy.checkGlobalScreenShotReport('kraken',listMarkets,reportId);
        });
        console.log('conf_run_screen_shot :: End');
    }
    //return txt with list of links in current page
    if(confGetAllLinkInCurrentPage){
        for(var compt=0;compt<listMarkets.length;compt++){
            let temp=compt;
            it('Kraken | Get Links of Current page',()=>{
                cy.utilGetAllLinksOfCurrentPage(listMarkets[temp][0],listMarkets[temp][1],reportId,dataConfGetAllLinkCurrentPage);
            });
        }
    }
    if(dataFromJson.runMetaVerification==true && conf_run_screen_shot==false){
        it('Kraken Meta Verification',()=>{
            console.log('Meta Verification :: Start -screenshot');
            for(var compt=0;compt<listMarkets.length;compt++){
                cy.visit(listMarkets[compt][1]);
                cy.wait(6000);
                cy.metaVerification(dataFromJson.metaInfo.split('],[')[compt]);
            }
        });
    }
    if(confGetStatusCodeReport){
        it('Kraken | Get Status Code report '+reportId+'',()=>{
            console.log('confGetStatusCodeReport :: Start');
            cy.checkUtilGetStatusCodeReport('kraken-statusCodeReport',listMarkets,reportId);
            console.log('confGetStatusCodeReport :: End');
        })
    }
    //check if list of new article are present in sitemap.xml
    if(confVerifySitemapXML){
        it('Kraken | Verify sitemap.xml',()=>{
            console.log('confVerifySitemapXML :: Start');
            cy.checkUtilVerifyUrlsInSitemapXML(listMarkets,reportId);
            console.log('confVerifySitemapXML :: End');
        });
    }
    //download sitemap.xml
    if(confDownloadSitemapXML){
        it('Kraken | Download Sitemap.xml',()=>{
            console.log('confDownloadSitemapXML :: Start');
           cy.checkUtilDownloadMultipleSitemapXML(listMarkets);
           console.log('confDownloadSitemapXML :: End');
        });
    }
    //get all urls in sitemap.xml
    if(confGetUrlFromSiteMap){
        it('Kraken | Get All Urls in Sitemap.xml',()=>{
            console.log('confGetUrlFromSiteMap :: Start');
            cy.checkUtilDownloadUrlsFromSiteMapXml(listMarkets[0][1]);
            console.log('confGetUrlFromSiteMap :: Emd');
        });
    }
    if(conf_run_page_speed){
        it('Kraken | Run Google Page Speed',()=>{
            console.log('conf_run_page_speed :: Start');
            cy.pageSpeed(data_page_speed);
            console.log('conf_run_page_speed :: End');
        });
    }
})