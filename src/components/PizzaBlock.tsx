import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { addItem }                  from '../redux/cart/slice'
import { selectCartById }           from '../redux/cart/selectors'
import { ICartItem }                from '../redux/cart/types'


const typesName = [ 'тонкое', 'традиционное' ]

type PizzaBlockProps = {
	id: string,
	name: string,
	imageUrl: string,
	price: number,
	sizes: number[],
	types: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, name, imageUrl, price, sizes, types }) => {
	const dispatch = useDispatch()
	const cartItem = useSelector(selectCartById(id))
	const [ activeType, setActiveType ] = useState(types[0])
	const [ activeSize, setActiveSize ] = useState(0)

	const addToCart = () => {
		const newObj: ICartItem = {
			id,
			name,
			imageUrl,
			price,
			size: sizes[activeSize],
			type: typesName[activeType],
			count: 0
		}
		dispatch(addItem(newObj))
	}

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link to={ '/pizzas/' + id }>
					<img
						className="pizza-block__image"
						src={ imageUrl }
						alt="Pizza"
					/>
					<h4 className="pizza-block__title">{ name }</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{
							types.map((type) => (
								<li key={ type }
									onClick={ () => setActiveType(type) }
									className={ activeType === type ? 'active' : '' }>
									{ typesName[type] }
								</li>
							))
						}
					</ul>
					<ul>
						{
							sizes.map((size, i) => (
								<li key={ size }
									onClick={ () => setActiveSize(i) }
									className={ activeSize === i ? 'active' : '' }>
									{ size } см
								</li>
							))
						}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от { price } <span style={ { fontSize: '12px' } }>UAH</span></div>
					<div onClick={ addToCart } className="button button--outline button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						{ cartItem && <i>{ cartItem.count }</i> }
					</div>
				</div>
			</div>
		</div>
	)
}

export default PizzaBlock
