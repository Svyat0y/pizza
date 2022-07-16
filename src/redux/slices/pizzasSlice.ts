import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios                                            from 'axios'
import { RootState }                                    from '../store'


export type Pizza = {
	id: string,
	name: string,
	imageUrl: string,
	price: number,
	size: number,
	type: string,
	count: number
}

interface PizzaSlice {
	items: Pizza[],
	status: Status
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizzas/fetchPizzas', async (params) => {
	const { currentPage, category, sortBy, order, search } = params
	const { data } = await axios.get<Pizza[]>
	(`https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }&${ search } `)
	return data
})

export enum Status {
	PENDING = 'pending',
	SUCCESS = 'success',
	ERROR = 'error',
}

const initialState: PizzaSlice = {
	items: [],
	status: Status.PENDING // loading | success | error
}

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			state.items = []
			state.status = Status.PENDING
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
			state.items = action.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			state.status = Status.ERROR
			state.items = []
		})
	}
})

export const selectPizzasData = (state: RootState) => state.pizzas

export const {} = pizzasSlice.actions

export default pizzasSlice.reducer