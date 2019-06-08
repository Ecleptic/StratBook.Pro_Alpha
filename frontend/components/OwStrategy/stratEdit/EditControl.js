import React, { useState, useEffect } from 'react'
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

const possibleControlMapData = {
	mapName: '',
	strategyName: '',
	expectedRank: '',
	creatorName: '',
	submapHeroes: {
		// submap1: ['h1', 'h2'],
		// submap2: ['h4', 'h6']
	},
	submapParagraph: {
		// TODO: fix that terrible naming
		// submap1: '## Win! ',
		// submap2: "#Don't Lose"
	}
}

const EditControl = props => {
	// console.log(props.data.owStrategies)
	const { subMaps } = props.data.owMapInfoes[0]
	const [currentSubMap, setCurrentSubMap] = useState(subMaps[0])
	const [rank, setRank] = useState()
	const [stratName, setStratName] = useState()
	const [submap1Heroes, setSubmap1Heroes] = useState()
	const [submap2Heroes, setSubmap2Heroes] = useState()
	const [submap3Heroes, setSubmap3Heroes] = useState()

	const [allMapInfo, setAllMapInfo] = useState(possibleControlMapData)

	const setMapHeroes = heroes => {
		console.log({ currentMap: currentSubMap, heroes })

		const newMapInfo = { ...allMapInfo }
		newMapInfo.submapHeroes[currentSubMap] = heroes
		setAllMapInfo(newMapInfo)
		console.log(allMapInfo)
	}

	return (
		<>
			<label htmlFor="ExpectedRankSelect">
				Expected Rank
				<select
					name="expectedRank"
					id="expectedRankSelect"
					onChange={e => setRank(e.target.value)}
					value={rank}
				>
					<option />
					{/* TODO: Probably should be put in a config or get from DB */}
					{[
						'Bronze',
						'Silver',
						'Gold',
						'Platinum',
						'Diamond',
						'Master',
						'Grand Master',
						'Top 500'
					].map(rank => (
						<option key={rank}>{rank}</option>
					))}
				</select>
			</label>
			{subMaps.map(map => {
				return (
					<button onClick={() => setCurrentSubMap(map)} key={map}>
						{map}
					</button>
				)
			})}
			<form>
				<label htmlFor="strategyName">
					Strategy Name
					<input
						id="strategyName"
						name="strategyName"
						placeholder="Name your Strategy"
						required
						type="text"
						value={stratName}
						onChange={e => setStratName(e.target.value)}
					/>
				</label>
				<Point subMapName={currentSubMap} setMapHeroes={setMapHeroes} />
				<button
					type="button"
					onClick={() => {
						console.log('Save Info (log info here)')
					}}
				>
					Save
				</button>
			</form>
		</>
	)
}

EditControl.propTypes = {}

export default EditControl

const Point = ({ subMapName, setMapHeroes }) => {
	const [markdown, setMarkdown] = useState('')
	const [heroes, setHeroes] = useState([])

	useEffect(() => {
		setHeroes(['', '', '', '', '', ''])
	}, [subMapName])

	function handleHeroSelect(e, index) {
		const newHeroes = [...heroes]
		newHeroes[index] = e.target.value
		setHeroes(newHeroes)
		setMapHeroes(newHeroes)
	}

	return (
		<>
			<h4>Point {subMapName}</h4>
			{[0, 1, 2, 3, 4, 5].map(index => {
				return (
					<li key={index}>
						<select
							onChange={e => handleHeroSelect(e, index)}
							value={heroes[index]}
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
				updateMD={md => {
					setMarkdown(md)
					console.log({md})
				}}
			/>
		</>
	)
}
