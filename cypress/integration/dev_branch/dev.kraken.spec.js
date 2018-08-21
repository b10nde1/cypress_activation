import dataFromJson from '../../fixtures/data/kraken.json';
describe('Screenshot', () => {
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        argSplit.forEach(element => {
            result[argSplit.indexOf(element)]=element;
        });
        return result;
    };
    const getTable2DFromJson=(argTableTestimonialContent,argSplit)=>{
        let result=new Array(argTableTestimonialContent.length);
        argTableTestimonialContent.forEach(element=>{
            result[argTableTestimonialContent.indexOf(element)]=alignTableFromJson(element.split(argSplit));
            let tempResultLabel=result[argTableTestimonialContent.indexOf(element)][0].replace("[","");
            let tempResultLink=result[argTableTestimonialContent.indexOf(element)][1].replace("]","");
            if(tempResultLabel!='--')result[argTableTestimonialContent.indexOf(element)][0]=tempResultLabel
            else{
                let tempResultGenerateLabel=tempResultLink.split('/');
                result[argTableTestimonialContent.indexOf(element)][0]=tempResultGenerateLabel[(tempResultGenerateLabel.length)-1];
            }
            result[compt][1]=tempResultLink;
        });
        return result;
    };
    let conf_run_screen_shot=dataFromJson.runScreenShot;
    let confDevice='';let listMarkets='';let data_page_speed='';
    if(dataFromJson.device!='') confDevice=getTable2DFromJson(dataFromJson.device.split('],['),',');
    if(dataFromJson.urls!='')listMarkets=getTable2DFromJson(dataFromJson.urls.split('],['),'/*/');
    if(dataFromJson.pageSpeed!='')data_page_speed=getTable2DFromJson(dataFromJson.pageSpeed.split('],['),'/*/');
    let conf_run_page_speed=dataFromJson.runPageSpeed;
    let confGetStatusCodeReport=dataFromJson.getStatusCodeReport;
    let reportDate=new Date(); let reportId=reportDate.getTime();
    let confOnlyStatus200=dataFromJson.onlyStatus200;
    let confVerifySitemapXML=dataFromJson.verifySitemapXML;
    let confDownloadSitemapXML=dataFromJson.downloadSitemapXML;
    let confOpenNavMenu=dataFromJson.openNavMenu.split(',');
    let confCloseBanner=dataFromJson.closeBanner;
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        //hide css of _evidon_banner
        cy.checkUtilConsole(['Kraken','Check only status 200','Get Status code report'],['RUN',confOnlyStatus200,confGetStatusCodeReport]);
    });
    if(conf_run_screen_shot){
        confDevice.forEach(element=>{
            let confWidth=Number(element[0]);
            let confHeight=Number(element[1]);
            for(var compt=0;compt<listMarkets.length;compt++){
                let temp=compt;
                it('Url id '+confDevice.indexOf(element)+'-'+compt+' | open url | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                    console.log('=======>'+confWidth+' X '+confHeight);
                    cy.checkUtilTakeScreenShotIfNotErrorPage(listMarkets[temp][1],confOnlyStatus200);
                });
                it('Scroll down',()=>{
                    cy.get('footer').scrollIntoView();
                    cy.wait(1000);
                });
                if(confCloseBanner){
                    it('Url id '+confDevice.indexOf(element)+'-'+compt+' | adoric element text | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+' ',()=>{
                        cy.checkUtilCloseCookieBanner('.adoric_element.element-text');
                    });
                    it('Url id '+confDevice.indexOf(element)+'-'+compt+' | adoric element light box | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+' ',()=>{
                        cy.checkUtilCloseCookieBanner('.adoric_element.element-text.closeLightboxButton');
                    });
                    it('Url id '+confDevice.indexOf(element)+'-'+compt+' | adoric element light Shape | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+' ',()=>{
                        cy.checkUtilCloseCookieBanner('.adoric_element.element-shape.closeLightboxButton');
                    });
                    it('Url id '+confDevice.indexOf(element)+'-'+compt+' | Evidon Banner | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                        cy.checkUtilCloseCookieBanner('.evidon-banner-acceptbutton');
                    });
                    it('Url id '+confDevice.indexOf(element)+'-'+compt+' | Non Evidon Banner | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                        cy.checkUtilCloseCookieBanner('#_evh-ric-c');
                    });
                }
                it('Url id '+confDevice.indexOf(element)+'-'+compt+'| take screenshot |'+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                    cy.viewport(confWidth,confHeight);
                    if(confOpenNavMenu[0]!=0 && confWidth>1023){
                        confOpenNavMenu.forEach(element=>{
                            cy.checkUtilOpenNavMenu(element);
                            cy.checkVortexOpenAndTakeScreenShot(confWidth+'x'
                                +confHeight+'-navMenuId'
                                +confOpenNavMenu.indexOf(element)+'-'
                                +listMarkets[temp][0]);
                        });
                    }
                    else cy.checkVortexOpenAndTakeScreenShot(confWidth+'x'+confHeight+'-'+listMarkets[temp][0]);
                });
            }
        });
        //report json for screenshot with tcid+article name + url
        it('Kraken screenshot Report id :: kraken'+reportId+'',()=>{
            cy.checkGlobalScreenShotReport('kraken',listMarkets,reportId);
        });
    }
    if(confGetStatusCodeReport){
        it('Kraken | Get Status Code report '+reportId+'',()=>{
            cy.checkUtilGetStatusCodeReport('kraken-statusCodeReport',listMarkets,reportId);
        })
    }
    //check if list of new article are present in sitemap.xml
    if(confVerifySitemapXML){
        it('Kraken | Verify sitemap.xml',()=>{
            cy.checkUtilVerifyUrlsInSitemapXML(listMarkets,reportId);
        });
    }
    //download sitemap.xml
    if(confDownloadSitemapXML){
        it('Kraken | Download Sitemap.xml',()=>{
           cy.checkUtilDownloadMultipleSitemapXML(listMarkets);
        });
    }
    if(conf_run_page_speed){
        it('Kraken | Run Google Page Speed',()=>{
            cy.pageSpeed(data_page_speed);
        });
    }
})