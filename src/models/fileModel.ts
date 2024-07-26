import { db } from '../utils/database';
import { ResultSetHeader } from 'mysql2/promise';
import {File, FileResult} from '../interfaces/fileInterface';

export const insertFile = async (file: File): Promise<number> => {
    const query = `
    INSERT INTO files (name, city, country, favorite_sport)
    VALUES (?, ?, ?, ?)
  `;
    const [result] = await db.query<ResultSetHeader>(query, [file.name, file.city, file.country, file.favorite_sport]);
    return result.insertId;
};

export const getAllFiles = async (searchQuery: string = ``): Promise<File[]> => {
    let baseQuery = `
        SELECT id, name, city, country, favorite_sport
        FROM files
    `;

    let [rows] = await db.query<FileResult[]>(baseQuery);

    if (searchQuery) {
        const searchSql = `
            SELECT *
            FROM files
            WHERE LOWER(name) LIKE ? OR LOWER(city) LIKE ? OR LOWER(country) LIKE ? OR LOWER(favorite_sport) LIKE ?
        `;

        const searchPattern = `%${searchQuery.toLowerCase().trim()}%`;
        [rows] = await db.query<FileResult[]>(searchSql, [searchPattern, searchPattern, searchPattern, searchPattern]);
    }

    return rows;
};


