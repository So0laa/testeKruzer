//ENV
require('dotenv').config();

//ROUTES
import baseRouter from './routes/base/router';
import pipeDriveRouter from './routes/pipedrive/router';
import blingRouter from './routes/bling/router';

// EXTERNALS
import express from 'express';
import config from 'config';
import db from '../config/db';

const app = express();

app.use(express.json());
app.use('/api/', baseRouter);
app.use('/api/pipedrive', pipeDriveRouter);
app.use('/api/bling', blingRouter);

const port = config.get<number>('port');

app.listen(port, async () => {

	await db();

	console.log('App rodando na porta 3000!');
});