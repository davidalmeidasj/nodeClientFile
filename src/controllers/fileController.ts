import { Response } from 'express';
import { RequestWithFile } from '../interfaces/requestWithFile';
import { FileService } from '../services/fileService';
import { io } from '../index';
import path from 'path';
import fs from 'fs';

const fileService = new FileService();

export const uploadFile = async (req: RequestWithFile, res: Response) => {
    if (!req.file) {
        return res.status(500).json({ message: 'No file uploaded.' });
    }

    if (req.file.mimetype !== 'text/csv') {
        return res.status(500).json({ message: 'Please upload a CSV file.' });
    }

    const filePath = path.join(__dirname, '../../uploads', req.file.filename);

    try {
        const fileData = await fileService.processCSV(filePath);
        await fileService.saveFiles(fileData);
        io.emit('updateFiles');
        res.status(200).json({ message: 'The file was uploaded successfully.' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    } finally {
        fs.unlinkSync(filePath);
    }
};
