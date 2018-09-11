const initListEncodedChar=(argListCode)=>{
    try{
        let list_encodage=new Array((argListCode.length)/2);let compt_arglistCode=0;
        for(var compt=1;compt<(argListCode.length)/2;compt++){
            list_encodage[compt]=[argListCode[compt_arglistCode],argListCode[compt_arglistCode+1]];
            compt_arglistCode+=2;
        }
        return list_encodage;
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> initListEncodedChar'],[ex]);
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
            final_list_urls[compt_final_list_urls]=element[1];
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
            [result[temp_indice_result][0],result[temp_indice_result][3]]=[arglistUrls[temp_indice_result][1]
                ,arglistUrls[temp_indice_result][0]];
            temp_url_strategy.forEach(strategy_element=>{
                let api_call=
                    api_url
                    +temp_url_to_test
                    +'&strategy='
                    +strategy_element
                    +'&key='+google_api_key+'';
                let request=new XMLHttpRequest();
                request.open('GET',api_call,false);
                request.onload=()=>{
                    let response = request.response;
                    result[temp_indice_result][(temp_url_strategy.indexOf(strategy_element))+1]=(JSON.parse(response))
                        .ruleGroups
                        .SPEED
                        .score;
                    cy.checkUtilProgress('PageSpeed',final_list_urls.length,(final_list_urls.indexOf(final_url_element)+1));
                };
                request.send();
            })
        });
        pageSpeedReport(result);
        console.log('conf_run_page_speed :: End');
    }
    catch(ex){
        cy.checkUtilConsole(['pagespeed -> pageSpeed'],[ex]);
    }
})