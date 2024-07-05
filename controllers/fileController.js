const { File } = require('../models/fileModel');
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
    const { file } = req;
    try {
        const newFile = await File.create({
            filename: file.originalname,
            filepath: file.path,
            upload_date: new Date()
        });
        res.status(200).json(newFile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload file' });
    }
};

exports.getFiles = async (req, res) => {
    try {
        const files = await File.findAll({ order: [['upload_date', 'ASC']] });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch files' });
    }
};

exports.downloadFile = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findByPk(id);
        if (file) {
            res.download(path.resolve(file.filepath), file.filename);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to download file' });
    }
};
