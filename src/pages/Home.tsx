import React, { useCallback, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import qs              from 'qs'

import { useAppDispatch }                                                      from '../redux/store'
import { useSelector }                                                         from 'react-redux'
import { setCategory, setSort, setFilters, selectFilter, FilterSlice, SortT, } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzasData }                                       from '../redux/slices/pizzasSlice'

import Categories         from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import LoadingBlock       from '../components/LoadingBlock'
import PizzaBlock         from '../components/PizzaBlock'
import Pagination         from '../components/Pagination'


const Home: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isMounted = useRef(false)
	const isSearch = useRef(false)
	const { activeCategory, currentPage, activeSort, searchValue } = useSelector(selectFilter)
	const { items, status } = useSelector(selectPizzasData)

	const getPizzas = () => {
		const category = activeCategory > 0 ? `category=${ activeCategory }` : ''
		const search = searchValue ? `search=${ searchValue }` : ''
		const sortBy = activeSort.sortProperty.replace('-', '')
		const order = activeSort.sortProperty.includes('-') ? 'desc' : 'asc'

		dispatch(fetchPizzas({
			category,
			search,
			sortBy,
			order,
			currentPage: String(currentPage),
		}))
	}

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const activeSort = sortList.find(obj => obj.sortProperty === params.sortProperty)

			dispatch(setFilters({ ...params, activeSort } as FilterSlice))
			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: activeSort.sortProperty,
				activeCategory,
				currentPage,
			})
			navigate(`?${ queryString }`)
		}
		isMounted.current = true
	}, [ activeCategory, activeSort.sortProperty, searchValue, currentPage ])

	useEffect(() => {
		if (!isSearch.current) getPizzas()
		isSearch.current = false
	}, [ activeCategory, activeSort.sortProperty, searchValue, currentPage ])

	const onChangeCategory = useCallback((i: number) => {
		dispatch(setCategory(i))
	}, [])

	const onChangeSort = useCallback((obj: SortT) => {
		dispatch(setSort(obj))
	}, [])

	return (
		<div className="container">
			<div className="content__top">
				<Categories category={ activeCategory } onClickCategory={ onChangeCategory }/>
				<Sort activeSort={ activeSort } onclickSort={ onChangeSort }/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{
				status === 'error'
					? <div className='content__error-info'>
						<h2>Произошла ошибка 😕 </h2>
						<p>К сожалению, не удалось получить пиццы, попробуйте повторить попытку позже</p>
					</div>
					: <div className="content__items">
						{
							status === 'pending'
								? Array(10).fill(0).map((_, index) => <LoadingBlock key={ index }/>)
								: items.map((obj: any) => <PizzaBlock key={ obj.id } { ...obj }/>)
						}
					</div>

			}
			<Pagination/>
		</div>
	)
}

export default Home