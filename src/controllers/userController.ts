import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const query = req.query.q?.toString().toLowerCase() || '';
        const files = await userService.searchFiles(query);

        res.status(200).json({ data: files });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error searching files', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
};
