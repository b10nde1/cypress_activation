describe('Guides and downloadables', () => {
    beforeEach(() => {
        //Gestion d'erreur
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        //resolution 
        cy.viewport(1366, 768);
    });
    it('Guides TC01 || Verify Global Text and element', () => {
        //open pampers
        cy.visit('https://www.pampers.ca/en-ca/');
        //verify Navigation menu
        cy.get('.js-menu-list').contains('GUIDES').contains('New').click();
        //verify title
        cy.get('head title').should('contain','Guides and Downloadables | Pampers');
        //verify breadcrumb
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
        //cy.get('.js-share--print').contains('Print');
        //verify main element
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
    });
    it('Guides TC02 || Verify Guide Pdf detail page',()=>{
        cy.visit('https://www.pampers.ca/en-ca/guides-and-downloadables/your-go-to-pregnancy-guide');
    });
})
