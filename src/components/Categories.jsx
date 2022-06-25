import { useState } from 'react'


const Categories = () => {
	const [ activeCategory, setActiveCategory ] = useState(0)
	const categories = [ 'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ]

	return (
		<div className="categories">
			<ul>
				{ categories.map((value, i) => (
					<li key={ i }
						onClick={ () => setActiveCategory(i) }
						className={ activeCategory === i ? 'active' : '' }>
						{ value }
					</li>
				)) }
			</ul>
		</div>
	)
}

export default Categories