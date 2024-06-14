import { Router, Request, Response } from 'express';

// import DealsRoutes from '../pipedrive/deals';
//const {getDealsByStatus} = new DealsRoutes();

import { getDealsByStatus, getDealDetails, getDealProducts } from '../../controller/pipedrive/deals';

// import { createOrders, getToken } from '../../controller/bling/orders';

// import convertDealsToOrders from '../../middleware/convertDealsToOrders';

const router = Router();


export default router
	.get('/healthcheck', (req: Request, res: Response) => {
		res.status(200).send('API Working!');
	})
	.get('/getDealsByStatus', async (req: Request, res: Response) => {
		const { status, limit } = req.body;

		const { pipedriveDeals }: any = await getDealsByStatus(status, limit);

		res.status(200).send(pipedriveDeals);
	})
	.get('/getDealById', async (req: Request, res: Response) => {
		const { id } = req.body;

		const { data }: any = await getDealDetails(id);

		const dealDetails = data;

		res.status(200).send(dealDetails);
	})
	.get('/getDealProducts', async (req: Request, res: Response) => {
		const { id } = req.body;

		const { data }: any = await getDealProducts(id);

		const dealDetails = data;

		res.status(200).send(dealDetails);
	}).post('/createOrders', async (req: Request, res: Response) => {
		const { status, limit } = req.body;

		let currentNext: any;

		let createdOrders;

		do {
			const pipedriveDealsResponse: any = await getDealsByStatus(status, limit);

			if (pipedriveDealsResponse.lenght > 0) {
				const { pipedriveDeals, next } = pipedriveDealsResponse;

				currentNext = next;

				pipedriveDeals.forEach(deal => {

					const blingOrderBody = convertDealsToOrders(dealDetails, dealProducts);

				// const createOrdersAtBling = await createOrders(pipedriveDeals);
				});
			}
			console.log('Não há pedidos a serem criados!');
			break;			
		} while (currentNext);

		

		res.status(200).send(createdOrders);
	});


	
// .post('/getToken', async (req: Request, res: Response) => {
// 	const tokens = getToken();
// 	return tokens;
// })


