//***************************************************************************************//
//**Load Data**//
import dataFromJson from '../../fixtures/tempData.json';
describe('Product Pure', () => {
//***************************************************************************************//
//**util**//
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        for(var compt=0;compt<argSplit.length;compt++){
            result[compt]=argSplit[compt];
        }
        return result;
    };
    const alignTestimonialFromJson=(argTableTestimonialContent)=>{
        let result=new Array(argTableTestimonialContent.length);
        for(var compt=0;compt<argTableTestimonialContent.length;compt++){
            result[compt]=alignTableFromJson(argTableTestimonialContent[compt].split('/*/'));
            result[compt][0]=result[compt][0].replace("[","");
            result[compt][2]=result[compt][2].replace("]","");
            result[compt][0]="\""+result[compt][0]+"\"*";
        }
        return result;
    };
//***************************************************************************************//
//**Config**//
    let confBaseUrl=dataFromJson.confBaseUrl;
    let confTranslationForProduct=dataFromJson.confTranslationForProduct;
    let confHubThumbnail=dataFromJson.confHubThumbnail;
    let confHubProdcutOasisText=dataFromJson.confHubProdcutOasisText;
    let confSocialSectionTitle=dataFromJson.confSocialSectionTitle;
    let confSocialMediaIcon=alignTableFromJson(dataFromJson.confSocialMediaIcon.split('/*/'));
    let confMeta=[alignTableFromJson(dataFromJson.confMetaLP.split('/*/'))
        ,[]
        ,[]
    ];
    let confBreadcrumb=[alignTableFromJson(dataFromJson.confBreadcrumdLP.split('/*/'))
        ,[]
        ,[]
    ];
    let confTitle=dataFromJson.confTitle;
    let confImgAlt=alignTableFromJson(dataFromJson.confImgAlt.split('/*/'));
    let confShortText=dataFromJson.confShortText;
    let confPresentationTitle=dataFromJson.confPresentationTitle;
    let confPresentationDescription=dataFromJson.confPresentationDescription;
    let confPresentationImgAlt=dataFromJson.confPresentationImgAlt;
    let confPresentationBtn=alignTableFromJson(dataFromJson.confPresentationBtn.split('/*/'));
    let confPresentationAdditionalText=dataFromJson.confPresentationAdditionalText;
    let confHearIconAlt=dataFromJson.confHearIconAlt;
    let confVideoSectionTitle=dataFromJson.confVideoSectionTitle;
    let confVideoSectionDescription=dataFromJson.confVideoSectionDescription;
    let confVideoSectionFooterText=dataFromJson.confVideoSectionFooterText;
    let confVideoSectionWatchText=dataFromJson.confVideoSectionWatchText;
    let confVideoSectionVideoAlt=dataFromJson.confVideoSectionVideoAlt;
    let confTestimonialSectionTitle=dataFromJson.confTestimonialSectionTitle;
    let confTestimonialSectionAdditionalText=dataFromJson.confTestimonialSectionAdditionalText;
    let confTestimonialSectionContent=alignTestimonialFromJson(dataFromJson.confTestimonialSectionContent.split('],['));
    let confCertificationSectionTitle=dataFromJson.confCertificationSectionTitle;
    let confCertificationSectionContentImgAlt=dataFromJson.confCertificationSectionContentImgAlt.split('/*/');
    let confCertificationSectionContentImgDescription=dataFromJson.confCertificationSectionContentImgDescription.split('/*/');
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
    /*it('Product Pure TC01 || Verify Hub',()=>{
        cy.visit(confBaseUrl);
        cy.get('.js-menu-list').contains(confTranslationForProduct).click();
        //verify if Product Pure is present in each hub
        cy.checkProductPureDataHub(confHubThumbnail,confHubProdcutOasisText);
    });*/
    it('Product Pure TC02 || Verify Product Pure LP',()=>{
        //remove this cy.visit when activate tc01
        cy.visit('https://www.pampers.com/en-us/diapers-wipes/newborn-products');
        cy.get('.l-main__container').children().contains(confHubProdcutOasisText).click({force:true});
        //verify meta
        cy.checkGuideMetaInfo(confMeta[0][0],confMeta[0][1],confMeta[0][2],confMeta[0][3]);
        //verify breadcrumb and banner
        cy.checkGuideBreadcrumb(confBreadcrumb[0]);
        cy.checkProductPureBanner(confTitle,confImgAlt,confShortText);
        //verify presentation
        cy.checkProductPurePresentaiton(confPresentationTitle,confPresentationDescription,confPresentationImgAlt,confPresentationBtn,confPresentationAdditionalText);
        //verify video section
        cy.checkProductPureVideoSection(confHearIconAlt,confVideoSectionTitle,confVideoSectionDescription,confVideoSectionWatchText,confVideoSectionVideoAlt,confVideoSectionFooterText);
        //verify testimonial section
        cy.checkProductPureTestimonialSection(confTestimonialSectionTitle,confTestimonialSectionContent,confTestimonialSectionAdditionalText);
        //verify certification section
        cy.checkProductPureCertificationSection(confCertificationSectionTitle,confCertificationSectionContentImgAlt,confCertificationSectionContentImgDescription);
        //verify Buy section

        //verify parallax section

        //verify footer banner

        //verify share section
        cy.checkGuideSocialSection(confSocialSectionTitle,confSocialMediaIcon);
    });
    /*it('Product Pure TC03 || Verify Wipes',()=>{

    });
    it('Product Pure TC04 || Verify Diapers',()=>{

    });*/
});