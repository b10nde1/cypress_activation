const initListEncodedChar=(argListCode)=>{
    try{
        let list_encodage=new Array((argListCode.length)/2);let compt_arglistCode=0;
        for(var compt=1;compt<(argListCode.length)/2;compt++){
            list_encodage[compt]=[argListCode[compt_arglistCode],argListCode[compt_arglistCode+1]];
            compt_arglistCode+=2;
        }
        cy.checkUtilConsole(['info -> initListEncodedChar','list_encodage'],['',list_encodage]);
        return list_encodage;
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> initListEncodedChar'],[ex]);
    }
}

const encodeUrl=(argUrl)=>{
    try{
        //ref https://www.w3schools.com/tags/ref_urlencode.asp
        let encoded_url=argUrl;let list_encodage=initListEncodedChar([':','%3A','/','%2F']);
        list_encodage.forEach(element=>{
            encoded_url.replace(element[0],list_encodage[1]);
        });
        cy.checkUtilConsole(['info -> encodeUrl','encoded_url'],['',encoded_url]);
        return encoded_url;
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> encodeUrl'],[ex]);
    }
}

const getPageSpeedScore=(argApiCall)=>{
    try{
        let request=new XMLHttpRequest(); let urlApiCall=argApiCall;
        request.open('GET',urlApiCall,false);
        return request;
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> getPageSpeedScore'],[ex]);
    }
}

const pageSpeedReport=(argPageSpeedResult)=>{
    try{
        let report_id=new Date();
        cy.reportForGoogPageSpeed(argPageSpeedResult,report_id.getTime());
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> pageSpeedReport'],[ex]);
    }
}

Cypress.Commands.add('pageSpeed',(arglistUrls)=>{
    try{
        /***Encode List of Urls***/
        let final_list_urls=new Array(arglistUrls.length);let compt_final_list_urls=0;
        arglistUrls.forEach(element => {
            final_list_urls[compt_final_list_urls]=encodeUrl(element[1]);
            compt_final_list_urls++;
        });
        /***init table for result ***/
        let result=new Array(arglistUrls.length);let indice_init_result=0;
        arglistUrls.forEach(element=>{
            result[indice_init_result]=new Array(4);
            indice_init_result++;
        });
        /***Init Google page speed API***/
        let google_api_key='AIzaSyANQ1jfs-ZQawUzAh8XZqMQCLSUAypMTz0'; let temp_url_to_test='';let temp_url_strategy=['desktop','mobile'];
        let api_url='https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=';
        final_list_urls.forEach(final_url_element=>{
            temp_url_to_test=final_url_element;
            let temp_indice_result=final_list_urls.indexOf(final_url_element);
            result[temp_indice_result][0]=arglistUrls[temp_indice_result][1];
            result[temp_indice_result][4]=arglistUrls[temp_indice_result][0];
            temp_url_strategy.forEach(strategy_element=>{
                let api_call=
                    api_url
                    +temp_url_to_test
                    +'&strategy='
                    +strategy_element
                    +'&key='+google_api_key+'';
                cy.checkUtilConsole(['info pageSpeed','api_call'],['',api_call]);
                let temp_json_result=getPageSpeedScore(api_call);
                cy.checkUtilConsole(['info pageSpeed','temp_json_result'],['',temp_json_result]);
                //result[temp_indice_result][(temp_url_strategy.indexOf(strategy_element))+1]=temp_json_result.ruleGroups.SPEED.score;
            })
        });
        //pageSpeedReport(result);
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> pageSpeed'],[ex]);
    }
})