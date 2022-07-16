import React  from 'react'
import styles from './Pagination.module.scss'

import { useAppDispatch } from '../../redux/store'


import ReactPaginate from 'react-paginate'
import { setPage }   from '../../redux/slices/filterSlice'


const Pagination: React.FC = () => {
	const dispatch = useAppDispatch()

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