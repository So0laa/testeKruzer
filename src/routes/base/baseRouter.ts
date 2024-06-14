import { Router, Request, Response } from 'express';

// import DealsRoutes from '../pipedrive/deals';
//const {getDealsByStatus} = new DealsRoutes();

const baseRouter = Router();


export default baseRouter
	.get('/healthcheck', (req: Request, res: Response) => {
		res.status(200).send('API Working!');
	});


