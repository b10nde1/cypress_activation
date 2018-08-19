const initListEncodedChar=(argListCode)=>{
    try{
        let list_encodage=new Array((argListCode.length)/2);let compt_arglistCode=0;
        for(var compt=1;compt<(argListCode.length)/2;compt++){
            list_encodage[compt]=[argListCode[compt_arglistCode],argListCode[compt_arglistCode+1]];
            compt_arglistCode+=2;
        }
        cy.checkUtilConsole(['info -> initListEncodedChar'],[list_encodage]);
        return list_encodage;
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> initListEncodedChar'],[ex]);
    }
}

const encodeUrl=(argUrl)=>{
    try{
        let encoded_url=argUrl;let list_encodage=initListEncodedChar([':','%3A','/','%2F']);
        for(var compt=0;compt<list_encodage.length;compt++){
            encoded_url.replace(list_encodage[compt][0],list_encodage[compt][1]);
        }
        return encoded_url;
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> encodeUrl'],[ex]);
    }
}

Cypress.Commands.add('pageSpeed',(arglistUrls)=>{
    try{
        
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> pageSpeed'],[ex]);
    }
})