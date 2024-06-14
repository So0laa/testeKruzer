import { Router } from 'express';

import { createOrders, createContact } from '../../controller/bling/controller';

const blingRouter = Router();

export default blingRouter
//	.get('/getContactByName', getContactByName)
//	.get('/getOrderById', getOrderById)
	.post('/createOrders', createOrders)
	.post('/createContact', createContact);