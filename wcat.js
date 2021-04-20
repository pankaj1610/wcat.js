//Importing modules 
let fs = require('fs');

//Take input
let input = process.argv.slice(2);

//Creating options and filepaths array
let options = [];
let filePaths = [];

//To extract options and filepaths from input
for(let i = 0; i < input.length; i++){
    if(input[i] == "-s" || input[i] == "-b" || input[i] == "-n"){
        options.push(input[i]);
    }else{
        filePaths.push(input[i]);
    }
}

//To check the existence of file given in input
for(let i = 0; i < filePaths.length; i++){
    let isFilePresent = fs.existsSync(filePaths[i]);
    if(isFilePresent == false){
        console.log("Filepath", filePaths[i], "does not exist.");
        return;
    }
}

//To read content from different files given in input
let totalContent = "";
for(let i = 0; i < filePaths.length; i++){
    let contentOfCurrent = fs.readFileSync(filePaths[i].toString());
    //After every file's content -> next file's content should come in next line
    totalContent += contentOfCurrent + "\r\n";
}

//Implement -s command -> remove empty line break
let isSOptions = options.includes("-s");
if(isSOptions){
    //Spliting content on basis of line break
    let outArr = totalContent.split("\r\n");
    //Identify and remove empty line
    let tempArr = [];
    for(let i = 0; i < outArr.length; i++){
        let isElementValid = outArr[i] != "";
        if(isElementValid){
            tempArr.push(outArr[i]);
        }
    }

    totalContent = tempArr.join("\r\n");
}

let isB = options.includes("-b");
let isN = options.includes("-n");

//Getting finaloption if both "-n" and "-b" is present
let finalOption;
if(isN == true){
    if(isB == true){
        let idxB = options.indexOf("-b");
        let idxN = options.indexOf("-n");
        finalOption = idxN < idxB ? "-n" : "-b";
    }else{
        finalOption = "-n";
    }
}else if(isB == true){
    finalOption = "-b";
}

//Implement -n command -> put a number to every line 
if(finalOption == "-n"){
    let count = 1;
    //Split content on basis of line break
    let contentArr = totalContent.split("\r\n");
    //Adding number to every line  
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = count + ". " + contentArr[i];
        count++;
    }
    totalContent = contentArr.join("\r\n");
}

//Implement -b command -> put number to non empty line
if(finalOption == "-b"){
    let count = 1;
    //split content on basis of line break
    let contentArr = totalContent.split("\r\n");
    //Adding number to non empty line
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = count + ". " + contentArr[i];
            count++;
        }
    }
    totalContent = contentArr.join("\r\n");
}

//Displaying content of file
console.log(totalContent);

