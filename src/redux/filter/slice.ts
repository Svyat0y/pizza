import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSlice, SortT }         from './types'
import { SortListEnum }               from '../../components/Sort'


const initialState: FilterSlice = {
	activeCategory: 0,
	currentPage: 1,
	searchValue: '',
	activeSort: { name: 'популярности (по убыв.)', sortProperty: SortListEnum.RATINGDESK },
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<number>) => {
			state.activeCategory = action.payload
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setSort: (state, action: PayloadAction<SortT>) => {
			state.activeSort = action.payload
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		setFilters: (state, action: PayloadAction<FilterSlice>) => {
			if (Object.keys(action.payload).length) {
				state.activeCategory = Number(action.payload.activeCategory)
				state.currentPage = Number(action.payload.currentPage)
				state.activeSort = action.payload.activeSort
			}
			else{
				state.activeCategory = 0
				state.currentPage = 1
				state.searchValue = ''
				state.activeSort = {
					name: 'популярности (по убыв.)',
					sortProperty: SortListEnum.RATINGDESK
				}
			}
		},
	},
})

export const { setCategory, setPage, setSort, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer