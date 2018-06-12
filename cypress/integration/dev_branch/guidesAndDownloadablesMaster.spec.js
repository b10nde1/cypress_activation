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
        cy.get('a[href="https://www.pampers.ca/en-ca/guides-and-downloadables"]').should('have.attr','data-action-detail','GUIDES');
        //verify Navigation menu
        cy.get('.js-menu-list').contains('GUIDES').contains('New').click();
        //verify title
        cy.get('head title').should('contain','Guides and Downloadables | Pampers');
        //vetrify meta description
        cy.get('head meta[name="description"]').should("have.attr", "content", "Choose one of our great free guides and downloadables to help you navigate throughout your pregnancy and beyond.");
        //verify Og title
        cy.get('head meta[property="og:title"]').should('have.attr','content','Guides & Downloadables');
        //verify og description
        cy.get('head meta[property="og:description"]').should('have.attr','content','Choose one of our great free guides and downloadables to help you navigate throughout your pregnancy and beyond.');
        //verify breadcrumb
        cy.get('.c-breadcrumb').contains('Home');
        cy.get('.c-breadcrumb').contains('Guides & Downloadables');
        //verify hero top banner title
        cy.get('.hero-top-banner__title').contains('Guides & Downloadables');
        //verify hero top banner text
        cy.get('.hero-top-banner__text').contains('These super-handy guides and downloadables will help you navigate through topics such as your pregnancy, your baby’s development, and so much more!');
        //verify social title section
        cy.get('.section-social__title').contains('Do you know other parents who would like our Guides & Downloadables? Share this now:');
        //social icon section 
        cy.get('.js-share--facebook').contains('Facebook');
        cy.get('.js-share--twitter').contains('Twitter');
        cy.get('.js-share--print');
        //verify GA 
        cy.get('a[href="https://www.pampers.ca/en-ca/guides-and-downloadables/your-go-to-pregnancy-guide"]').should('have.attr','data-action-detail','guide-landing-page_see-more-cta');
        cy.get('a[href="https://cdn.multibrand3.pgsitecore.com/en-CA/-/media/Files/Pampers/Pregnancy Guide.pdf?v=1"]').should('have.attr','data-action-detail','guide-landing-page_download-for-free-cta');
        cy.get('a[href="https://cdn.multibrand3.pgsitecore.com/en-CA/-/media/Files/Pampers/Pregnancy Guide.pdf?v=1"]').should('have.attr','data-vortex-scenario','pdf-guide_your-go-to-pregnancy-guide');
        cy.get('a[href="https://www.pampers.ca/en-ca/guides-and-downloadables/interactive-guides-nurses-know"]').should('have.attr','data-action-detail','guide-landing-page_see-more-cta');
        cy.get('#phmainbannerhero_1_GuideRepeater_lnkCta_1').should('have.attr','data-action-detail','guide-landing-page_link-to-videos-cta');
        cy.get('#phmainbannerhero_1_GuideRepeater_lnkCta_1').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        //verify card title
        cy.get('.guide-card__title').contains('Your Go-To Pregnancy Guide');
        cy.get('.guide-card__title').contains('Video Guides: Nurses Know');
        //verify card description
        cy.get('.guide-card__text').contains('The important things you need to know about the nine months after conception, including a milestone infographic, fetal movement tracker, prenatal visit calendar, and tips on how to select your healthcare provider.');
        cy.get('.guide-card__text').contains('These videos contain expert advice from nurses specialized in pregnancy and postpartum care: from what happens when your water breaks, to delivery, and bringing baby home.');
        //verify registration popin
        cy.get('.btn--download-list-oasis').contains('Download for FREE').click();
        cy.get('.ajs-body');
        cy.get('.ajs-close').click();
        cy.get('.btn--download-list-oasis').contains('Access video links').click();
        cy.get('.ajs-body');
        cy.get('.ajs-close').click();
        //closed box img should have alt text
        cy.get('#phmainbannerhero_1_GuideRepeater_divGuideCard_0').contains('See more');
        cy.get('#phmainbannerhero_1_GuideRepeater_divGuideCard_1').contains('See more');
    });
    it('Guides TC02 || Verify Guide Pdf detail page',()=>{
        cy.visit('https://www.pampers.ca/en-ca/guides-and-downloadables/your-go-to-pregnancy-guide');
        //verify meta
        cy.get('head title').should('contain', 'Your Go-To Pregnancy Guide | Pampers');
        cy.get('head meta[name="description"]').should('have.attr','content',"With our ultimate pregnancy guide you'll have everything you need from nutritional tips to weight trackers. Download it here.");
        cy.get('head meta[property="og:title"]').should('have.attr','content','Your Go-To Pregnancy Guide');
        cy.get('head meta[property="og:description"]').should('have.attr','content',"With our ultimate pregnancy guide you'll have everything you need from nutritional tips to weight trackers. Download it here.");
        //verify breadcrumb
        cy.get('.c-breadcrumb').contains('Home');
        cy.get('.c-breadcrumb').contains('Guides & Downloadables');
        cy.get('.c-breadcrumb').contains('Go-To Pregnancy Guide');
        //verify hero banner
        cy.get('.hero-top-banner__title').contains('Your Go-To Pregnancy Guide');
        cy.get('.hero-top-banner__text').contains('The important things you need to know about the nine months after conception, including a milestone infographic, fetal movement tracker, prenatal visit calendar, and tips on how to select your healthcare provider.');
        cy.get('.hero-top-banner__logo').should('have.attr','alt','Pampers Logo');
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
        cy.get('.btn--download-list-oasis').contains('Download the full guide FOR FREE').click();
        cy.get('.ajs-body');
        cy.get('.ajs-close').click();
        //GA 
        cy.get('#phmainbannerhero_1_DownloadFullGuide').should('have.attr','data-vortex-scenario','pdf-guide_your-go-to-pregnancy-guide');
        cy.get('#phmainbannerhero_1_DownloadFullGuide').should('have.attr','data-action-detail','guide-detail-page_download-the-full-guide-cta');
        //verify share section
        cy.get('.js-share--facebook').contains('Facebook');
        cy.get('.js-share--twitter').contains('Twitter');
        cy.get('.js-share--print');
        cy.get('.section-social__title').contains('Do you know other parents who would like our Pregnancy Guide? Share this now:');
    });
    it('Guides TC03 || Verify Guide Video detail',()=>{
        cy.visit('https://www.pampers.ca/en-ca/guides-and-downloadables/interactive-guides-nurses-know');
        //verify meta
        cy.get('head title').should('contain', 'Interactive Video Guides - Nurses Know | Pampers');
        cy.get('head meta[name="description"]').should('have.attr','content',"Hear expert advice from specialist nurses on everything from delivery to bringing your baby home. Find out more through our videos.");
        cy.get('head meta[property="og:title"]').should('have.attr','content','Interactive Guides Nurses Know');
        cy.get('head meta[property="og:description"]').should('have.attr','content',"Hear expert advice from specialist nurses on everything from delivery to bringing your baby home. Find out more through our videos.");
        //verify breadcrumb
        cy.get('.c-breadcrumb').contains('Home');
        cy.get('.c-breadcrumb').contains('Guides & Downloadables');
        cy.get('.c-breadcrumb').contains('Interactive Guides: Nurses Know');
        //verify hero banner
        cy.get('.hero-top-banner__title').contains('Video Guide: Nurses Know');
        cy.get('.hero-top-banner__text').contains('These videos contain expert advice from nurses specialized in pregnancy and postpartum care: from what happens when your water breaks to delivery, and bringing baby home.');
        cy.get('.hero-top-banner__logo').should('have.attr','alt','Pampers Logo');
        
        //GA 
        cy.get('#phmainbannerhero_1_VideoGuideCtaSection').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_0').should('have.attr','data-youtube-link');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_0').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_1').should('have.attr','data-youtube-link');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_1').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_2').should('have.attr','data-youtube-link');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_2').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_3').should('have.attr','data-youtube-link');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_3').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_4').should('have.attr','data-youtube-link');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_4').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_5').should('have.attr','data-youtube-link');
        cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_5').should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        //verify share section
        cy.get('.js-share--facebook').contains('Facebook');
        cy.get('.js-share--twitter').contains('Twitter');
        cy.get('.js-share--print');
        cy.get('.section-social__title').contains('Do you know other parents who would like our Video Guide: Nurses Know? Share this now:');
    });
})
