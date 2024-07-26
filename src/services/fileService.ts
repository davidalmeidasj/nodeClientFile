import csv from 'csv-parser';
import fs from 'fs';
import { insertFile } from '../models/fileModel';
import { IFileService, FileData } from '../interfaces/fileService';

export class FileService implements IFileService {
    async processCSV(filePath: string): Promise<FileData[]> {
        return new Promise((resolve, reject) => {
            const results: FileData[] = [];
            let invalidCSV = false;

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    if (!data.name || !data.city || !data.country || !data.favorite_sport) {
                        invalidCSV = true;
                    }
                    results.push(data);
                })
                .on('end', () => {
                    if (invalidCSV) {
                        reject(new Error('Invalid CSV format.'));
                    } else {
                        resolve(results);
                    }
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    async saveFiles(files: FileData[]): Promise<void> {
        for (const file of files) {
            await insertFile(file);
        }
    }
}
