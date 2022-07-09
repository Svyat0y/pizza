import styles                    from './Search.module.scss'
import { useCallback, useState } from 'react'

import searchSvg from '../../assets/img/search.svg'

import _debounce from 'lodash/debounce'

import { setSearchValue } from '../../redux/slices/filterSlice'


const Search = ({ dispatch }) => {
	const [ value, setValue ] = useState('')

	const onSearch = useCallback(
		_debounce((str) => {
			dispatch(setSearchValue(str))
		}, 1000), []
	)

	const onChangeValue = (e) => {
		setValue(e.target.value)
		onSearch(e.target.value)
	}


	return (
		<div className={ styles.root }>
			<img className={ styles.icon } src={ searchSvg } alt=''/>
			<input type='search' onChange={ (e) => onChangeValue(e) } value={ value }
				   placeholder='Поиск пиццы'/>
		</div>
	)
}

export default Search