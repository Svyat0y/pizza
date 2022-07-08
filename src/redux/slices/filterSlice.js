import { createSlice } from '@reduxjs/toolkit'


const initialState = {
	activeCategory: 0,
	currentPage: 1,
	searchValue: '',
	activeSort: { name: 'популярности (по убыв.)', sortProperty: '-rating' },
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.activeCategory = action.payload
		},
		setPage: (state, action) => {
			state.currentPage = action.payload
		},
		setSort: (state, action) => {
			state.activeSort = action.payload
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload
		},
		setFilters: (state, action) => {
			state.activeCategory = Number(action.payload.activeCategory)
			state.currentPage = Number(action.payload.currentPage)
			state.activeSort = action.payload.sort
		},
	},
})

export const selectFilter = state => state.filter

// Action creators are generated for each case reducer function
export const { setCategory, setPage, setSort, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer