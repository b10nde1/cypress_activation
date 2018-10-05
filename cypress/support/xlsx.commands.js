//import XLSX from 'xlsx'

const loadXlsx=(arg_path: string)=>{
    try{
        let XLSX=require('xlsx');
        let test = XLSX.readFileSync(arg_path,'');
        console.warn('OK xlsx Loaded');
    }
    catch(ex){
        cy.checkUtilConsole(['xlsx.commands -> loadXlsx'],[ex]);
    }
}

Cypress.Commands.add('xlsxRun',(arg_path: string)=>{
    let xlsx_file=loadXlsx(arg_path);
});

