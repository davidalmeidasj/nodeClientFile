import request from 'supertest';
import { server, app } from '../index';
import { mockQuery } from '../utils/__mocks__/database';
import fs from 'fs';
import path from 'path';

jest.mock('../utils/__mocks__/database');

describe('File Upload API', () => {
    beforeAll(() => {
        const uploadsDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        fs.chmodSync(uploadsDir, '0777');

        mockQuery.mockResolvedValueOnce([]);
        mockQuery.mockResolvedValueOnce([{ insertId: 1 }]);
    });

    afterAll(() => {
        const uploadsDir = path.join(__dirname, '../../uploads');
        fs.readdirSync(uploadsDir).forEach((file) => {
            fs.unlinkSync(path.join(uploadsDir, file));
        });

        server.close();
    });

    beforeEach(() => {
        mockQuery.mockClear();
    });

    it('should upload a CSV file and store data in the database', async () => {
        const response = await request(app)
            .post('/api/files')
            .attach('file', '__tests__/test-files/sample.csv');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('The file was uploaded successfully.');
    });

    it('should return 500 for an invalid CSV file', async () => {
        const response = await request(app)
            .post('/api/files')
            .attach('file', '__tests__/test-files/invalid.csv');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error: Invalid CSV format.');
    });

    it('should return 500 for a non-CSV file', async () => {
        const response = await request(app)
            .post('/api/files')
            .attach('file', '__tests__/test-files/sample.txt');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Please upload a CSV file.');
    });
});
