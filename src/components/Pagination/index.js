import styles from './Pagination.module.scss'

import ReactPaginate from 'react-paginate'


const Pagination = () => {
	return (
		<div className={ styles.root }>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={ (event) => console.log(event) }
				pageRangeDisplayed={ 4 }
				pageCount={ 3 }
				previousLabel="<"
				renderOnZeroPageCount={ null }
			/>
		</div>
	)
}

export default Pagination