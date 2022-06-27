import { useEffect, useState } from 'react'
import axios                   from 'axios'

import Categories   from '../components/Categories'
import Sort         from '../components/Sort'
import LoadingBlock from '../components/LoadingBlock'
import PizzaBlock   from '../components/PizzaBlock'


const Home = () => {
	const [ items, setItems ] = useState([])
	const [ isLoading, setIsLoading ] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		axios.get('https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas')
			.then(({ data }) => {
				setTimeout(() => {
					setItems(data)
					setIsLoading(false)
				}, 1000)
			})
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className="container">
			<div className="content__top">
				<Categories/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading
						? Array(10).fill(0).map((_, index) => <LoadingBlock key={ index }/>)
						: items.map(obj => <PizzaBlock key={ obj.id } { ...obj }/>)
				}
			</div>
		</div>
	)
}

export default Home