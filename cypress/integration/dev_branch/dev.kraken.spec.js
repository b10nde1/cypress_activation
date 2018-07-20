import dataFromJson from '../../fixtures/data/kraken.json';
describe('Screenshot', () => {
    const alignTableFromJson=(argSplit)=>{
        let result=new Array(argSplit.length);
        for(var compt=0;compt<argSplit.length;compt++){
            result[compt]=argSplit[compt];
        }
        return result;
    };
    const getTable2DFromJson=(argTableTestimonialContent,argSplit)=>{
        let result=new Array(argTableTestimonialContent.length);
        for(var compt=0;compt<argTableTestimonialContent.length;compt++){
            result[compt]=alignTableFromJson(argTableTestimonialContent[compt].split(argSplit));
            result[compt][0]=result[compt][0].replace("[","");
            result[compt][1]=result[compt][1].replace("]","");
        }
        return result;
    };
    let confDevice=getTable2DFromJson(dataFromJson.device.split('],['),',');
    let listMarkets=getTable2DFromJson(dataFromJson.urls.split('],['),'/*/');
    let confGetStatusCodeReport=dataFromJson.getStatusCodeReport;
    let reportDate=new Date(); let reportId=reportDate.getTime();
    let confOnlyStatus200=dataFromJson.onlyStatus200;
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=> {
            return false
        })
        //hide css of _evidon_banner
        cy.checkUtilConsole(['Kraken','Check only status 200','Get Status code report'],['',confOnlyStatus200,confGetStatusCodeReport]);
    });
    for(var comptDevice=0;comptDevice<confDevice.length;comptDevice++){
        let confWidth=Number(confDevice[comptDevice][0]);
        let confHeight=Number(confDevice[comptDevice][1]);
        for(var compt=0;compt<listMarkets.length;compt++){
            let temp=compt;
            it('Kraken | '+confWidth+'x'+confHeight+' '+listMarkets[temp][0]+'',()=>{
                console.log('=======>'+confWidth+' X '+confHeight);
                cy.viewport(confWidth,confHeight);
                cy.checkUtilTakeScreenShotIfNotErrorPage(listMarkets[temp][1],confWidth+'x'+confHeight+'-'+listMarkets[temp][0],confOnlyStatus200);
            });
        }
    }
    if('Kraken | Get ScreenShot report '+reportId+' ',()=>{
        cy.checkGlobalScreenShotReport('kraken-screenShotReport',listMarkets,reportId);
    });
    if(confGetStatusCodeReport){
        it('Kraken | Get Status Code report '+reportId+'',()=>{
            cy.checkUtilGetStatusCodeReport('kraken-statusCodeReport',listMarkets,reportId);
        })
    }
})