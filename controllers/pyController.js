const {spawn} = require("child_process");
const asyncHandler = require('express-async-handler');
const zip = require('express-zip');
const AdmZip = require('adm-zip');
const fs = require('fs');

const resample = asyncHandler(async (req, res)=>{
      
    const process = spawn('python', ['./python_scripts/index.py','D:/web_dev/stegApp/python_scripts/bird.jpg', 'D:/web_dev/stegApp/python_scripts/building.jpg']);

    process.stdout.on('data', function(data) {
        console.log(`stdout ${data}`);
        res.send(data.toString());
    });
    
    process.stderr.on('data', (data)=>{
        console.log(`stdout ${data}`);
        res.send(data.toString());
        
    });
    
    process.on('close', (code)=>{
        console.log(`child process exited with code ${code}`);
    });
})


const encode = asyncHandler(async (req, res)=>{
    let coverImageName = '';
    let secretImageNames = [];
    filenames = fs.readdirSync('D:/web_dev/stegApp/public');
    filenames.forEach(file => {
        text_split = file.split("-");
        if(text_split[0] == req.params.id && text_split[1] == 'secretImage'){
            const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
            secretImageNames.push(fpath);
        }
    });

    filenames.forEach(file => {
        text_split = file.split("-");
        if(text_split[0] == req.params.id && text_split[1] == 'coverImage'){
            const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
            coverImageName = fpath;
        }
    });

    let path = 'D:/web_dev/stegApp/public/';
    let keyFileName = req.params.id+'-key_file.txt';
    let keyFilePath = path+keyFileName;
    let newCoverImageName = req.params.id+'-newCoverImage.png';
    let newCoverImagePath = path+newCoverImageName;

    const process = spawn('python', ['./python_scripts/encodeScript.py', coverImageName, secretImageNames, keyFilePath, newCoverImagePath]);

    process.stdout.on('data', function(data) {
        console.log(`stdout ${data}`);
        res.status(200).send(data.toString());
        
    });
    
    process.stderr.on('data', (data)=>{
        console.log(`stdout ${data}`);
        res.status(500).send(data.toString());
        
    });
    
    process.on('close', (code)=>{
        console.log(`child process exited with code ${code}`);
    });

})

const downloadFile = asyncHandler(async (req, res) => {
    let path = 'D:/web_dev/stegApp/public/';
    let keyFileName =req.params.id+'-key_file.txt';
    let keyFilePath = path+keyFileName;
    let newCoverImageName = req.params.id+'-newCoverImage.png';
    let newCoverImagePath = path+newCoverImageName;
    const zip = new AdmZip();
    zip.addLocalFile(newCoverImagePath);
    zip.addLocalFile(keyFilePath);
    const downloadName = 'downloadfile.zip';
    const data = zip.toBuffer();
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', data.length);
    res.send(data);
})


const decode = asyncHandler(async (req, res)=>{
    let coverImageName = '';
    let keyFileName = '';
    filenames = fs.readdirSync('D:/web_dev/stegApp/public');
    filenames.forEach(file => {
        text_split = file.split("-");
        if(text_split[0] == req.params.id && text_split[1] == 'keyFile'){
            const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
            keyFileName = fpath;
        }
    });

    filenames.forEach(file => {
        text_split = file.split("-");
        if(text_split[0] == req.params.id && text_split[1] == 'decodeImage'){
            const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
            coverImageName = fpath;
        }
    });

    userId = req.params.id+'-decode'
    const process = spawn('python', ['./python_scripts/decodeScript.py', coverImageName, keyFileName, userId]);

    process.stdout.on('data', function(data) {
        console.log(`stdout ${data}`);
        res.status(200).send(data.toString());
        
    });
    
    process.stderr.on('data', (data)=>{
        console.log(`stdout ${data}`);
        res.status(500).send(data.toString());
        
    });
    
    process.on('close', (code)=>{
        console.log(`child process exited with code ${code}`);
    });

})

const dowloadDecode = asyncHandler(async (req, res) => {
    let path = 'D:/web_dev/stegApp/public/';
    const zip = new AdmZip();
    filenames = fs.readdirSync(path);
    filenames.forEach(file => {
        text_split = file.split("-");
        if(text_split[0] == req.params.id && text_split[1] == 'decode'){
            const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
            zip.addLocalFile(fpath);
        }
    });
    
    const downloadName = 'downloadfile.zip';
    const data = zip.toBuffer();
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', data.length);
    res.send(data);
})


const clearData = asyncHandler(async (req, res) => {
    let path = 'D:/web_dev/stegApp/public/';
    filenames = fs.readdirSync(path);
    filenames.forEach(file => {
        text_split = file.split("-");
        if(text_split[0] == req.params.id){
            const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
            fs.unlinkSync(fpath);
        }
    });
    return res.status(200).send(req.params.id);
})




module.exports = {resample, encode, downloadFile, decode, dowloadDecode, clearData};