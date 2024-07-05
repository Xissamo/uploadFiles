const express = require('express');
const multer = require('multer');
const { uploadFile, getFiles, downloadFile } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: 'public/uploads/' });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);
router.get('/download/:id', downloadFile);

module.exports = router;
