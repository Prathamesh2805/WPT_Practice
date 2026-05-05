const fs = require ('fs');

console.log("Pandejii")

fs.readdir("D:\\WPT_Prathamesh\\WPT_Practice", (error, arrayOfFiles)=>{
    if(error == null){
         arrayOfFiles.map((file)=>{console.log(file)})
    }else{
        console.log("Something went wrong")
    }
});


console.log("Pandejii")