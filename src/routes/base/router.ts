//EXTERNALS
import { Router, Request, Response } from 'express';

//MONGO-CONTROLLER
import { retrieveOrders } from '../../controller/mongo/controller';
const mongo = { retrieveOrders };

const baseRouter = Router();

export default baseRouter
	.get('/healthcheck', (req: Request, res: Response) => {
		res.status(200).send('API Working!');
	})
	.get('/retrieveOrders', mongo.retrieveOrders);


