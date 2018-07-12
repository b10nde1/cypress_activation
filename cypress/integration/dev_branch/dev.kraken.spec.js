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
    for(var comptDevice=0;comptDevice<confDevice.length;comptDevice++){
        let confWidth=confDevice[comptDevice][0];
        let confHeight=confDevice[comptDevice][1];
        beforeEach(() => {
            Cypress.on('uncaught:exception', (err, runnable)=> {
                return false
            })
            cy.viewport(confWidth, confHeight);
        });
        for(var compt=0;compt<listMarkets.length;compt++){
            let temp=compt;
            it('Kraken '+listMarkets[temp][0]+'',()=>{
                cy.visit(listMarkets[temp][1]);
                cy.checkVortexOpenAndTakeScreenShot(confWidth+'*'+confHeight+'-'+listMarkets[temp][0]);
            });
        }
    }
})