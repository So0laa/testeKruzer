const blingToken = process.env.BLING_TOKEN;
const blingBaseUrl = process.env.BLING_URL;

import axios from 'axios';

// const qs = require('qs');

//import { Request, Response } from 'express';

export async function createContactRequest(blingContactBody: any) {
	const url = `${blingBaseUrl}/contatos`;
	const data = blingContactBody;
	const config = {
		headers: {
			'Autorization': blingToken
		}
	};

	const createContact:any = await axios.post(url, data, config)
		.then((response) => {
			console.log(response);				
			return response.data;
		}).catch(function (error) {
			console.log('DEU RUIM');
			console.error(error.response.data);
		}).finally(function () {
			console.log('Chamada feita a bling');
		});
	return createContact;
}

export async function getContactRequest(name: string) {

	const url = `${blingBaseUrl}/contatos`;
	const config = {
		headers: {
			'Autorization': blingToken
		},
		params: {
			pesquisa: name
		}
	};

	const getContact:any = await axios.get(url, config)
		.then((response) => {
			console.log(response);				
			return response.data;
		}).catch(function (error) {
			console.log('DEU RUIM');
			console.error(error.response.data);
		}).finally(function () {
			console.log('Chamada feita a bling');
		});
	return getContact;
}

export async function createOrdersRequest(blingOrderBody: any) {
	const url = `${blingBaseUrl}/pedidos/vendas`;
	const data = blingOrderBody;
	const config = {
		headers: {
			'Autorization': blingToken
		}
	};

	const createOrder:any = await axios.post(url, data, config)
		.then((response) => {
			console.log(response);				
			return response.data;
		}).catch(function (error) {
			console.log('DEU RUIM');
			console.error(error.response.data);
		}).finally(function () {
			console.log('Chamada feita a bling');
		});
	return createOrder;

}

export async function getOrderRequest(id: number) {

	const url = `${blingBaseUrl}/vendas`;
	const config = {
		headers: {
			'Autorization': blingToken
		},
		params: {
			numero: id
		}
	};

	const getOrder:any = await axios.get(url, config)
		.then((response) => {
			console.log(response);				
			return response.data;
		}).catch(function (error) {
			console.log('DEU RUIM');
			console.error(error.response.data);
		}).finally(function () {
			console.log('Chamada feita a bling');
		});
	return getOrder;
}


// export async function getToken() {
// 	const url:string = 'https://bling.com.br/Api/v3/oauth/token';

// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
// 			'Authorization': 'Basic OGFjOTFmOWJhOTFiZjcwM2Q1YTc3MDRhNGVkMGU0NGJiZjhmNDdmYw==:MzM5YjMzNWU0OWUxZGEyZTQwODI3MjZkNTkyMWNmNWVlOTM4ZGY3YzIzMzBjOGQ1MDI5ZjY3MTFjYWIz' 
// 		},
// 	};
// 	const data = qs.stringify({
// 		grant_type: 'authorization_code',
// 		code: '46d9e7e5e5ca58be0e5680e7277068157f680a92'
// 	});

// 	console.log(data);

// 	const tokens = await axios.post(url, data, config)
// 		.then((response) => {
// 			console.log(response);
      
// 			return {
// 				token: response.data.access_token, 
// 				refresh: response.data.refresh_token
// 			};
// 		}).catch(function (error) {
// 			console.log('DEU RUIM');
// 			console.error(error.response.data);
// 		}).finally(function () {
// 			console.log('Chamada feita a bling');
// 		});
// 	return tokens;
// }
