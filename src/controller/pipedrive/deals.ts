const pipeDriveToken = process.env.PIPEDRIVE_TOKEN;
const pipeDriveBaseUrl = process.env.PIPEDRIVE_URL;

import axios from 'axios';

//import { Request, Response } from 'express';

export async function getDealsByStatus(status: string, limit: number) {
	console.log('chegou nas deals');
	const url: string = `${pipeDriveBaseUrl}/deals/collection?limit=${limit}&status=${status}`;

	const config = {
		headers: { 'x-api-token': pipeDriveToken }
	};

	const dealsList = await axios.get(url, config)
		.then((response) => {
			return {
				pipedriveDeals: response.data.data, 
				next: response.data.additional_data.next_cursor
			};
		}).catch(function (error) {
			console.log('DEU RUIM');
			console.error(error);
		}).finally(function () {
			console.log('Chamada feita ao pipedrive');
		});

	return dealsList;
}

export async function getDealDetails(id: number) {
	console.log('chegou no get details');
	const url: string = `${pipeDriveBaseUrl}/deals/${id}`;

	const config = {
		headers: { 'x-api-token': pipeDriveToken }
	};

	const dealDetails = await axios.get(url, config)
		.then((response) => {
			return response.data;
		}).catch(function (error) {
			console.log('DEU RUIM');
			console.error(error);
		}).finally(function () {
			console.log('Chamada feita ao pipedrive');
		});

	return dealDetails;
}

export async function getDealProducts(id: number) {
	console.log('chegou no get product');
	const url: string = `${pipeDriveBaseUrl}/deals/${id}/products`;

	const config = {
		headers: { 'x-api-token': pipeDriveToken }
	};

	const productsList = await axios.get(url, config)
		.then((response) => {
			return response.data;
		}).catch(function (error) {
			console.log('DEU RUIM');
			console.error(error);
		}).finally(function () {
			console.log('Chamada feita ao pipedrive');
		});

	return productsList;
}