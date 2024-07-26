import request from 'supertest';
import { server, app } from '../index';
import { mockQuery } from '../utils/__mocks__/database';

jest.mock('../utils/__mocks__/database');

describe('User Search API', () => {
    beforeEach(() => {
        mockQuery.mockClear();
    });

    afterAll(() => {
        server.close();
    });

    it('should return users matching the search query', async () => {
        mockQuery.mockResolvedValueOnce([
            { id: 1, name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
            { id: 2, name: 'Mike Johnson', city: 'Paris', country: 'France', favorite_sport: 'Tennis' },
        ]);

        const response = await request(app)
            .get('/api/users')
            .query({ q: 'john' });

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.data[0].name).toBe('John Doe');
        expect(response.body.data[1].name).toBe('Mike Johnson');
    });

    it('should return an empty array if no users match the search query', async () => {
        mockQuery.mockResolvedValueOnce([]);

        const response = await request(app)
            .get('/api/users')
            .query({ q: 'nonexistent' });

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
    });

    it('should return all users if no search query is provided', async () => {
        mockQuery.mockResolvedValueOnce([
            { id: 1, name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
            { id: 2, name: 'Jane Smith', city: 'London', country: 'UK', favorite_sport: 'Football' },
            { id: 3, name: 'Mike Johnson', city: 'Paris', country: 'France', favorite_sport: 'Tennis' },
        ]);

        const response = await request(app).get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(6);
    });
});
