let fs = require("fs");
let path = require("path");
let typesObj=require("../utility");
function organizeFn(dirPath) {
    //1. input -> directory path given
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd();
        organizeFn(destPath);
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            //2. create -> organized_files -> directory
            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) === false)
                fs.mkdirSync(destPath);
        }
        else {
            console.log("Kindly enter the path!");
            return;
        }
    }
    organizeHelper(dirPath, destPath);

}

function organizeHelper(src, dest) {
    //3. identify categories of all the files present in the input directory 
    let childrenNames = fs.readdirSync(src);
    // console.log(childrenNames);
    childrenNames.forEach(i => {
        let childAddress = path.join(src, i);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(i);
            let category = getCategory(i);
            // console.log(i," belongs to -->", category);
            //4. copy files to the organized directory inside of any of vcategory folder
            categorizeFiles(childAddress, dest, category);
        }
    });

}
function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.substring(1);
    for (let type in typesObj) {
        let curTypeArray = typesObj[type];
        for (let i = 0; i < curTypeArray.length; i++) {
            if (ext == curTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

function categorizeFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    //   console.log(categoryPath);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    // fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to -->", category);
}

module.exports={
    organizeKey:organizeFn

}