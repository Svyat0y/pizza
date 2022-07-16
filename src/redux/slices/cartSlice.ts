import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState }                  from '../store'


export type ICartItem = {
	id: string,
	name: string,
	imageUrl: string,
	price: number,
	size: number,
	type: string,
	count: number
}

interface CartSlice {
	items: ICartItem[]
	totalPrice: number
}

const initialState: CartSlice = {
	items: [],
	totalPrice: 0,
}

const getItemById = (state: CartSlice, action: PayloadAction<string>) => state.items.find((obj: ICartItem) => obj.id === action.payload)

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<ICartItem>) => {
			const findItem = state.items.find(obj => obj.id === action.payload.id)

			if (findItem) findItem.count++
			else state.items.push({ ...action.payload, count: 1 })

			state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
		},
		minusItem: (state, action: PayloadAction<string>) => {
			const findItem = getItemById(state, action)

			if (findItem && findItem.count > 1) {
				findItem.count--
				state.totalPrice = state.totalPrice - findItem.price
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			const findItem = getItemById(state, action)

			state.items = state.items.filter(obj => obj.id !== action.payload)
			if (findItem) state.totalPrice = state.totalPrice - (findItem.price * findItem.count)
		},
		clearCart: (state) => {
			state.items = []
			state.totalPrice = 0
		}
	}
})

export const selectCart = (state: RootState) => state.cart
export const selectCartById = (id: string) => (state: RootState) => state.cart.items.find((obj: ICartItem) => obj.id === id)

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer