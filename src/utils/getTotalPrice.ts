import { ICartItem } from '../redux/cart/types'


export const getTotalPrice = (items: ICartItem[]) => {
	return items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
}