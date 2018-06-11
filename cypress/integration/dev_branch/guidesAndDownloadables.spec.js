describe('Test1 dev branch', function() {
    /*it('Test google', function() {
        cy.viewport(1366, 768)
        cy.visit('https://www.google.com/')
        cy.get('#gws-output-pages-elements-homepage_additional_languages__als').contains('Google').click();
    })*/
    it('Guides TC01 || Verify Global Text and element', function() {
        //Gestion d'erreur
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        //resolution 
        cy.viewport(1366, 768)
        //open pampers
        cy.visit('https://author.pampers.com.pgsitecore.com/en-us/');
        //verify Navigation menu
        cy.get('.js-menu-list').contains('GUIDES').contains('New').click();
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
        cy.get('.js-share--print').contains('Print');
    })
})
