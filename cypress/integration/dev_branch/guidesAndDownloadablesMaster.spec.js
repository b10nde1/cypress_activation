//***************************************************************************************//
//**Load Data**//
import dataFromJson from '../../fixtures/data.json';
describe('Guides and downloadables', () => {
//***************************************************************************************//
//**Config**//
    //Config URLs
    let confBaseUrl=''+dataFromJson.confBaseUrl+''; 
    let confCategoryUrl='guides-and-downloadables';
    let confGuideUrl='your-go-to-pregnancy-guide';
    let confVideoUrl='interactive-guides-nurses-know';
    //Config meta
    let confMeta=[
        ["Guides and Downloadables | Pampers"
            ,"Choose one of our great free guides and downloadables to help you navigate throughout your pregnancy and beyond."
            ,"Guides & Downloadables"
            ,"Choose one of our great free guides and downloadables to help you navigate throughout your pregnancy and beyond."]
        ,['Your Go-To Pregnancy Guide | Pampers'
            ,"With our ultimate pregnancy guide you'll have everything you need from nutritional tips to weight trackers. Download it here."
            ,'Your Go-To Pregnancy Guide'
            ,"With our ultimate pregnancy guide you'll have everything you need from nutritional tips to weight trackers. Download it here."]
        ,['Interactive Video Guides - Nurses Know | Pampers'
            ,'Hear expert advice from specialist nurses on everything from delivery to bringing your baby home. Find out more through our videos.'
            ,'Interactive Guides Nurses Know'
            ,'Hear expert advice from specialist nurses on everything from delivery to bringing your baby home. Find out more through our videos.']
        ];
    //Config breadcrumb
    let confBreadcrumb=[
        ['Home','Guides & Downloadables']
        ,['Home','Guides & Downloadables','Go-To Pregnancy Guide']
        ,['Home','Guides & Downloadables','Interactive Guides: Nurses Know']
    ];
    //Config Banner
    let confBanner=[
        ['Guides & Downloadables','These super-handy guides and downloadables will help you navigate through topics such as your pregnancy, your baby’s development, and so much more!']
        ,['Your Go-To Pregnancy Guide','The important things you need to know about the nine months after conception, including a milestone infographic, fetal movement tracker, prenatal visit calendar, and tips on how to select your healthcare provider.']
        ,['Video Guide: Nurses Know','These videos contain expert advice from nurses specialized in pregnancy and postpartum care: from what happens when your water breaks to delivery, and bringing baby home.']
    ];
    //Config cdn for pdf
    let confPdfCdn="https://cdn.multibrand3.pgsitecore.com/en-CA/-/media/Files/Pampers/Pregnancy Guide.pdf?v=1";
    //Config text
    let confTranslationForGuideInNavMenu="GUIDES";
    let confCardTitle=[
        'Your Go-To Pregnancy Guide'
        ,'Video Guides: Nurses Know'
    ];
    let confCardDescription=[
        'The important things you need to know about the nine months after conception, including a milestone infographic, fetal movement tracker, prenatal visit calendar, and tips on how to select your healthcare provider.'
        ,'These videos contain expert advice from nurses specialized in pregnancy and postpartum care: from what happens when your water breaks, to delivery, and bringing baby home.'
    ];
    let confTranslationForSeeMore='See more';
    let confSocialSectionTitle=[
        'Do you know other parents who would like our Guides & Downloadables? Share this now:'
        ,'Do you know other parents who would like our Pregnancy Guide? Share this now:'
        ,'Do you know other parents who would like our Video Guide: Nurses Know? Share this now:'
    ];
    let confCtaBtn=[
        ['Download for FREE','Access video links']
        ,['Download the full guide FOR FREE']
        ,['Unlock all videos FOR FREE']
    ];
    let confPageGuideH1='Everything you will get:';
    let confPageGuideCarouselTitle=[
        'Your Go-To Pregnancy Guide'
        ,'Pregnancy Milestones'
        ,'Movement Tracker'
        ,'Selecting Your Healthcare Provider'
        ,'Prenatal Visit Calendar'
    ];
    let confPageVideoListYoutubeLink=[
        'https://www.youtube-nocookie.com/embed/61tvZboPFoA'
        ,'https://www.youtube-nocookie.com/embed/qp-iFJp261U'
        ,'https://www.youtube-nocookie.com/embed/igdmpV16alE'
        ,'https://www.youtube-nocookie.com/embed/nmf1dpRNA-8'
        ,'https://www.youtube-nocookie.com/embed/q0REE3y6-fU'
        ,'https://www.youtube-nocookie.com/embed/6UXL70g5Z-4'
    ];
    let confSocialMediaIcon=['facebook','twitter'];
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
        cy.checkDataAttr(['a[href="'+confBaseUrl+'/'+confCategoryUrl+'"]']
            ,['have.attr']
            ,['data-action-detail']
            ,['GUIDES']);
        //verify Navigation menu
        cy.get('.js-menu-list').contains(confTranslationForGuideInNavMenu).contains('New').click();
        //verify title
        cy.checkMetaInfo(confMeta[0][0],confMeta[0][1],confMeta[0][2],confMeta[0][3]);
        //verify breadcrumb
        cy.checkBreadcrumb(confBreadcrumb[0]);
        //verify hero top banner 
        cy.checkBanner(confBanner[0][0],confBanner[0][1],false);
        //verify GA 
        cy.checkDataAttr(
            ['a[href="'+confBaseUrl+'/'+confCategoryUrl+'/'+confGuideUrl+'"]'
            ,'a[href="'+confPdfCdn+'"]'
            ,'a[href="'+confPdfCdn+'"]'
            ,'a[href="'+confBaseUrl+'/'+confCategoryUrl+'/'+confVideoUrl+'"]'
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
        cy.checkSocialSection(confSocialSectionTitle[0],confSocialMediaIcon);
        //verify registration popin
        cy.checkCtaBtn(confCtaBtn[0][0]);
        cy.checkCtaBtn(confCtaBtn[0][1]);
    });
    it('Guides TC02 || Verify Guide Pdf detail page',()=>{
        cy.visit(confBaseUrl+'/'+confCategoryUrl+'/'+confGuideUrl);
        //verify meta
        cy.checkMetaInfo(confMeta[1][0],confMeta[1][1],confMeta[1][2],confMeta[1][3]);
        //verify breadcrumb
        cy.checkBreadcrumb(confBreadcrumb[1]);
        //verify hero banner
        cy.checkBanner(confBanner[1][0],confBanner[1][1],true);
        //verify main
        cy.get('.pregnancy-guide__header').contains(confPageGuideH1);
        cy.checkMainPageGuide(confPageGuideCarouselTitle,3);
        //GA 
        cy.checkDataAttr(['#phmainbannerhero_1_DownloadFullGuide','#phmainbannerhero_1_DownloadFullGuide']
            ,['have.attr','have.attr']
            ,['data-vortex-scenario','data-action-detail']
            ,['pdf-guide_your-go-to-pregnancy-guide','guide-detail-page_download-the-full-guide-cta']);
        //verify social section
        cy.checkSocialSection(confSocialSectionTitle[1],confSocialMediaIcon);
        //verify cta btn
        cy.checkCtaBtn(confCtaBtn[1][0]);
    });
    it('Guides TC03 || Verify Guide Video detail',()=>{
        cy.visit(confBaseUrl+'/'+confCategoryUrl+'/'+confVideoUrl);
        //verify meta
        cy.checkMetaInfo(confMeta[2][0],confMeta[2][1],confMeta[2][2],confMeta[2][3]);
        //verify breadcrumb
        cy.checkBreadcrumb(confBreadcrumb[2]);
        //verify hero banner
        cy.checkBanner(confBanner[2][0],confBanner[2][1],true);
        //GA 
        cy.checkDataAttr(['#phmainbannerhero_1_UnlockVideoCta']
            ,['have.attr']
            ,['data-vortex-scenario']
            ,['video-guide_nurses-know']);
        cy.checkDataYoutubeAndVortexScenario(confPageVideoListYoutubeLink,6);
        //verify share section
        cy.checkSocialSection(confSocialSectionTitle[2],confSocialMediaIcon);
        //Main
        cy.checkCtaBtn(confCtaBtn[2][0]);
    });
})
