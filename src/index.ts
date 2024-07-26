import http from 'http';
import app from './app';
import { Server as SocketIOServer } from 'socket.io';
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './graphql/schema';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger';
import { db } from './utils/database';
import { createFileTable } from './migrations/createFileTable';

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    path: '/ws',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

db.getConnection()
    .then(connection => {
        connection.release();
        createFileTable();
    })
    .catch(error => {
        console.error('Database connection failed:', error);
    });

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;

export { server, io, app };

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
