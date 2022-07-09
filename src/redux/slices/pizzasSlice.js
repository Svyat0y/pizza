import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios                             from 'axios'


export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
	const { currentPage, category, sortBy, order, search } = params
	const { data } = await axios.get
	(`https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }&${ search } `)
	return data
})


const initialState = {
	items: [],
	status: '' // loading | success | error
}

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPizzas.pending]: (state, action) => {
			state.items = []
			state.status = 'pending'
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'success'
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'error'
			state.items = []
		}
	}
})

export const selectPizzasData = state => state.pizzas

export const {} = pizzasSlice.actions

export default pizzasSlice.reducer