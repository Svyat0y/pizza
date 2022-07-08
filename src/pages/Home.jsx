import { useEffect, useRef, useState } from 'react'
import { useNavigate }                 from 'react-router-dom'
import qs                              from 'qs'

import { useDispatch, useSelector }                                 from 'react-redux'
import { setCategory, setPage, setSort, setFilters, selectFilter, } from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzasData }                            from '../redux/slices/pizzasSlice'

import Categories         from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import LoadingBlock       from '../components/LoadingBlock'
import PizzaBlock         from '../components/PizzaBlock'
import Pagination         from '../components/Pagination'


const Home = () => {
	const { activeCategory, currentPage, activeSort, searchValue } = useSelector(selectFilter)
	const { items, status } = useSelector(selectPizzasData)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const isSearch = useRef(false)
	const isMounted = useRef(false)

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
			currentPage,
		}))
	}

	useEffect(() => {
		if ( window.location.search ) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
			dispatch(setFilters({ ...params, sort }))
			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		if ( !isSearch.current ) getPizzas()
		isSearch.current = false
	}, [ activeCategory, activeSort, searchValue, currentPage ])

	useEffect(() => {
		if ( isMounted.current ) {
			const queryString = qs.stringify({
				sortProperty: activeSort.sortProperty,
				activeCategory,
				currentPage
			})
			navigate(`?${ queryString }`)
		}
		isMounted.current = true
	}, [ activeCategory, activeSort, searchValue, currentPage ])

	return (
		<div className="container">
			<div className="content__top">
				<Categories category={ activeCategory } onClickCategory={ (i) => dispatch(setCategory(i)) }/>
				<Sort activeSort={ activeSort } onclickSort={ (obj) => dispatch(setSort(obj)) }/>
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
								: items.map(obj => <PizzaBlock key={ obj.id } { ...obj }/>)
						}
					</div>

			}
			<Pagination dispatch={ dispatch } setPage={ setPage }/>
		</div>
	)
}

export default Home