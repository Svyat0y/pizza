import React  from 'react'
import styles from './Pagination.module.scss'

import ReactPaginate from 'react-paginate'


type PaginationProps = {
	setPage: (i: number) => void,
	dispatch: any
}


const Pagination: React.FC<PaginationProps> = ({ dispatch, setPage }) => {
	return (
		<div className={ styles.root }>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={ (event) => dispatch(setPage(event.selected + 1)) }
				pageRangeDisplayed={ 4 }
				pageCount={ 3 }
				previousLabel="<"
			/>
		</div>
	)
}

export default Pagination