describe('Guides and downloadables', () => {
//***************************************************************************************//
//**Load Data**//

//***************************************************************************************//
//**Config**//
    //Config URLs
    let confBaseUrl='https://www.pampers.ca/en-ca'; 
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
        checkDataAttr(['a[href="'+confBaseUrl+'/'+confCategoryUrl+'"]']
            ,['have.attr']
            ,['data-action-detail']
            ,['GUIDES']);
        //verify Navigation menu
        cy.get('.js-menu-list').contains(confTranslationForGuideInNavMenu).contains('New').click();
        //verify title
        checkMetaInfo(confMeta[0][0],confMeta[0][1],confMeta[0][2],confMeta[0][3]);
        //verify breadcrumb
        checkBreadcrumb(confBreadcrumb[0]);
        //verify hero top banner 
        checkBanner(confBanner[0][0],confBanner[0][1],false);
        //verify GA 
        checkDataAttr(
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
        checkSocialSection(confSocialSectionTitle[0],confSocialMediaIcon);
        //verify registration popin
        checkCtaBtn(confCtaBtn[0][0]);
        checkCtaBtn(confCtaBtn[0][1]);
    });
    it('Guides TC02 || Verify Guide Pdf detail page',()=>{
        cy.visit(confBaseUrl+'/'+confCategoryUrl+'/'+confGuideUrl);
        //verify meta
        checkMetaInfo(confMeta[1][0],confMeta[1][1],confMeta[1][2],confMeta[1][3]);
        //verify breadcrumb
        checkBreadcrumb(confBreadcrumb[1]);
        //verify hero banner
        checkBanner(confBanner[1][0],confBanner[1][1],true);
        //verify main
        cy.get('.pregnancy-guide__header').contains(confPageGuideH1);
        checkMainPageGuide(confPageGuideCarouselTitle,3);
        //GA 
        checkDataAttr(['#phmainbannerhero_1_DownloadFullGuide','#phmainbannerhero_1_DownloadFullGuide']
            ,['have.attr','have.attr']
            ,['data-vortex-scenario','data-action-detail']
            ,['pdf-guide_your-go-to-pregnancy-guide','guide-detail-page_download-the-full-guide-cta']);
        //verify social section
        checkSocialSection(confSocialSectionTitle[1],confSocialMediaIcon);
        //verify cta btn
        checkCtaBtn(confCtaBtn[1][0]);
    });
    it('Guides TC03 || Verify Guide Video detail',()=>{
        cy.visit(confBaseUrl+'/'+confCategoryUrl+'/'+confVideoUrl);
        //verify meta
        checkMetaInfo(confMeta[2][0],confMeta[2][1],confMeta[2][2],confMeta[2][3]);
        //verify breadcrumb
        checkBreadcrumb(confBreadcrumb[2]);
        //verify hero banner
        checkBanner(confBanner[2][0],confBanner[2][1],true);
        //GA 
        checkDataAttr(['#phmainbannerhero_1_UnlockVideoCta']
            ,['have.attr']
            ,['data-vortex-scenario']
            ,['video-guide_nurses-know']);
        checkDataYoutubeAndVortexScenario(confPageVideoListYoutubeLink,6);
        //verify share section
        checkSocialSection(confSocialSectionTitle[2],confSocialMediaIcon);
        //Main
        checkCtaBtn(confCtaBtn[2][0]);
    });
//***************************************************************************************//
//**List Funtction**//
    const checkMainPageGuide=(argListCardTitle,argIdClickNextSlide)=>{
        try{
            cy.get('#slick-slide01').click();
            for(var compt=0;compt<argListCardTitle.length;compt++){
                if(compt==argIdClickNextSlide){
                    cy.get('.slick-next').click();
                    cy.get('#slick-slide04').click();
                }
                cy.get('.pregnancy-guide__slide').should('have.attr','data-slick-index','0').contains(argListCardTitle[compt]);
            }
        }
        catch(ex){
            console.log('checkMainPageGuide ::'+ex);
        }
    }
    const checkMetaInfo=(argHeadTitle,argMetaDescription,argMetaOgTitle,argMetaOgDescription)=>{
        try{
            cy.get('head title').should('contain', argHeadTitle);
            cy.get('head meta[name="description"]').should('have.attr','content',argMetaDescription);
            cy.get('head meta[property="og:title"]').should('have.attr','content',argMetaOgTitle);
            cy.get('head meta[property="og:description"]').should('have.attr','content',argMetaOgDescription);
        }
        catch(ex){
            console.log('checkMetaInfo ::'+ex);
        }
    }
    const checkBanner=(argBannerTitle,argBannerDescription,argIfPampersLogoIsPresent)=>{
        try{
            cy.get('.hero-top-banner__title').contains(argBannerTitle);
            cy.get('.hero-top-banner__text').contains(argBannerDescription);
            if(argIfPampersLogoIsPresent==true)cy.get('.hero-top-banner__logo').should('have.attr','alt','Pampers Logo');
        }
        catch(ex){
            console.log('checkBanner ::'+ex);
        }
    }
    const checkCtaBtn=(argCtaText)=>{
        try{
            cy.get('.btn--download-list-oasis').contains(argCtaText).click();
            cy.get('.ajs-body');
            document.getElementsByClassName("__ADORIC__1").display="none";
            cy.get('.ajs-close').click({force: true});
        }
        catch(ex){
            console.log('checkCtaBtn ::'+ex);
        }
    }
    const checkDataAttr=(argListGet,argListShouldAttr,argShouldData,argShouldValue)=>{
        try{
            for(var compt=0;compt<argListGet.length;compt++){
                cy.get(argListGet[compt]).should(argListShouldAttr[compt],argShouldData[compt],argShouldValue[compt]);
            }
        }
        catch(ex){
            console.log('checkDataAttr ::'+ex);
        }
    }
    const checkDataYoutubeAndVortexScenario=(argListYoutubeLink)=>{
        try{
            for(var compt=0;compt<argListYoutubeLink.length;compt++){
                cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_'+compt).should('have.attr','data-youtube-link',argListYoutubeLink[compt]);
                cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_'+compt).should('have.attr','data-vortex-scenario','video-guide_nurses-know');
            }
        }
        catch(ex){
            console.log('checkDataYoutubeAndVortexScenario ::'+ex);
        }
    }
    const checkBreadcrumb=(arg)=>{
        try{
            for(var compt=0;compt<arg.length;compt++){
                cy.get('.c-breadcrumb').contains(arg[compt]);
            }
        }
        catch(ex){
            console.log('checkBreadcrumb ::'+ex);
        }
    }
    const checkSocialSection =(argSocialTitle,argListSocialMedia)=>{
        try{
            cy.get('.section-social__title').contains(argSocialTitle);
            for(var compt=0;compt<argListSocialMedia.length;compt++){
                cy.get('.js-share--'+argListSocialMedia[compt].toLowerCase()+'').should('have.attr','data-action-detail',argListSocialMedia[compt].toLowerCase());
            }
            cy.get('.js-share--print');
        }
        catch(ex){
            console.log("checkSocialSection ::"+ex);
        }
    }
})
