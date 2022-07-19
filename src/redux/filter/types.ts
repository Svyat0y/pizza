import { SortListEnum } from '../../components/Sort'


export type SortT = {
	name: string
	sortProperty: SortListEnum.RATINGDESK | SortListEnum.RATINGASK | SortListEnum.PRICEDESK | SortListEnum.PRICEASK | SortListEnum.NAMEDESK | SortListEnum.NAMEASK
}

export interface FilterSlice {
	activeCategory: number,
	currentPage: number,
	searchValue?: string,
	activeSort: SortT
}