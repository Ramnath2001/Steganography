const express = require('express');
const { uploadImages, uploadMultipleImages, uploadImages2, keyFiles } = require('../controllers/fileController');
const { resample, encode, downloadFile, decode, dowloadDecode, clearData } = require('../controllers/pyController');
const { registerUser, authUser } = require('../controllers/userControllers');

const router = express.Router();

router.route('/').post(registerUser);
router.route("/login").post(authUser);
router.route("/resample").post(resample);
router.route("/uploadImageFiles").post(uploadImages);
router.route("/uploadMultipleImageFiles").post(uploadMultipleImages);
router.route("/encodeImages/:id").post(encode);
router.route("/downloadImages/:id").get(downloadFile);
router.route("/uploadDImageFiles").post(uploadImages2);
router.route("/uploadDKeyFiles").post(keyFiles);
router.route("/decodeImages/:id").post(decode);
router.route("/downloadDecodedImages/:id").get(dowloadDecode);
router.route("/deleteFiles/:id").post(clearData);

module.exports = router;