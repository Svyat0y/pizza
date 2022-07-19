import { createAsyncThunk } from '@reduxjs/toolkit'
import { Pizza }            from './types'

import axios from 'axios'


export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizzas/fetchPizzas', async (params) => {
	const { currentPage, category, sortBy, order, search } = params
	const { data } = await axios.get<Pizza[]>
	(`https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }&${ search } `)
	return data
})