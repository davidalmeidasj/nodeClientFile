import { buildSchema } from 'graphql';
import { insertFile, getAllFiles } from '../models/fileModel';
import { io } from '../index';
import { File } from '../interfaces/fileInterface';

export const schema = buildSchema(`
  type Query {
    hello: String
    allFiles: [File]
  }

  type Mutation {
    createFile(name: String!, city: String!, country: String!, favorite_sport: String!): File
  }

  type File {
    id: ID!
    name: String!
    city: String!
    country: String!
    favorite_sport: String!
  }
`);

export const root = {
    hello: () => 'Hello world!',
    allFiles: async () => {
        return await getAllFiles();
    },
    createFile: async ({ name, city, country, favorite_sport }: { name: string; city: string; country: string; favorite_sport: string }) => {
        const id = await insertFile({ name, city, country, favorite_sport });
        const newFile: File = { id, name, city, country, favorite_sport };
        io.emit('updateFiles');
        return newFile;
    }
};
