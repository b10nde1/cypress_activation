//***************************************************************************************//
//**Load Data**//
import dataFromJson from '../../fixtures/data/dataGuide.json';
describe('Guides and downloadables', () => {
//***************************************************************************************//
//**util**//
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        for(var compt=0;compt<argSplit.length;compt++){
            result[compt]=argSplit[compt];
        }
        return result;
    };
//***************************************************************************************//
//**Config**//
    //Config URLs
    let confBaseUrl=''+dataFromJson.confBaseUrl+''; 
    let confCategoryUrl=dataFromJson.confCategoryUrl;
    let confGuideUrl=dataFromJson.confGuideUrl;
    //'a[href="'+confBaseUrl+'/'+confCategoryUrl+'/'+confVideoUrl+'"]'
    let confVideoUrl=null;
    //Config meta
    //let confMeta=[alignTableFromJson(dataFromJson.confMetaLP.split('/*/')),alignTableFromJson(dataFromJson.confMetaGuideDetailPage.split('/*/')),alignTableFromJson(dataFromJson.confMetaVideoDetailPage.split('/*/'))];
    let confMeta=[
        alignTableFromJson(dataFromJson.confMetaLP.split('/*/'))
        ,alignTableFromJson(dataFromJson.confMetaGuideDetailPage.split('/*/'))
    ];
    //Config breadcrumb
    //let confBreadcrumb=[alignTableFromJson(dataFromJson.confBreadcrumbLP.split('/*/')),alignTableFromJson(dataFromJson.confBreadcrumbGuidePage.split('/*/')),alignTableFromJson(dataFromJson.confBreadcrumbVideoPage.split('/*/'))];
    let confBreadcrumb=[alignTableFromJson(dataFromJson.confBreadcrumbLP.split('/*/'))
        ,alignTableFromJson(dataFromJson.confBreadcrumbGuidePage.split('/*/'))
    ];
    //Config Banner
    //let confBanner=[alignTableFromJson(dataFromJson.confBannerLP.split('/*/')),alignTableFromJson(dataFromJson.confBannerGuideDetailPage.split('/*/')),alignTableFromJson(dataFromJson.confBannerVideoDetailPage.split('/*/'))];
    let confBanner=[
        alignTableFromJson(dataFromJson.confBannerLP.split('/*/'))
        ,alignTableFromJson(dataFromJson.confBannerGuideDetailPage.split('/*/'))
    ];
    //Config cdn for pdf
    let confPdfCdn=dataFromJson.confPdfCdn;
    //Config text
    let confTranslationForGuideInNavMenu=dataFromJson.confTranslationForGuideInNavMenu;
    let confCardTitle=alignTableFromJson(dataFromJson.confCardTitle.split('/*/'));
    let confCardDescription=alignTableFromJson(dataFromJson.confCardDescription.split('/*/'));
    let confTranslationForSeeMore=dataFromJson.confTranslationForSeeMore;
    //let confSocialSectionTitle=[dataFromJson.confSocialSectionTitleLP,dataFromJson.confSocialSectionTitleGuideDetailPage,dataFromJson.confSocialSectionTitleVideoDetailPage];
    let confSocialSectionTitle=[dataFromJson.confSocialSectionTitleLP,dataFromJson.confSocialSectionTitleGuideDetailPage];
    //let confCtaBtn=[alignTableFromJson(dataFromJson.confCtaBtnLP.split('/*/')),[dataFromJson.confCtaBtnGuide],[dataFromJson.confCtaBtnVideo]];
    let confCtaBtn=[alignTableFromJson(dataFromJson.confCtaBtnLP.split('/*/')),[dataFromJson.confCtaBtnGuide]];
    let confPageGuideH1=dataFromJson.confPageGuideH1;
    let confPageGuideCarouselTitle=alignTableFromJson(dataFromJson.confPageGuideCarouselTitle.split('/*/'));
    //let confPageVideoListYoutubeLink=alignTableFromJson(dataFromJson.confPageVideoListYoutubeLink.split('/*/'));
    let confSocialMediaIcon=alignTableFromJson(dataFromJson.confSocialMediaIcon.split('/*/'));
    let confJsMenuSticker=dataFromJson.confJsMenuSticker;
//***************************************************************************************//
//**Cypress**//
    beforeEach(() => {
        //Gestion d'erreur
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        //resolution 
        cy.viewport(1366, 768);
    });
    it('Guides TC01 || Verify Global Text and element', () => {
        //open pampers
        cy.visit(confBaseUrl);
        //verify GA in NavMenu
        cy.checkGuideDataAttr(['a[href="'+confBaseUrl+'/'+confCategoryUrl+'"]']
            ,['have.attr']
            ,['data-action-detail']
            ,['GUIDES']);
        //verify Navigation menu
        cy.get('.js-menu-list').contains(confTranslationForGuideInNavMenu).contains(confJsMenuSticker).click();
        //verify title
        cy.checkGuideMetaInfo(confMeta[0][0],confMeta[0][1],confMeta[0][2],confMeta[0][3]);
        //verify breadcrumb
        cy.checkGuideBreadcrumb(confBreadcrumb[0]);
        //verify hero top banner 
        cy.checkGuideBanner(confBanner[0][0],confBanner[0][1],false);
        //verify GA 
        cy.checkGuideDataAttr(
        //verify GA both video and Guide Pdf
            ['a[href="'+confBaseUrl+'/'+confCategoryUrl+'/'+confGuideUrl+'"]'
            ,'a[href="'+confPdfCdn+'"]'
            ,'a[href="'+confPdfCdn+'"]'
            ,confVideoUrl
            ,'#phmainbannerhero_1_GuideRepeater_lnkCta_1','#phmainbannerhero_1_GuideRepeater_lnkCta_1']
            ,['have.attr','have.attr','have.attr','have.attr','have.attr','have.attr']
            ,['data-action-detail','data-action-detail','data-vortex-scenario','data-action-detail','data-action-detail','data-vortex-scenario']
            ,['guide-landing-page_see-more-cta','guide-landing-page_download-for-free-cta','pdf-guide_your-go-to-pregnancy-guide','guide-landing-page_see-more-cta','guide-landing-page_link-to-videos-cta','video-guide_nurses-know']);
        //verify card title
        cy.get('.guide-card__title').contains(confCardTitle[0]);
        cy.get('.guide-card__title').contains(confCardTitle[1]);
        //verify card description
        cy.get('.guide-card__text').contains(confCardDescription[0]);
        cy.get('.guide-card__text').contains(confCardDescription[1]);
        //closed box img should have alt text
        cy.get('#phmainbannerhero_1_GuideRepeater_divGuideCard_0').contains(confTranslationForSeeMore);
        cy.get('#phmainbannerhero_1_GuideRepeater_divGuideCard_1').contains(confTranslationForSeeMore);
        //verify social section
        cy.checkGuideSocialSection(confSocialSectionTitle[0],confSocialMediaIcon);
        //verify registration popin
        cy.checkGuideCtaBtn(confCtaBtn[0][0]);
        cy.checkGuideCtaBtn(confCtaBtn[0][1]);
    });
    it('Guides TC02 || Verify Guide Pdf detail page',()=>{
        cy.visit(confBaseUrl+'/'+confCategoryUrl+'/'+confGuideUrl);
        //verify meta
        cy.checkGuideMetaInfo(confMeta[1][0],confMeta[1][1],confMeta[1][2],confMeta[1][3]);
        //verify breadcrumb
        cy.checkGuideBreadcrumb(confBreadcrumb[1]);
        //verify hero banner
        cy.checkGuideBanner(confBanner[1][0],confBanner[1][1],true);
        //verify main
        cy.get('.pregnancy-guide__header').contains(confPageGuideH1);
        cy.checkGuideMainPageGuide(confPageGuideCarouselTitle,3);
        //GA 
        cy.checkGuideDataAttr(['#phmainbannerhero_1_DownloadFullGuide','#phmainbannerhero_1_DownloadFullGuide']
            ,['have.attr','have.attr']
            ,['data-vortex-scenario','data-action-detail']
            ,['pdf-guide_your-go-to-pregnancy-guide','guide-detail-page_download-the-full-guide-cta']);
        //verify social section
        cy.checkGuideSocialSection(confSocialSectionTitle[1],confSocialMediaIcon);
        //verify cta btn
        cy.checkGuideCtaBtn(confCtaBtn[1][0]);
    });
    /*it('Guides TC03 || Verify Guide Video detail',()=>{
        cy.visit(confBaseUrl+'/'+confCategoryUrl+'/'+confVideoUrl);
        //verify meta
        cy.checkGuideMetaInfo(confMeta[2][0],confMeta[2][1],confMeta[2][2],confMeta[2][3]);
        //verify breadcrumb
        cy.checkGuideBreadcrumb(confBreadcrumb[2]);
        //verify hero banner
        cy.checkGuideBanner(confBanner[2][0],confBanner[2][1],true);
        //GA 
        cy.checkGuideDataAttr(['#phmainbannerhero_1_UnlockVideoCta']
            ,['have.attr']
            ,['data-vortex-scenario']
            ,['video-guide_nurses-know']);
        cy.checkGuideDataYoutubeAndVortexScenario(confPageVideoListYoutubeLink,6);
        //verify share section
        cy.checkGuideSocialSection(confSocialSectionTitle[2],confSocialMediaIcon);
        //Main
        cy.checkGuideCtaBtn(confCtaBtn[2][0]);
    });*/
})
