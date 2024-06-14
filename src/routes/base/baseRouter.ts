import { Router, Request, Response } from 'express';

// import DealsRoutes from '../pipedrive/deals';
//const {getDealsByStatus} = new DealsRoutes();

import {getPipeDriveDealsByStatus} from '../../controller/pipeDriveDealsToBling';

const router = Router();


export default router
	.get('/healthcheck', (req: Request, res: Response) => {
		res.status(200).send('API Working!');
	})
	.get('/getDealsByStatus', async(req: Request, res: Response) => {
		const {status} = req.body;

		const deals = await getPipeDriveDealsByStatus(status);

		// const createOrder = await createOrdersAtBling();

		res.status(200).send(deals);
	});
