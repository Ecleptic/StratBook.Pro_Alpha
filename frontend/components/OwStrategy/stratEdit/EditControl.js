import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { OwHeroes } from '../../../configs/Overwatch/OwData'
import DraftEditor from '../../Draft'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_CONTROL_SUBMAPS_QUERY = gql`
	query GET_CONTROL_SUBMAPS_QUERY($mapName: OwMap!) {
		owMapInfo(where: { mapName: $mapName }) {
			id
			mapName
			mapType
			subMaps
		}
	}
`

const CREATE_OW_STRATEGY_CONTROL_MUTATION = gql`
	mutation CREATE_OW_STRATEGY_CONTROL_MUTATION(
		$mapName: OwMap!
		$mapMode: OwMapMode!
		$offenseStrats: String!
		$offenseHeroes: [OwHero!]!
		$defenseHeroes: [OwHero!]!
		$creatorName: String!
		$strategyName: String!
		$subMap: OwControlSubMap
	) {
		createOwStrategyControl(
			data: {
				mapName: $mapName
				mapMode: $mapMode
				strategyName: $strategyName
				creatorName: { connect: { name: $creatorName } }
				offenseStrats: $offenseStrats
				offenseHeroes: { set: $offenseHeroes }
				defenseStrats: $defenseStrats
				defenseHeroes: { set: $defenseHeroes }
				subMap: $subMap
			}
		) {
			id
			creatorName {
				name
			}
			mapName
		}
	}
`

const EditControl = props => {
	// console.log(props.data.owStrategies)
	const { subMaps } = props.data.owMapInfoes[0]
	const [currentMap, setCurrentMap] = useState(subMaps[0])
	const [rank, setRank] = useState()
	return (
		<>
			<label htmlFor="ExpectedRankSelect">
				Expected Rank
				<select name="expectedRank" id="expectedRankSelect" onChange={e => setRank(e.target.value)} value={rank}>
					<option />
					{/* TODO: Probably should be put in a config or get from DB */}
					{['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grand Master', 'Top 500'].map(rank => (
						<option key={rank}>{rank}</option>
					))}
				</select>
			</label>
			{subMaps.map(map => {
				return (
					<button onClick={() => setCurrentMap(map)} key={map}>
						{map}
					</button>
				)
			})}
			<form>
				<Point subMapName={currentMap} />
			</form>
		</>
	)
}

EditControl.propTypes = {}

export default EditControl

const Point = ({ subMapName }) => {
	const [markdown, setMarkdown] = useState('')
	const [heroes, setHeroes] = useState([])

	function handleHeroSelect(e, index) {
		const newHeroes = [...heroes]
		newHeroes[index] = e.target.value
		setHeroes(newHeroes)
	}

	return (
		<>
			<h4>Point {subMapName}</h4>
			{[0, 1, 2, 3, 4, 5].map(index => {
				return (
					<li key={index}>
						<select
							name={`${subMapName}`}
							id={`${subMapName}${index}`}
							onChange={e => handleHeroSelect(e, index)}
							// value={selectedHero[index]}
						>
							<option />
							{OwHeroes.map(hero => (
								<option key={hero}>{hero}</option>
							))}
						</select>
					</li>
				)
			})}
			<DraftEditor
				updateMD={e => {
					console.log(e)
				}}
			/>
		</>
	)
}

// ;<li key={index}>
// 	<select
// 		name={`offenseHeroes`}
// 		id={`offenseHeroes${index}`}
// 		data-index={index}
// 		// selected={index}
// 		onChange={this.handleSelectChange}
// 	>
// 		<option />
// 		{OwHeroes.map(hero => (
// 			<option key={hero}>{hero}</option>
// 		))}
// 	</select>
// </li>
