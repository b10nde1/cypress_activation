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
    let confDevice=getTable2DFromJson(dataFromJson.device.split('],['),',');
    let listMarkets=getTable2DFromJson(dataFromJson.urls.split('],['),'/*/');
    let confGetStatusCodeReport=dataFromJson.getStatusCodeReport;
    let reportDate=new Date(); let reportId=reportDate.getTime();
    let confOnlyStatus200=dataFromJson.onlyStatus200;
    let confScreenshotReport=dataFromJson.screenshotReport;
    let confVerifySitemapXML=dataFromJson.verifySitemapXML;
    let confDownloadSitemapXML=dataFromJson.downloadSitemapXML;
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        //hide css of _evidon_banner
        cy.checkUtilConsole(['Kraken','Check only status 200','Get Status code report'],['RUN',confOnlyStatus200,confGetStatusCodeReport]);
    });
    for(var comptDevice=0;comptDevice<confDevice.length;comptDevice++){
        let confWidth=Number(confDevice[comptDevice][0]);
        let confHeight=Number(confDevice[comptDevice][1]);
        for(var compt=0;compt<listMarkets.length;compt++){
            let temp=compt;
            it('Url id '+comptDevice+'-'+compt+' | open url | '+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                console.log('=======>'+confWidth+' X '+confHeight);
                cy.checkUtilTakeScreenShotIfNotErrorPage(listMarkets[temp][1],confOnlyStatus200);
            });
            it('Scroll down',()=>{
                cy.get('footer').scrollIntoView();
                cy.wait(1000);
            });
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
            it('Url id '+comptDevice+'-'+compt+'| take screenshot |'+confWidth+'x'+confHeight+'-'+listMarkets[temp][0]+'',()=>{
                cy.viewport(confWidth,confHeight);
                cy.checkVortexOpenAndTakeScreenShot(confWidth+'x'+confHeight+'-'+listMarkets[temp][0]);
            });
        }
    }
    if('Kraken | Get ScreenShot report '+reportId+' ',()=>{
        cy.checkGlobalScreenShotReport('kraken-screenShotReport',listMarkets,reportId);
    });
    if(confGetStatusCodeReport){
        it('Kraken | Get Status Code report '+reportId+'',()=>{
            cy.checkUtilGetStatusCodeReport('kraken-statusCodeReport',listMarkets,reportId);
        })
    }
    //report json for screenshot with tcid+article name + url
    if(confScreenshotReport){
        it('Kraken screenshot Report id :: kraken'+reportId+'',()=>{
            cy.checkGlobalScreenShotReport('kraken',listMarkets,reportId);
        });
    }
    //check if list of new article are present in sitemap.xml
    if(confVerifySitemapXML){
        it('Kraken | Verify sitemap.xml',()=>{
            cy.checkArticleV2Sitemap(listMarkets,reportId);
            //cy.checkUtilVerifyUrlsInSitemapXML(listMarkets,reportId);
        });
    }
    //download sitemap.xml
    if(confDownloadSitemapXML){
        it('Kraken | Download Sitemap.xml',()=>{
           cy.checkArticleV2DownloadSitemapXML(listMarkets);
           //cy.checkUtilDownloadMultipleSitemapXML(listMarkets);
        });
    }
})