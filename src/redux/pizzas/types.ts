export type Pizza = {
	id: string,
	name: string,
	imageUrl: string,
	price: number,
	size: number,
	type: string,
	count: number
}

export interface PizzaSlice {
	items: Pizza[],
	status: Status
}


export enum Status {
	PENDING = 'pending',
	SUCCESS = 'success',
	ERROR = 'error',
}