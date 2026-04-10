const exceljs = require ('exceljs');


async function excelTest(params) {
    
const workbook = new exceljs.Workbook();
await workbook.xlsx.readFile("D:\\PW_JS\\playwrightwithjs\\ExceldownloadTest.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => 
    {
    row.eachCell((cell, colNumber) =>
         {


        if (cell.value === "Winter") {
            console.log("Winter is found in row " + rowNumber + " and column " + colNumber);
        }
        //console.log(cell.value);

        })
    })
}

excelTest();