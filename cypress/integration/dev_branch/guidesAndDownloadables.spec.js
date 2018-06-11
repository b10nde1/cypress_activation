describe('Test1 dev branch', function() {
    /*it('Test google', function() {
        cy.viewport(1366, 768)
        cy.visit('https://www.google.com/')
        cy.get('#gws-output-pages-elements-homepage_additional_languages__als').contains('Google').click();
    })*/
    it('Guides TC00 || Verify Text and element', function() {
        cy.viewport(1366, 768)
        cy.visit('https://author.pampers.com.pgsitecore.com/en-us/guides-and-downloadables')
        cy.get('.c-breadcrumb').contains('Guides & Downloadables');
        cy.get('.hero-top-banner__title').contains('Guides & Downloadables');
        cy.get('.hero-top-banner__text').contains('These super-handy guides and downloadables will help you navigate through topics such as your pregnancy, your baby’s development, and so much more!');
        //Gestion d'erreur
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('something about the error')
            done()
            return false
        })
    })
})
