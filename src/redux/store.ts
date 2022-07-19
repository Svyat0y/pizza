import { configureStore } from '@reduxjs/toolkit'
import { useDispatch }    from 'react-redux'

import cart   from './../redux/cart/slice'
import filter from './../redux/filter/slice'
import pizzas from './../redux/pizzas/slice'


export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas,
	},
})


export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

//@ts-ignore
window.store = store