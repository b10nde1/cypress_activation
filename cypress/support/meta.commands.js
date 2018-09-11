//Object Meta
const objMeta=(temp_title: string,temp_description: string,temp_h1: string,temp_canonical: string,temp_breadcrumbs: string)=>{
    let temp_obj={
        title:temp_title
        ,description:temp_description
        ,h1:temp_h1
        ,canonical:temp_canonical
        ,breadcrumbs:temp_breadcrumbs
    };
    return temp_obj;
};

//Page Title
Cypress.Commands.add('metaPageTitle',(arg_title: string)=>{
    try{
        console.log('metaPageTitle');
        cy.title().should('include',arg_title);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaPageTitle'],[ex]);
    }
});

//Meta description
Cypress.Commands.add('metaDescription',(arg_description: string)=>{
    try{
        console.log('metaDescription');
        cy.get('head meta[property="og:description"]').should('have.attr','content',arg_description);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaDescription'],[ex]);
    }
})

//init special char
const initSpecialChar=()=>{
    let result=[
        [':','&nbsp;:']
        ,[';','&nbsp;;']
    ];
    return result;
}

//&nbsp;: and &nbsp;; for special character on html
const changeSpecialCharInHtml=(arg_text: string)=>{
    try{
        let list_special_char=initSpecialChar();
        list_special_char.forEach(element=>{
            arg_text.replace(element[0],element[1]);
        });
        return arg_text;
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => changeSpecialCharInHtml'],[ex]);
    }
}

//H1 //*[@id="phmaincontentoasis_0_pharticleoasiscontent_0_ArticleSection"]/div[2]/h1
Cypress.Commands.add('metaH1',(arg_h1: string)=>{
    try{
        console.log('metaH1');
        cy.get('#phmaincontentoasis_0_pharticleoasiscontent_0_ArticleSection > div.article-oasis__hero > h1').contains(changeSpecialCharInHtml(arg_h1));
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaH1'],[ex]);
    }
});

//canonical
Cypress.Commands.add('metaCanonical',(arg_canonical: string)=>{
    try{
        console.log('metaCanonical');
        cy.get('head link[rel="canonical"]').should('have.attr','href',arg_canonical);
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaCanonical'],[ex]);
    }
});

// Breadcrumbs
Cypress.Commands.add('metaBreadcrumbs',(arg_breadcrumbs: string)=>{
    try{
        console.log('metaBreadcrumbs');
        let breadcrumbs=arg_breadcrumbs.split('>');
        breadcrumbs.forEach(element=>{
            cy.get('.c-breadcrumb__list').contains(changeSpecialCharInHtml(element));
        });
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaBreadcrumbs'],[ex]);
    }
});

//align data from json
const getDataFromJson=(arg_list_after_split: string)=>{
    try{
        console.log('getDataFromJson');
        let element_after_split=arg_list_after_split.split('],[');
        let result=new Array(element_after_split.length);
        for(var compt=0;compt<result.length;compt++){
            result[compt]=new Array(5);
            for(var comptInsert=0;comptInsert<5;comptInsert++){
                result[compt][comptInsert]=element_after_split[compt].split(';')[comptInsert];
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
const verifyMeta=(arg_obj: objMeta)=>{
    try{
        console.log('verifyMeta');
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
Cypress.Commands.add('metaVerification',(arg_list: string)=>{
    try{
        console.log('metaVerification');
        let get_data=getDataFromJson(arg_list);
        for(var compt_element=0;compt_element<get_data.length;compt_element++){
            let temp_title='';let temp_description='';let temp_h1='';let temp_canonical='';let temp_breadcrumbs='';
            for(var compt=0;compt<5;compt++){
                let element_after_split=get_data[compt_element][compt].split(':=');
                let temp_indicator=element_after_split[0];
                //verify if value is !=''
                if(element_after_split[1]=='')throw('ERROR! NO VALUE FOR '+temp_indicator+' ID '+get_data.indexOf(get_data[compt_element])+' ');
                //init value for obj
                if(temp_indicator=='title')temp_title=element_after_split[1]
                if(temp_indicator=='description')temp_description=element_after_split[1]
                if(temp_indicator=='h1')temp_h1=element_after_split[1]
                if(temp_indicator=='canonical')temp_canonical=element_after_split[1]
                if(temp_indicator=='breadcrumbs')temp_breadcrumbs=element_after_split[1]
            }
            let temp_obj=objMeta(temp_title,temp_description,temp_h1,temp_canonical,temp_breadcrumbs);
            verifyMeta(temp_obj);
        }
    }
    catch(ex){
        cy.checkUtilConsole(['meta.commands => metaVerification'],[ex]);
    }
});