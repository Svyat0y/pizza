import { useEffect, useRef, useState } from 'react'
import axios                           from 'axios'
import { useNavigate }                 from 'react-router-dom'
import qs                              from 'qs'

import { useDispatch, useSelector }                  from 'react-redux'
import { setCategory, setPage, setSort, setFilters } from '../redux/slices/filterSlice'

import Categories         from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import LoadingBlock       from '../components/LoadingBlock'
import PizzaBlock         from '../components/PizzaBlock'
import Pagination         from '../components/Pagination'


const Home = () => {
	const { activeCategory, currentPage, activeSort, searchValue } = useSelector((state) => state.filter)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [ items, setItems ] = useState([])
	const [ isLoading, setIsLoading ] = useState(true)
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const fetchPizzas = () => {
		const category = activeCategory > 0 ? `category=${ activeCategory }` : ''
		const search = searchValue ? `search=${ searchValue }` : ''
		const sortBy = activeSort.sortProperty.replace('-', '')
		const order = activeSort.sortProperty.includes('-') ? 'desc' : 'asc'

		setIsLoading(true)
		axios.get(`https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }&${ search } `)
			.then(({ data }) => {
				setTimeout(() => {
					setItems(data)
					setIsLoading(false)
				}, 1000)
			})
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
		if ( !isSearch.current ) fetchPizzas()
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
			<div className="content__items">
				{
					isLoading
						? Array(10).fill(0).map((_, index) => <LoadingBlock key={ index }/>)
						: items.map(obj => <PizzaBlock key={ obj.id } { ...obj }/>)
				}
			</div>
			<Pagination dispatch={ dispatch } setPage={ setPage }/>
		</div>
	)
}

export default Home