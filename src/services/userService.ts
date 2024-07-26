import { getAllFiles } from '../models/fileModel';
import { IUserService } from '../interfaces/userService';
import {FileData} from "../interfaces/fileService";

export class UserService implements IUserService {
    async searchFiles(query: string): Promise<FileData[]> {
        return await getAllFiles(query);
    }
}
