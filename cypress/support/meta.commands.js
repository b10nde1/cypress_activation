//Page Title
Cypress.Commands.add('metaPageTitle',(arg_title)=>{
    try{
        cy.title().should('include',arg_title);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaPageTitle'],[ex]);
    }
});

//Meta description
Cypress.Commands.add('metaDescription',(arg_description)=>{
    try{
        cy.get('head meta[property="og:description"]').should('have.attr','content',arg_description);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaDescription'],[ex]);
    }
})

//H1 //*[@id="phmaincontentoasis_0_pharticleoasiscontent_0_ArticleSection"]/div[2]/h1
Cypress.Commands.add('metaH1',(arg_h1)=>{
    try{
        cy.get('.//*[@id="phmaincontentoasis_0_pharticleoasiscontent_0_ArticleSection"]/div[2]/h1').contains(arg_h1);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaH1'],[ex]);
    }
});

//canonical
Cypress.Commands.add('metaCanonical',(arg_canonical)=>{
    try{
        cy.get('head link[rel="canonical"]').should('have.attr','href',arg_canonical);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaCanonical'],[ex]);
    }
});

// Breadcrumbs
Cypress.Commands.add('metaBreadcrumbs',(arg_breadcrumbs)=>{
    try{
        let breadcrumbs=arg_breadcrumbs.split('>');
        breadcrumbs.forEach(element=>{
            cy.get('.c-breadcrumb__list').contains(element);
        });
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaBreadcrumbs'],[ex]);
    }
});

//align data from json
const getDataFromJson=(arg_list_after_split)=>{
    try{
        let result=new Array(arg_list_after_split.length);
        for(var compt=0;compt<result.length;compt++){
            result[compt]=new Array(5);
            for(var comptInsert=0;comptInsert<5;comptInsert++){
                //title:test_title
                result[compt][comptInsert]=arg_list_after_split.split(';')[comptInsert];
                result[compt][comptInsert]=result[compt][comptInsert].replace("[","");
                result[compt][comptInsert]=result[compt][comptInsert].replace("]","");
            }
        }
        return result;
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => getDataFromJson'],[ex]);
    }
}

//verify obj
const verifyMeta=(arg_obj)=>{
    try{
        cy.metaPageTitle(arg_obj.title);
        cy.metaDescription(arg_obj.description);
        cy.metaH1(arg_obj.h1);
        cy.metaCanonical(arg_obj.canonical);
        cy.metaBreadcrumbs(arg_obj.breadcrumbs);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => verifyMeta'],[ex]);
    }
};

//run meta verification
Cypress.Commands.add('metaVerification',(arg_list)=>{
    try{
        let get_data=getDataFromJson(arg_list);
        get_data.forEach(element=>{
            let temp_title='';let temp_description='';let temp_h1='';let temp_canonical='';let temp_breadcrumbs='';
            for(var compt=0;compt<5;compt++){
                let element_after_split=element[compt].split(':=');
                let temp_indicator=element_after_split[0];
                //verify if value is !=''
                if(element_after_split[1]=='')throw('ERROR! NO VALUE FOR '+temp_indicator+' ID '+get_data.indexOf(element)+' ');
                //init value for obj
                if(temp_indicator=='title')temp_title=element_after_split[1]
                if(temp_indicator=='description')temp_description=element_after_split[1]
                if(temp_indicator=='h1')temp_h1=element_after_split[1]
                if(temp_indicator=='canonical')temp_canonical=element_after_split[1]
                if(temp_indicator=='breadcrumbs')temp_breadcrumbs=element_after_split[1]
            }
            let temp_obj={
                title:temp_title
                ,description:temp_description
                ,h1:temp_h1
                ,canonical:temp_canonical
                ,breadcrumbs:temp_breadcrumbs
            };
            verifyMeta(temp_obj);
        });
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaVerification'],[ex]);
    }
});