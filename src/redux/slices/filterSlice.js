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
	},
})

// Action creators are generated for each case reducer function
export const { setCategory, setPage, setSort, setSearchValue } = filterSlice.actions

export default filterSlice.reducer