//EXTERNALS
import { Router, Request, Response } from 'express';

const baseRouter = Router();

export default baseRouter
	.get('/healthcheck', (req: Request, res: Response) => {
		res.status(200).send('API Working!');
	});


