import { test, expect } from '@playwright/test';
const exceljs = require('exceljs');


    //  Function to write or update excel sheet
async function writeExcel(searchText, replacementText, filePath) {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);


    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column);
    cell.value = replacementText;

    await workbook.xlsx.writeFile(filePath);
}
    // Function to read the excel sheet
async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });

    return output;
}



    test('Excel file should be updated with the replacement text', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    // ✅ Correct way
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download' }).click()
    ]);

    const filePath = 'C:\\Users\\akumar2\\Downloads\\download.xlsx';

    await download.saveAs(filePath);

    await writeExcel("Apple", "Krishna", filePath);

    await page.locator('#fileinput').setInputFiles(filePath);

    await page.pause();

});
