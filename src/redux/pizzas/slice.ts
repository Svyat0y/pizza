import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pizza, PizzaSlice, Status }  from './types'
import { fetchPizzas }                from './asynActions'


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


export const {} = pizzasSlice.actions

export default pizzasSlice.reducer