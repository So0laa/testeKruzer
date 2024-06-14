//EXTERNALS
import { Request, Response } from 'express';

//BLING-COMPONENT-REQUESTS
import { createContactRequest, getContactByNameRequest, createOrdersRequest, getOrderByIdRequest } from '../../components/bling/component';
const bling = { createContactRequest, getContactByNameRequest, createOrdersRequest, getOrderByIdRequest };

//PIPEDRIVE-COMPONENT-REQUESTS
import { getDealsByStatusRequest, getDealDetailsRequest, getDealProductsRequest } from '../../components/pipedrivre/component';
const pipedrive = { getDealsByStatusRequest, getDealDetailsRequest, getDealProductsRequest };

//MIDDLEWARES
import convertDealsToOrders from '../../middleware/convertDealsToOrders';
import convertContact from '../../middleware/convertContact';

//MODELS
import { OrderModel } from '../../model/orders';

export async function createContact(req: Request, res: Response) {
	try {
		const contactBody = req.body;		

		const { data }: any = await createContactRequest(contactBody);

		const createdContact = data;

		res.status(200).send(createdContact);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
	
	
}

export async function getContactByName(req: Request, res: Response) {
	try {
		const { name } = req.body;

		const { data }: any = await getContactByNameRequest(name);

		const contactDetails = data;

		res.status(200).send(contactDetails);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
}

export async function createOrders(req: Request, res: Response) {
	try {
		const { status, limit } = req.body;

		let currentNext: any;

		let createdOrders;

		do {
			const pipedriveDealsResponse: any = await pipedrive.getDealsByStatusRequest(status, limit);

			if (pipedriveDealsResponse.lenght > 0) {
				const { pipedriveDeals, next } = pipedriveDealsResponse;

				currentNext = next;

				pipedriveDeals.forEach(async (deal: any) => {

					const { id } = deal;

					const checkOrder = await bling.getOrderByIdRequest(id);

					if (checkOrder.lenght){
						next();
					} 

					const dealDetails = await pipedrive.getDealDetailsRequest(id);

					const { name } = dealDetails.person_id;

					let blingContact: any;

					const checkContact = await bling.getContactByNameRequest(name);

					if (!checkContact.lenght){
						const blingContactBody = convertContact(dealDetails);

						blingContact = await bling.createContactRequest(blingContactBody);
					} else {
						blingContact = checkContact.data;
					}

					const contact:number = blingContact.id;

					const dealProducts = await pipedrive.getDealProductsRequest(id);

					const blingOrderBody = convertDealsToOrders(contact, dealDetails, dealProducts);

					const createOrderAtBling = await bling.createOrdersRequest(blingOrderBody);

					const formatOrder = {
						numero: createOrderAtBling.data.id,
						data: dealDetails.won_time,
						valor: dealDetails.value
					};

					const registerOrder = await OrderModel.create(formatOrder);

					res.status(201).json(registerOrder);
				});
			}
			console.log('Não há pedidos a serem criados!');
			break;			
		
		} while (currentNext);

		res.status(200).send(createdOrders);
	} catch (error: any) {
		res.status(400).send(error.message);
	}	
}

export async function getOrderById(req: Request, res: Response) {
	try {
		const { id } = req.body;

		const { data }: any = await getOrderByIdRequest(id);

		const orderDetails = data;

		res.status(200).send(orderDetails);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
}