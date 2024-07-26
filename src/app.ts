import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import fileRoutes from './routes/fileRoutes';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './graphql/schema';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(userRoutes);
app.use(fileRoutes);

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});


export default app;
