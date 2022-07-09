import styles                  from './FullPizza.module.scss'
import { useEffect, useState } from 'react'
import { useParams }           from 'react-router-dom'

import axios from 'axios'


const FullPizza = () => {
	const [ pizza, setPizza ] = useState()
	const { id } = useParams()

	console.log(id)

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas/' + id)
				setPizza(data)
			}
			catch ( e ) {
				alert('Не удалось получить пиццу!')
			}
		}

		fetchPizza()
	}, [])

	if ( !pizza ) return <div className={ styles.root__loading_block }>Загрузка..</div>

	const { imageUrl, name, price } = pizza

	return (
		<div className={ styles.root }>
			<div className={ styles.root__pizza_img }>
				<img
					src={ imageUrl }
					alt="Pizza"
				/>
			</div>
			<div className={ styles.root__pizza_desc }>
				<h2>{ name }</h2>
				<p>от { price } ₽</p>
			</div>
		</div>
	)
}

export default FullPizza