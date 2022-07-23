import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getItemsFromLS } from '../../utils/getItemsFromLS'
import { getTotalPrice }  from '../../utils/getTotalPrice'

import { CartSlice, ICartItem } from './types'


const initialState: CartSlice = getItemsFromLS()

const getItemById = (items: ICartItem[], action: PayloadAction<string>) => items.find((obj: ICartItem) => obj.id === action.payload)

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<ICartItem>) => {
			const findItem = state.items.find(obj => obj.id === action.payload.id)

			if (findItem) findItem.count++
			else state.items.push({ ...action.payload, count: 1 })

			state.totalPrice = Number(getTotalPrice(state.items))
		},
		minusItem: (state, action: PayloadAction<string>) => {
			const findItem = getItemById(state.items, action)

			if (findItem && findItem.count > 1) {
				findItem.count--
				state.totalPrice = state.totalPrice - findItem.price
			}
		},
		removeItem: (state, action: PayloadAction<string>) => {
			const findItem = getItemById(state.items, action)

			state.items = state.items.filter(obj => obj.id !== action.payload)
			if (findItem) state.totalPrice = state.totalPrice - (findItem.price * findItem.count)
		},
		clearCart: (state) => {
			state.items = []
			state.totalPrice = 0
		}
	}
})

export const { addItem, minusItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer