
let i, j; 

for(i=1; i<=5;i++){
    let row= "";
    console.log("i:",i);
    for(j=1; j<=5;j++){

        console.log("\nj:",j);
        row += "*";
    }
    //console.log("\n");
    console.log(row);
}  
/* 
let i, j;

for (i = 1; i <= 5; i++) {
    let row = "";          // store one row
    for (j = 1; j <= 5; j++) {
        row += "*";        // add star in same line
    }
    console.log(row);      // print full row
}  */