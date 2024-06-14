//EXTERNALS
import { Router } from 'express';

//PIPEDRIVE-CONTROLLER
import { getDealsByStatus, getDealDetails, getDealProducts } from '../../controller/pipedrive/controller';

const pipeDriveRouter = Router();

export default pipeDriveRouter
	.get('/getDealsByStatus', getDealsByStatus)
	.get('/getDealById', getDealDetails)
	.get('/getDealProducts', getDealProducts);
