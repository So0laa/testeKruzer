import { Request, Response } from 'express';

//import { Request, Response } from 'express';

import { getDealsByStatusRequest, getDealDetailsRequest, getDealProductsRequest } from '../../components/pipedrivre/component';
const pipedrive = { getDealsByStatusRequest, getDealDetailsRequest, getDealProductsRequest };

export async function getDealsByStatus(req: Request, res: Response) {
	const { status, limit } = req.body;

	const { pipedriveDeals }: any = await pipedrive.getDealsByStatusRequest(status, limit);

	res.status(200).send(pipedriveDeals);
}

export async function getDealDetails(req: Request, res: Response) {
	const { id } = req.body;

	const { data }: any = await pipedrive.getDealDetailsRequest(id);

	const dealDetails = data;

	res.status(200).send(dealDetails);
}

export async function getDealProducts(req: Request, res: Response) {
	const { id } = req.body;

	const { data }: any = await pipedrive.getDealProductsRequest(id);

	const dealDetails = data;

	res.status(200).send(dealDetails);
}