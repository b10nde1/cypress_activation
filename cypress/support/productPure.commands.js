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
        let divClass=".pure-endorsement__slide.js-endorsement-slide.slick-slide.slick-current.slick-center";
        cy.get(".pure-endorsement__slide.js-endorsement-slide.slick-slide").children('img').should('have.attr','alt',argCertificatAltImg[0]).click();
        for(var compt=0;compt<argCertificatAltImg.length;compt++){
            cy.get(divClass).should('have.attr','aria-describedby','slick-slide1'+compt+'').children('img').should('have.attr','alt',argCertificatAltImg[compt]);
            cy.get('.pure-endorsement.pure__container').children('span.pure-endorsement__text.js-endorsement-text-display').contains(argCertificatDescpImg[compt]);
            if(compt+1!=argCertificatAltImg.length)cy.get(".pure-endorsement__slide.js-endorsement-slide.slick-slide").should('have.attr','aria-describedby','slick-slide1'+(compt+1)+'').children('img').should('have.attr','alt',argCertificatAltImg[compt+1]).click();
        }
    }
    catch(ex){
        console.log("checkProductPureCertificationSection ::"+ex);
    }
});