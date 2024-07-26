import { db } from '../utils/database';

export const createFileTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      favorite_sport VARCHAR(255) NOT NULL
    )
  `;
    await db.query(query);
};
