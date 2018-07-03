//***************************************************************************************//
//**List Funtction Guides**//
Cypress.Commands.add('checkGuideMainPageGuide',(argListCardTitle,argIdClickNextSlide)=>{
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
        console.log('checkGuideMainPageGuide ::'+ex);
    }
});
Cypress.Commands.add('checkGuideBanner',(argBannerTitle,argBannerDescription,argIfPampersLogoIsPresent)=>{
    try{
        cy.get('.hero-top-banner__title').contains(argBannerTitle);
        cy.get('.hero-top-banner__text').contains(argBannerDescription);
        if(argIfPampersLogoIsPresent==true)cy.get('.hero-top-banner__logo').should('have.attr','alt',' ');
    }
    catch(ex){
        console.log('checkGuideBanner ::'+ex);
    }
});
Cypress.Commands.add('checkGuideCtaBtn',(argCtaText)=>{
    try{
        cy.get('.btn--download-list-oasis').contains(argCtaText).click();
        cy.get('.ajs-body');
        document.getElementsByClassName("__ADORIC__1").display="none";
        cy.get('.ajs-close').click({force: true});
    }
    catch(ex){
        console.log('checkGuideCtaBtn ::'+ex);
    }
});
Cypress.Commands.add('checkGuideDataAttr',(argListGet,argListShouldAttr,argShouldData,argShouldValue)=>{
    try{
        for(var compt=0;compt<argListGet.length;compt++){
            if(argListGet[compt]!=null)cy.get(argListGet[compt]).should(argListShouldAttr[compt],argShouldData[compt],argShouldValue[compt]);
        }
    }
    catch(ex){
        console.log('checkGuideDataAttr ::'+ex);
    }
});
Cypress.Commands.add('checkGuideDataYoutubeAndVortexScenario',(argListYoutubeLink)=>{
    try{
        for(var compt=0;compt<argListYoutubeLink.length;compt++){
            cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_'+compt).should('have.attr','data-youtube-link',argListYoutubeLink[compt]);
            cy.get('#phmainbannerhero_1_VideoGuideRepeater_lnkWatchVideo_'+compt).should('have.attr','data-vortex-scenario','video-guide_nurses-know');
        }
    }
    catch(ex){
        console.log('checkGuideDataYoutubeAndVortexScenario ::'+ex);
    }
});
Cypress.Commands.add('checkGuideBreadcrumb',(arg)=>{
    try{
        for(var compt=0;compt<arg.length;compt++){
            cy.get('.c-breadcrumb').contains(arg[compt]);
        }
    }
    catch(ex){
        console.log('checkGuideBreadcrumb ::'+ex);
    }
});
Cypress.Commands.add('checkGuideSocialSection',(argSocialTitle,argListSocialMedia)=>{
    try{
        cy.get('.section-social__title').contains(argSocialTitle);
        for(var compt=0;compt<argListSocialMedia.length;compt++){
            cy.get('.js-share--'+argListSocialMedia[compt].toLowerCase()+'').should('have.attr','data-action-detail',argListSocialMedia[compt].toLowerCase());
            if(argListSocialMedia[compt]=='print')cy.get('.js-share--print');
        }
    }
    catch(ex){
        console.log("checkGuideSocialSection ::"+ex);
    }
});
Cypress.Commands.add('checkGuideMetaInfo',(argHeadTitle,argMetaDescription,argMetaOgTitle,argMetaOgDescription)=>{
    try{
        cy.get('head title').should('contain', argHeadTitle);
        cy.get('head meta[name="description"]').should('have.attr','content',argMetaDescription);
        cy.get('head meta[property="og:title"]').should('have.attr','content',argMetaOgTitle);
        cy.get('head meta[property="og:description"]').should('have.attr','content',argMetaOgDescription);
    }
    catch(ex){
        console.log('checkGuideMetaInfo ::'+ex);
    }
});