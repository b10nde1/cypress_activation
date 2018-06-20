//***************************************************************************************//
//**List Funtction Product Pure**//
Cypress.Commands.add('checkProductPureDataHub',(argHubThumbnail,argHubProdcutOasisText)=>{
    try{
        let hub=['Newborn','Baby','Toddler'];
        for(var compt=0;compt<3;compt++){
            cy.get('.slider-menu__item').contains(hub[compt]).click();
            cy.get('.l-main__container').children().contains(argHubProdcutOasisText).parent('div').should('have.attr','data-action-detail','hub_'+hub[1].toLowerCase()+'_pampers-pure');
            cy.get('.box-product-oasis__thumbnail').contains(argHubThumbnail);
            cy.get('.box-product-oasis__text').contains(argHubProdcutOasisText);
        }
    }
    catch(ex){
        console.log("checkProductPureDataHub ::"+ex);
    }
});
Cypress.Commands.add('checkProductPureBanner',(argTitle,argImgAlt,argShortText)=>{
    try{
        cy.get('.pure-top-landing__content').contains(argTitle);
        cy.get('.pure-top-landing__image').children('picture').children('img').should('have.attr','alt',argImgAlt[0]);
        cy.get('.pure-top-landing__protection').children('img').should('have.attr','alt',argImgAlt[1]);
        cy.get('.pure-top-landing__protection').contains(argShortText);
    }
    catch(ex){
        console.log("checkProductPureBanner ::"+ex);
    }
});
Cypress.Commands.add('checkProductPurePresentaiton',(argTitle,argDescription,argImgAlt,argBtn,argAdditionalText)=>{
    try{
        cy.get('.pure-presentation__title').contains(argTitle);
        cy.get('.pure-presentation__text').contains(argDescription);
        cy.get('.pure-presentation__image').children('img').should('have.attr','alt',argImgAlt);
        cy.get('#phmainproductcollection_0_ctl09_BuySectionPh').children('div.pure-presentation__btn').children('a').should('have.attr','data-action-detail',argBtn[0].toLowerCase().replace(' ','_')).contains(argBtn[0]);
        cy.get('#phmainproductcollection_0_ctl09_BuySectionPh').children('div.pure-presentation__btn').children('a').next().should('have.attr','data-action-detail',argBtn[1].toLowerCase().replace(' ','_')).contains(argBtn[1]);
        if(argAdditionalText)cy.get('.pure-additional-text').contains(argAdditionalText);
    }
    catch(ex){
        console.log("checkProductPurePresentaiton ::"+ex);
    }
});
Cypress.Commands.add('checkProductPureVideoSection',(argHeartIconAlt,argTitle,argDescription,argWatchText,argVideoAlt,argFooterText)=>{
    try{
        cy.get('.pure-arch__icon').should('have.attr','alt',argHeartIconAlt);
        cy.get('.pure-video.pure__container').children('h2').contains(argTitle);
        cy.get('.pure__description.js-pure-read-more.ddd-truncated').should('have.attr','title',argDescription);
        cy,get('.pure-video__pure-play ').children('span').contains(argWatchText);
        cy.get('.pure-video__image').children('picture').children('img').should('have.attr','alt',argVideoAlt);
        cy.get('.pure-video__textBot').contains(argFooterText);
    }
    catch(ex){
        console.log("checkProductPureVideoSection ::"+ex);
    }
});
Cypress.Commands.add('checkProductPureTestimonialSection',(argTitle,argTestimonialContent,argAdditionalText)=>{
    try{
        cy.get('#testimonials').contains(argTitle);
        let divClass=".pure-testimonial__slide.slick-slide.slick-current.slick-active";
        for(var compt=0;compt<argTestimonialContent.length;compt++){
            cy.get(divClass).should('have.attr','aria-describedby','slick-slide0'+compt+'').children('div.pure-testimonial__content').children('div.pure-testimonial__heading').contains(argTestimonialContent[compt][0]);
            cy.get(divClass).should('have.attr','aria-describedby','slick-slide0'+compt+'').children('div.pure-testimonial__content').children('div.pure__stars');
            cy.get(divClass).should('have.attr','aria-describedby','slick-slide0'+compt+'').children('div.pure-testimonial__content').children('p.pure-testimonial__review').contains(argTestimonialContent[compt][1]);
            cy.get(divClass).should('have.attr','aria-describedby','slick-slide0'+compt+'').children('div.pure-testimonial__content').children('span.pure-testimonial__meta').contains(argTestimonialContent[compt][2]);
            if(compt+1!=argTestimonialContent.length)cy.get(".slick-next.slick-arrow").contains("Next").click();
        }
        cy.get('.pure-additional-text').children('p').contains(argAdditionalText);
    }
    catch(ex){
        console.log("checkProductPureTestimonialSection ::"+ex);
    }
});
Cypress.Commands.add('checkProductPureCertificationSection',(argTitle,argCertificatAltImg,argCertificatDescpImg)=>{
    try{
        cy.get('.pure-endorsement.pure__container').children('span.pure-endorsement__title').contains(argTitle);
        cy.get(".pure-endorsement__slide.js-endorsement-slide.slick-slide.slick-current.slick-center").prev().should('have.attr','aria-describedby','slick-slide10').children('img').should('have.attr','alt',argCertificatAltImg[0]);
        cy.get('.sr-only.js-endorsement-text-hide').contains(argCertificatDescpImg[0]);
        for(var compt=1;compt<argCertificatAltImg.length;compt++){
            cy.get(".pure-endorsement__slide.js-endorsement-slide.slick-slide.slick-current.slick-center").next().should('have.attr','aria-describedby','slick-slide1'+compt+'').children('img').should('have.attr','alt',argCertificatAltImg[compt]);
            cy.get('.sr-only.js-endorsement-text-hide').contains(argCertificatDescpImg[compt]);
        }
    }
    catch(ex){
        console.log("checkProductPureCertificationSection ::"+ex);
    }
});
Cypress.Commands.add('checkProductPureBinSection',(argImgAl,argBinElt)=>{
    try{
        cy.get('#phmainproductcollection_0_ctl14_BuySectionPh').children('div.pure-presentation__image').children('img').contains(argImgAl);
        for(var compt=0;compt<argBinElt.length;compt++){
            cy.get('#phmainproductcollection_0_ctl14_BuySectionPh').children('div.pure-presentation__btn'),contains(argBinElt[compt]);
        }
    }
    catch(ex){
        console.log('checkProductPureBinSection ::'+ex);
    }
});
Cypress.Commands.add('checkProductPureFooterBanner',(argHref,argAltImg)=>{
    try{
        cy.get('#phmainproductcollection_1_IncentiveSpotlightBanner').should('have.attr','href',argHref);
        cy.get('#phmainproductcollection_1_IncentiveSpotlightBanner').children('div.overlay-oasis').children('picture.c-hero__picture').children('img.c-hero__image').should('have.attr','alt',argAltImg);
    }
    catch(ex){
        console.log("checkProductPureFooterBanner ::"+ex);
    }
});