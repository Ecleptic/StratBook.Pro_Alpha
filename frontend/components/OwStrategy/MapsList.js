import React from 'react'
import Link from 'next/link'
import slug from 'speakingurl'
// import { getNumStrategies } from '../../helpers/graphQueries'
import { OwMapToEnum } from '../../lib/helperFuncs'

import { OwMaps } from '../../configs/Overwatch/OwData'

const MapsList = ({ url, teamName, setMapName, setStrats, setActiveStrat }) => (
	<div>
		<h1>{teamName && teamName.toUpperCase()}</h1>
		<ul>
			{OwMaps.map((map, index) => {
				return (
					<li key={index}>
						{/* Have to check if the path has a trailing / or not to correctly link */}
						<Link
							href={
								url.asPath[url.asPath.length - 1] === '/'
									? `${url.asPath}${(slug(map)).toLocaleLowerCase()}`
									: `${url.asPath}/${(slug(map)).toLocaleLowerCase()}`
							}
						>
							<a>{map.toLocaleUpperCase()}</a>
						</Link>
					</li>
				)
			})}
		</ul>
	</div>
)

export default MapsList
