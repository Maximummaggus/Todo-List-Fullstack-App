import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import todosRouter from './routes/todos.js';

const app = express();

app.use(cors()); // Erlaubt CORS für alle Anfragen
app.use(bodyParser.json()); // Zum Verarbeiten von JSON-Daten

app.use('/api/todos', todosRouter); // Nutzt die todos-Routen unter /api/todos

export default app;

