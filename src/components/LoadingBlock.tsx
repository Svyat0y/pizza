import React from 'react'

import ContentLoader from 'react-content-loader'


const LoadingBlock: React.FC = () => {
	return (
		<ContentLoader
			className='pizza-block'
			speed={ 1 }
			width={ 280 }
			height={ 457 }
			viewBox="0 0 280 457"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="140" cy="140" r="130"/>
			<rect x="0" y="285" rx="6" ry="6" width="280" height="25"/>
			<rect x="0" y="325" rx="6" ry="6" width="280" height="84"/>
			<rect x="0" y="421" rx="6" ry="6" width="92" height="30"/>
			<rect x="142" y="415" rx="20" ry="20" width="137" height="40"/>
		</ContentLoader>
	)
}

export default LoadingBlock