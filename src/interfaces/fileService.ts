export interface IFileService {
    processCSV(filePath: string): Promise<FileData[]>;
    saveFiles(files: FileData[]): Promise<void>;
}

export interface FileData {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}
