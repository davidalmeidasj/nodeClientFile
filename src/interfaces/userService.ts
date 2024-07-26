import { FileData } from './fileService';

export interface IUserService {
    searchFiles(query: string): Promise<FileData[]>;
}
