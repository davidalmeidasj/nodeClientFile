import { getAllFiles } from '../models/fileModel';

export const root = {
    allFiles: async () => {
        return await getAllFiles();
    }
};
