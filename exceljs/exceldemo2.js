const exceljs = require('exceljs');


async function writeExcel(searchText, replacementText, filePath) {

    
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column);
    cell.value = replacementText;
    await workbook.xlsx.writeFile(filePath);
}


async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
                console.log(searchText + " is found in row " + rowNumber + " and column " + colNumber);
            }
        });
    });
    return output;
}

writeExcel("Rama","Krishna","C:\\Users\\hp\\Downloads\\ExceldownloadTest.xlsx");
//readExcel();