import { Request, Response } from 'express';

//import { Request, Response } from 'express';

import { createContactRequest, getContactRequest, createOrdersRequest, getOrderRequest } from '../../components/bling/component';
const bling = { createContactRequest, getContactRequest, createOrdersRequest, getOrderRequest };

import { getDealsByStatusRequest, getDealDetailsRequest, getDealProductsRequest } from '../../components/pipedrivre/component';
const pipedrive = { getDealsByStatusRequest, getDealDetailsRequest, getDealProductsRequest };

import convertDealsToOrders from '../../middleware/convertDealsToOrders';
import convertContact from '../../middleware/convertContact';


export async function createContact(req: Request, res: Response) {
	const contactBody = req.body;		

	const { data }: any = await createContactRequest(contactBody);

	const createdContact = data;

	res.status(200).send(createdContact);
}

export async function createOrders(req: Request, res: Response) {
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

				const checkOrder = await bling.getOrderRequest(id);

				if (checkOrder.lenght){
					next();
				} 

				const dealDetails = await pipedrive.getDealDetailsRequest(id);

				const { name } = dealDetails.person_id;

				let blingContact: any;

				const checkContact = await bling.getContactRequest(name);

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
			});
		}
		console.log('Não há pedidos a serem criados!');
		break;			
	} while (currentNext);

	

	res.status(200).send(createdOrders);
}

export async function getDealProducts(req: Request, res: Response) {
	const { id } = req.body;

	const { data }: any = await getDealProductsRequest(id);

	const dealDetails = data;

	res.status(200).send(dealDetails);
}