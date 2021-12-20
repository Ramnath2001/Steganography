const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        
        cb(null, req.body.id+'-'+file.fieldname+'-'+file.originalname)
    }
});

const uploadImages = asyncHandler(async (req, res) => {

    

    const  upload = multer({storage}).single('coverImage');
    upload(req, res, (err) => {
        if(err){
            return res.status(500).json(err)
        }

        filenames = fs.readdirSync('D:/web_dev/stegApp/public');
        filenames.forEach(file => {
            text_split = file.split("-");

            if(text_split[0] == req.body.id && text_split[1] == 'coverImage' && req.file.filename != file){
                const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
                fs.unlinkSync(fpath);
            }
        });

        return res.status(200).send(req.file);
    })
});

const uploadMultipleImages = asyncHandler(async (req, res) => {

    const  upload = multer({storage}).array('secretImage');
    upload(req, res, (err) => {
        if(err){
            return res.status(500).json(err)
        }
        let arr = [];
        req.files.forEach(file => {
            arr.push(file.filename);
        });

        filenames = fs.readdirSync('D:/web_dev/stegApp/public');
        filenames.forEach(file => {
            text_split = file.split("-");

            if(text_split[0] == req.body.id && text_split[1] == 'secretImage' && (!arr.includes(file))){
                const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
                fs.unlinkSync(fpath);
            }
        });
        
        return res.status(200).send(req.files);
    })
});

const uploadImages2 = asyncHandler(async (req, res) => {

    const  upload = multer({storage}).single('decodeImage');
    upload(req, res, (err) => {
        if(err){
            return res.status(500).json(err)
        }

        filenames = fs.readdirSync('D:/web_dev/stegApp/public');
        filenames.forEach(file => {
            text_split = file.split("-");

            if(text_split[0] == req.body.id && text_split[1] == 'decodeImage' && req.file.filename != file){
                const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
                fs.unlinkSync(fpath);
            }
        });

        return res.status(200).send(req.file);
    })
});

const keyFiles = asyncHandler(async (req, res) => {

    const  upload = multer({storage}).single('keyFile');
    upload(req, res, (err) => {
        if(err){
            return res.status(500).json(err)
        }

        filenames = fs.readdirSync('D:/web_dev/stegApp/public');
        filenames.forEach(file => {
            text_split = file.split("-");

            if(text_split[0] == req.body.id && text_split[1] == 'keyFile' && req.file.filename != file){
                const fpath = 'D:/web_dev/stegApp/public'+'/'+file;
                fs.unlinkSync(fpath);
            }
        });

        return res.status(200).send(req.file);
    })
});

module.exports = {uploadImages, uploadMultipleImages, uploadImages2, keyFiles}