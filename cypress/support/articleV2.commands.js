Cypress.Commands.add('checkArticleV2Breadcrumb',()=>{
    try{
        cy.get('.c-breadcrumb__list').should('have.attr','itemtype','http://data-vocabulary.org/Breadcrumb');
    }
    catch(ex){
        console.log('checkArticleV2Breadcrumb ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2Title',(argTitle)=>{
    try{
        cy.get('.article-oasis__title');
        cy.get('.article-oasis__title').contains(argTitle);
        cy.get('head meta[name="og:title"]').should('have.attr','content',argTitle);
    }
    catch(ex){
        console.log('checkArticleV2Title ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2AuthorName',()=>{
    try{
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisheaderinformation_0_AuthorLink').should('have.attr','data-action-detail','author-page_author_view-detail-link');
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_AuthorLink').should('have.attr','data-action-detail','author-page_author_view-detail-link');        
    }
    catch(ex){
        console.log('checkArticleV2AuthorName ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2DateAndTimeInfo',()=>{
    try{
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisheaderinformation_0_ReadTimeSection').should('have.class','article-oasis__details--item');
    }
    catch(ex){
        console.log('checkArticleV2DateAndTimeInfo ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2ShareSection',()=>{
    try{
        cy.get('.js-article-share-desktop');
        cy.get('.js-article-share-desktop').children('.icon__print.icon_print.overlay-oasis.js-share--print.event_print_page');
    }
    catch(ex){
        console.log('checkArticleV2ShareSection ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2LikeIcon',()=>{
    try{
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_LikeButton');
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_LikeButton').should('have.class','overlay-oasis js-add-favorites event_socialmedia_like');
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_pharticleoasisfooterinformation_0_LikeButton').should('have.attr','data-vortex-scenario','like');
    }
    catch(ex){
        console.log('checkArticleV2LikeIcon ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2ProgressBar',()=>{
    try{
        cy.get('.article-oasis__progressbar').children('progress').should('have.attr','max');
    }
    catch(ex){
        console.log('checkArticleV2ProgressBar ::'+ex);
    }
});
Cypress.Commands.add('checkArticleV2Report',(argUrls,argReportId)=>{
    try{
        let tempResult='';
        for(var compt=0;compt<argUrls.length;compt++){
            let tempTitle='\nTitle-TC'+compt+' :: "'+argUrls[compt][0]+'",\n';
            let tempUrl='Url-TC'+compt+' :: "'+argUrls[compt][1]+'"\n';
            tempResult+=tempTitle+tempUrl;
        }
        cy.writeFile('cypress/report/articleV2/articlev2Id'+argReportId+'.json','{'+tempResult+'}');
    }
    catch(ex){
        console.log('checkArticleV2Report ::'+ex);
    }
});