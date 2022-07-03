import styles from './NotFoundBlock.module.scss'


const NotFoundBlock = () => {
	return (
		<div className={ styles.root }>
			<span>😕</span>
			<br/>
			<h1>Ничего не найдено</h1>
			<p className={ styles.description }> К сожалению данная страница отсутствует в нашем интернет-магазин</p>
		</div>
	)
}

export default NotFoundBlock