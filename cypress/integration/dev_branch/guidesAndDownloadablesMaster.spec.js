describe('Guides and downloadables', () => {
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
        cy.visit('https://www.pampers.ca/en-ca/');
        //verify GA in NavMenu
        checkDataAttr(['a[href="https://www.pampers.ca/en-ca/guides-and-downloadables"]']
            ,['have.attr']
            ,['data-action-detail']
            ,['GUIDES']);
        //verify Navigation menu
        cy.get('.js-menu-list').contains('GUIDES').contains('New').click();
        //verify title
        checkMetaInfo("Guides and Downloadables | Pampers"
            ,"Choose one of our great free guides and downloadables to help you navigate throughout your pregnancy and beyond."
            ,"Guides & Downloadables"
            ,"Choose one of our great free guides and downloadables to help you navigate throughout your pregnancy and beyond."
        );
        //verify breadcrumb
        checkBreadcrumb(['Home','Guides & Downloadables']);
        //verify hero top banner 
        checkBanner('Guides & Downloadables','These super-handy guides and downloadables will help you navigate through topics such as your pregnancy, your baby’s development, and so much more!',false);
        //verify GA 
        checkDataAttr(
            ['a[href="https://www.pampers.ca/en-ca/guides-and-downloadables/your-go-to-pregnancy-guide"]','a[href="https://cdn.multibrand3.pgsitecore.com/en-CA/-/media/Files/Pampers/Pregnancy Guide.pdf?v=1"]','a[href="https://cdn.multibrand3.pgsitecore.com/en-CA/-/media/Files/Pampers/Pregnancy Guide.pdf?v=1"]','a[href="https://www.pampers.ca/en-ca/guides-and-downloadables/interactive-guides-nurses-know"]','#phmainbannerhero_1_GuideRepeater_lnkCta_1','#phmainbannerhero_1_GuideRepeater_lnkCta_1']
            ,['have.attr','have.attr','have.attr','have.attr','have.attr','have.attr']
            ,['data-action-detail','data-action-detail','data-vortex-scenario','data-action-detail','data-action-detail','data-vortex-scenario']
            ,['guide-landing-page_see-more-cta','guide-landing-page_download-for-free-cta','pdf-guide_your-go-to-pregnancy-guide','guide-landing-page_see-more-cta','guide-landing-page_link-to-videos-cta','video-guide_nurses-know']);
        //verify card title
        cy.get('.guide-card__title').contains('Your Go-To Pregnancy Guide');
        cy.get('.guide-card__title').contains('Video Guides: Nurses Know');
        //verify card description
        cy.get('.guide-card__text').contains('The important things you need to know about the nine months after conception, including a milestone infographic, fetal movement tracker, prenatal visit calendar, and tips on how to select your healthcare provider.');
        cy.get('.guide-card__text').contains('These videos contain expert advice from nurses specialized in pregnancy and postpartum care: from what happens when your water breaks, to delivery, and bringing baby home.');
        //closed box img should have alt text
        cy.get('#phmainbannerhero_1_GuideRepeater_divGuideCard_0').contains('See more');
        cy.get('#phmainbannerhero_1_GuideRepeater_divGuideCard_1').contains('See more');
        //verify social section
        checkSocialSection('Do you know other parents who would like our Guides & Downloadables? Share this now:');
        //verify registration popin
        checkCtaBtn('Download for FREE');
        checkCtaBtn('Access video links');
    });
    it('Guides TC02 || Verify Guide Pdf detail page',()=>{
        cy.visit('https://www.pampers.ca/en-ca/guides-and-downloadables/your-go-to-pregnancy-guide');
        //verify meta
        checkMetaInfo('Your Go-To Pregnancy Guide | Pampers'
            ,"With our ultimate pregnancy guide you'll have everything you need from nutritional tips to weight trackers. Download it here."
            ,'Your Go-To Pregnancy Guide'
            ,"With our ultimate pregnancy guide you'll have everything you need from nutritional tips to weight trackers. Download it here."
        );
        //verify breadcrumb
        checkBreadcrumb(['Home','Guides & Downloadables','Go-To Pregnancy Guide']);
        //verify hero banner
        checkBanner('Your Go-To Pregnancy Guide','The important things you need to know about the nine months after conception, including a milestone infographic, fetal movement tracker, prenatal visit calendar, and tips on how to select your healthcare provider.',true);
        //verify main
        cy.get('.pregnancy-guide__header').contains('Everything you will get:');
        cy.get('#slick-slide01').click();
        cy.get('.pregnancy-guide__slide').should('have.attr','data-slick-index','0').contains('Your Go-To Pregnancy Guide');
        cy.get('.pregnancy-guide__slide').should('have.attr','data-slick-index','0').contains('Pregnancy Milestones');
        cy.get('.pregnancy-guide__slide').should('have.attr','data-slick-index','0').contains('Movement Tracker');
        cy.get('.slick-next').click();
        cy.get('#slick-slide04').click();
        cy.get('.pregnancy-guide__slide').should('have.attr','data-slick-index','0').contains('Selecting Your Healthcare Provider');
        cy.get('.pregnancy-guide__slide').should('have.attr','data-slick-index','0').contains('Prenatal Visit Calendar');
        //GA 
        checkDataAttr(['#phmainbannerhero_1_DownloadFullGuide','#phmainbannerhero_1_DownloadFullGuide']
            ,['have.attr','have.attr']
            ,['data-vortex-scenario','data-action-detail']
            ,['pdf-guide_your-go-to-pregnancy-guide','guide-detail-page_download-the-full-guide-cta']);
        //verify social section
        checkSocialSection('Do you know other parents who would like our Pregnancy Guide? Share this now:');
        //verify cta btn
        checkCtaBtn('Download the full guide FOR FREE');
    });
    it('Guides TC03 || Verify Guide Video detail',()=>{
        cy.visit('https://www.pampers.ca/en-ca/guides-and-downloadables/interactive-guides-nurses-know');
        //verify meta
        checkMetaInfo('Interactive Video Guides - Nurses Know | Pampers'
            ,'Hear expert advice from specialist nurses on everything from delivery to bringing your baby home. Find out more through our videos.'
            ,'Interactive Guides Nurses Know'
            ,'Hear expert advice from specialist nurses on everything from delivery to bringing your baby home. Find out more through our videos.');
        //verify breadcrumb
        checkBreadcrumb(['Home','Guides & Downloadables','Interactive Guides: Nurses Know']);
        //verify hero banner
        checkBanner('Video Guide: Nurses Know','These videos contain expert advice from nurses specialized in pregnancy and postpartum care: from what happens when your water breaks to delivery, and bringing baby home.',true);
        //GA 
        checkDataAttr(['#phmainbannerhero_1_UnlockVideoCta']
            ,['have.attr']
            ,['data-vortex-scenario']
            ,['video-guide_nurses-know']);
        checkDataYoutubeAndVortexScenario(6);
        //verify share section
        checkSocialSection('Do you know other parents who would like our Video Guide: Nurses Know? Share this now:');
        //Main
        checkCtaBtn('Unlock all videos FOR FREE');
    });
    const checkMetaInfo=(argHeadTitle,argMetaDescription,argMetaOgTitle,argMetaOgDescription)=>{
        cy.get('head title').should('contain', argHeadTitle);
        cy.get('head meta[name="description"]').should('have.attr','content',argMetaDescription);
        cy.get('head meta[property="og:title"]').should('have.attr','content',argMetaOgTitle);
        cy.get('head meta[property="og:description"]').should('have.attr','content',argMetaOgDescription);
    }
    const checkBanner=(argBannerTitle,argBannerDescription,argIfPampersLogoIsPresent)=>{
        cy.get('.hero-top-banner__title').contains(argBannerTitle);
        cy.get('.hero-top-banner__text').contains(argBannerDescription);
        if(argIfPampersLogoIsPresent==true)cy.get('.hero-top-banner__logo').should('have.attr','alt','Pampers Logo');
    }
    const checkCtaBtn=(argCtaText)=>{
        cy.get('.btn--download-list-oasis').contains(argCtaText).click();
        cy.get('.ajs-body');
        cy.get('.ajs-close').click();
    }
    const checkDataAttr=(argListGet,argListShouldAttr,argShouldData,argShouldValue)=>{
        for(var compt=0;compt<argListGet.length;compt++){
            cy.get(argListGet[compt]).should(argListShouldAttr[compt],argShouldData[compt],argShouldValue[compt]);
        }
    }
    const checkDataYoutubeAndVortexScenario=(argNbElements)=>{
        for(var compt=0;compt<argNbElements;compt++){
            cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_'+compt).should('have.attr','data-youtube-link');
            cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_'+compt).should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        }
    }
    const checkBreadcrumb=(arg)=>{
        for(var compt=0;compt<arg.length;compt++){
            cy.get('.c-breadcrumb').contains(arg[compt]);
        }
    }
    const checkSocialSection =(argSocialTitle)=>{
        cy.get('.js-share--facebook').contains('Facebook');
        cy.get('.js-share--twitter').contains('Twitter');
        cy.get('.js-share--print');
        cy.get('.section-social__title').contains(argSocialTitle);
    }
})
