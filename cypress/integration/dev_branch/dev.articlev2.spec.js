import dataFromJson from '../../fixtures/data/articlev2.json';
describe('Article V2', () => {
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        for(var compt=0;compt<argSplit.length;compt++){
            result[compt]=argSplit[compt];
        }
        return result;
    };
    const getTable2DFromJson=(argTableTestimonialContent)=>{
        let result=new Array(argTableTestimonialContent.length);
        for(var compt=0;compt<argTableTestimonialContent.length;compt++){
            result[compt]=alignTableFromJson(argTableTestimonialContent[compt].split('/*/'));
            result[compt][0]=result[compt][0].replace("[","");
            result[compt][1]=result[compt][1].replace("]","");
        }
        return result;
    };
    let listUrls=getTable2DFromJson(dataFromJson.urls.split('],['));
    let dateReport=new Date();
    let reportId=dateReport.getTime();
    let confVerifyArticleV2Element=dataFromJson.verifyArticleV2Element;
    let confScreenShotMobile=dataFromJson.screenShotMobile;
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        cy.viewport(1600, 1200);
    });
    for(var compt=0;compt<listUrls.length;compt++){
        let temp=compt;
        //open Url
        //check og title and url
        it('Open URL for :: '+listUrls[temp][0]+'',()=>{
            cy.visit(listUrls[temp][1]);
            //hide css of _evidon_banner
            cy.checkUtilHideEvidonCookieBanner()
        });
        //take screenshot
        it('TC'+temp+'-0 Article V2 take screenshot ::'+listUrls[temp][0]+'',()=>{
            cy.checkVortexOpenAndTakeScreenShot('ArticleV2-Desktop-'+temp+' '+listUrls[temp][0]);
        });
        if(confVerifyArticleV2Element){
            /*
            //verify page info
            it('TC'+temp+'-1 Check Page Info ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2PageInfo(listUrls[temp],reportId);
            });
            */
            //verify if element breadcumb contains itemptype data-vocabulary.org/breadcrumb
            it('TC'+temp+'-2 Article V2 verify element braedcrumb vocabulary is present ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2Breadcrumb();
            });
            /*
            //verify element title is present
            it('TC'+temp+'-3 Article V2 verify element Title class is present ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2Title(listUrls[temp][0]);
            });
            */
            //verify element author name is present
            //both header and footer
            it('TC'+temp+'-4 Article V2 verify data action detail for element author name ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2AuthorName();
            });
            //verify element read time section is present
            it('TC'+temp+'-5 Article V2 Verify CSS class for element date and time ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2DateAndTimeInfo();
            });
            //verify element share and print is present
            it('TC'+temp+'-6 Article V2 Verify both Share section and print icon are present ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2ShareSection();
            });
            //verift element like section is present
            it('TC'+temp+'-7 Article V2 Verify element like icon is present ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2LikeIcon();
            });
            //verify element progressbar is present
            //check div.child(progress).should.max="100"
            it('TC'+temp+'-8 Article V2 Verify element progressbar is present ::'+listUrls[temp][0]+'',()=>{
                cy.checkArticleV2ProgressBar();
            });
        }
    }
    if(confScreenShotMobile){
        for(var compt=0;compt<listUrls.length;compt++){
            let temp=compt;
            //take screenshot on mobile
            it('MobileVersion-'+temp+' :: '+listUrls[temp][0]+'',()=>{
                cy.viewport(320, 480);
                cy.visit(listUrls[temp][1]);
                //hide css of _evidon_banner
                cy.checkUtilHideEvidonCookieBanner()
                cy.checkVortexOpenAndTakeScreenShot('ArcitleV2-Mobile-'+temp+'-'+listUrls[temp][0]+'');
            });
        }
    }
    //report json for screenshot with tcid+article name + url
    it('Report id :: articlev2Id'+reportId+'',()=>{
        cy.checkGlobalScreenShotReport('articleV2',listUrls,reportId);
    });
    //check if list of new article are present in sitemap.xml
    it('Verify sitemap.xml',()=>{
        cy.checkArticleV2Sitemap(listUrls,reportId);
    });
    //download sitemap.xml
    it('Download Sitemap.xml',()=>{
        cy.checkArticleV2DownloadSitemapXML(listUrls);
    });
})