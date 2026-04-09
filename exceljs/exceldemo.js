const exceljs = require ('exceljs');


async function excelTest(params) {
    
    let output = {row:-1, column:-1};
const workbook = new exceljs.Workbook();
await workbook.xlsx.readFile("C:\\Users\\hp\\Downloads\\ExceldownloadTest.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => 
    {
    row.eachCell((cell, colNumber) =>
         {
        if (cell.value === "Apple") {
            output.row = rowNumber;
            output.column = colNumber;
            console.log("Apple is found in row " + rowNumber + " and column " + colNumber);
        }
        //console.log(cell.value);

        })
    })


    const cell =  worksheet.getCell(output.row, output.column);
    cell.value = "Ashish";
    await workbook.xlsx.writeFile("C:\\Users\\hp\\Downloads\\ExceldownloadTest.xlsx");
}

excelTest();