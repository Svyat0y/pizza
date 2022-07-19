import styles                         from './FullPizza.module.scss'
import React, { useEffect, useState } from 'react'


import { Pizza }                  from '../../redux/pizzas/types'
import { useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'


const FullPizza: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [ pizza, setPizza ] = useState<Pizza>()

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://62b869c6f4cb8d63df5d67d3.mockapi.io/pizzas/' + id)
				setPizza(data)
			}
			catch (e) {
				alert('Не удалось получить пиццу!')
				navigate('/')
			}
		}

		fetchPizza()
	}, [])

	if (!pizza) return <div className={ styles.root__loading_block }>Загрузка..</div>

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