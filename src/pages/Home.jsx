import { useEffect, useState } from 'react'
import axios                   from 'axios'

import Categories   from '../components/Categories'
import Sort         from '../components/Sort'
import LoadingBlock from '../components/LoadingBlock'
import PizzaBlock   from '../components/PizzaBlock'
import Pagination   from '../components/Pagination'


const Home = ({ searchValue }) => {
	const [ items, setItems ] = useState([])
	const [ isLoading, setIsLoading ] = useState(true)
	const [ activeCategory, setActiveCategory ] = useState(0)
	const [ currentPage, setCurrentPage ] = useState(1)
	const [ activeSort, setActiveSort ] = useState({ name: 'популярности (по убыв.)', sortProperty: '-rating' })

	useEffect(() => {
		const category = activeCategory > 0 ? `category=${ activeCategory }` : ''
		const sortBy = activeSort.sortProperty.replace('-', '')
		const order = activeSort.sortProperty.includes('-') ? 'desc' : 'asc'
		const search = searchValue ? `search=${ searchValue }` : ''

		setIsLoading(true)
		axios.get(`https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas?page=${ currentPage }&limit=4${ category }&sortBy=${ sortBy }&order=${ order }&${ search } `)
			.then(({ data }) => {
				setTimeout(() => {
					setItems(data)
					setIsLoading(false)
				}, 1000)
			})
		window.scrollTo(0, 0)
	}, [ activeCategory, activeSort, searchValue, currentPage ])

	return (
		<div className="container">
			<div className="content__top">
				<Categories id={ activeCategory } onClickCategory={ (i) => setActiveCategory(i) }/>
				<Sort activeSort={ activeSort } onclickSort={ (obj) => setActiveSort(obj) }/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading
						? Array(10).fill(0).map((_, index) => <LoadingBlock key={ index }/>)
						: items.map(obj => <PizzaBlock key={ obj.id } { ...obj }/>)
				}
			</div>
			<Pagination onChangePage={ setCurrentPage }/>
		</div>
	)
}

export default Home