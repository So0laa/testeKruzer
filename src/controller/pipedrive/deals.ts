const pipeDriveToken = process.env.PIPEDRIVE_TOKEN;
const pipeDriveBaseUrl = process.env.PIPEDRIVE_URL;

import axios from 'axios';

import { Request, Response } from 'express';

export async function getDealsByStatus(status: string) {
	console.log('chegou nas deals');
	const url: string = `${pipeDriveBaseUrl}/deals/collection?${status}`;

	const config = {
		headers: {'x-api-token': pipeDriveToken}
	};

	const dealsList = await axios.get(url, config)
		.then((response) => {
			return response.data;
		}).catch(function(error){
			console.log('DEU RUIM');
			console.log(error);
		}).finally(function() {
			console.log('Chamada feita ao pipedrive');
		});

	return dealsList;
}

export async function createOrdersAtBling(req: Request, res: Response) {
    
}