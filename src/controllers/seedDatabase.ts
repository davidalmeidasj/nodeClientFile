import { db } from '../utils/database';

export const seedDatabase = async () => {
    await db.query('DELETE FROM files');
    await db.query(`
        INSERT INTO files (name, city, country, favorite_sport)
        VALUES
        ('John Doe', 'New York', 'USA', 'Basketball'),
        ('Jane Smith', 'London', 'UK', 'Football'),
        ('Mike Johnson', 'Paris', 'France', 'Tennis')
    `);
};
