export const getItemsFromLS = () => {
	const data = localStorage.getItem('cart')

	return data ? JSON.parse(data) : []
}