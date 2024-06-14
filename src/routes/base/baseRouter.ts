import { Router, Request, Response } from 'express';

// import DealsRoutes from '../pipedrive/deals';
//const {getDealsByStatus} = new DealsRoutes();

import { getDealsByStatus, getDealDetails, getDealProducts } from '../../controller/pipedrive/deals';
const pipedrive = { getDealsByStatus, getDealDetails, getDealProducts };

import { createOrders, getToken, createContact, getContact, getOrder } from '../../controller/bling/orders';
const bling = { createOrders, getToken, createContact, getContact, getOrder };

import convertDealsToOrders from '../../middleware/convertDealsToOrders';
import convertContact from '../../middleware/convertContact';

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
	})
	.post('/createContact', async (req: Request, res: Response) => {
		const contactBody = req.body;		

		const { data }: any = await createContact(contactBody);

		const createdContact = data;

		res.status(200).send(createdContact);
	})
	.post('/createOrders', async (req: Request, res: Response) => {
		const { status, limit } = req.body;

		let currentNext: any;

		let createdOrders;

		do {
			const pipedriveDealsResponse: any = await getDealsByStatus(status, limit);

			if (pipedriveDealsResponse.lenght > 0) {
				const { pipedriveDeals, next } = pipedriveDealsResponse;

				currentNext = next;

				pipedriveDeals.forEach(async (deal: any) => {

					const { id } = deal;

					const checkOrder = await bling.getOrder(id);

					if (checkOrder.lenght){
						next();
					} 

					const dealDetails = await pipedrive.getDealDetails(id);

					const { name } = dealDetails.person_id;

					let blingContact: any;

					const checkContact = await bling.getContact(name);

					if (!checkContact.lenght){
						const blingContactBody = convertContact(dealDetails);

						blingContact = await bling.createContact(blingContactBody);
					} else {
						blingContact = checkContact.data;
					}

					const contact:number = blingContact.id;

					const dealProducts = await pipedrive.getDealProducts(id);

					const blingOrderBody = convertDealsToOrders(contact, dealDetails, dealProducts);

					const createOrderAtBling = await bling.createOrders(blingOrderBody);
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


