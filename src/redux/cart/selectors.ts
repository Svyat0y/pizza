import { RootState } from '../store'
import { ICartItem } from './types'


export const selectCart = (state: RootState) => state.cart
export const selectCartById = (id: string) => (state: RootState) => state.cart.items.find((obj: ICartItem) => obj.id === id)