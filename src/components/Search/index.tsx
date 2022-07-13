import React, { useCallback, useState } from 'react'
import styles                           from './Search.module.scss'


import { setSearchValue } from '../../redux/slices/filterSlice'

import _debounce from 'lodash/debounce'
import searchSvg from '../../assets/img/search.svg'


type SearchProps = {
	dispatch: any
}

const Search: React.FC<SearchProps> = ({ dispatch }) => {
	const [ value, setValue ] = useState<string>('')

	const onSearch = useCallback(
		_debounce((str: string) => {
			dispatch(setSearchValue(str))
		}, 1000), []
	)

	const onChangeValue = (e: any) => {
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