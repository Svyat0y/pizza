export type ICartItem = {
	id: string,
	name: string,
	imageUrl: string,
	price: number,
	size: number,
	type: string,
	count: number
}

export interface CartSlice {
	items: ICartItem[]
	totalPrice: number
}