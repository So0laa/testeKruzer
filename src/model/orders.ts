//EXTERNALS
import {model, Schema} from 'mongoose';

const orderSchema = new Schema(
	{
		numero: {type: Number},
		data: {type: Date},
		valor: {type: Number}
	},
	{
		timestamps: true
	}
);

export const OrderModel = model('Order', orderSchema);