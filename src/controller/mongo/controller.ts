//EXTERNALS
import { Request, Response } from 'express';

//MODELS
import { OrderModel } from '../../model/orders';

export async function retrieveOrders(req: Request, res: Response) {
	try {
		const { numero, data, valor } = req.body;

		const registeredOrders: any = await OrderModel.find({ numero, data, valor });
		res.status(200).send(registeredOrders);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
}