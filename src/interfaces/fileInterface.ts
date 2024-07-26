import {RowDataPacket} from "mysql2";

export interface File {
    id?: number;
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

export interface FileResult extends RowDataPacket, File {}