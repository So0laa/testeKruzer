export function convertDealsToOrders (dealDetails, contact, dealProductDetails) {
	const  DEFAULT_PAYMENT = 6129158;

    interface order {
    numero: number,
    data: string,
    dataSaida: string,
    dataPrevista: string,
    contato: {
        id: number
    }
    itens: [{
        quantidade: number,
        valor: number,
        descricao: string
    }],
    parcelas: [{
        dataVencimento: string,
        valor: number,
        formaPagamento: {
            id: number
        }
    }]
}

    const blingOrderBody: order = {
    	numero: dealDetails.id,
    	data: dealDetails.won_time,
    	dataSaida: dealDetails.update_time,
    	dataPrevista: dealDetails.expected_close_date,
    	contato: {
    		id: contact
    	},
    	itens: [{
    		quantidade: dealProductDetails.quantity,
    		valor: dealProductDetails.item_price,
    		descricao: dealProductDetails.name
    	}],
    	parcelas: [{
    		dataVencimento: dealDetails.expected_close_date,
    		valor: dealDetails.value,
    		formaPagamento: {
    			id: DEFAULT_PAYMENT
    		}
    	}]
    };



}