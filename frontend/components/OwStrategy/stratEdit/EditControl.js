import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { OwHeroes } from '../../../configs/Overwatch/OwData'
import DraftEditor from '../../Draft'

const owRanks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grand Master', 'Top 500']
const possibleControlMapData = {
	mapName: '',
	strategyName: '',
	expectedRank: '',
	creatorName: '',
	SubmapInfo: [
		{ heroes: ['', '', '', '', '', ''], details: ' ', name: 'meka' },
		{ heroes: ['', '', '', '', '', ''], details: ' ', name: '' },
		{ heroes: ['', '', '', '', '', ''], details: ' ', name: '' }
	],

	submaps: [['heroes'], ['details']],
	// option2Info: { // *! Probably going to go with option 2 here. They're enums so _shouldn't_ change
	// 	submap1Name: { Heroes, details },
	// 	submap2Name: { Heroes, details },
	// 	submap3Name: { Heroes, details }
	// },
	option3Heroes: {
		Sanctuary: ['Ana', 'Zen'],
		submap2: ['h4', 'h6']
	},
	option3mapInfo: {
		// TODO: fix that terrible naming
		submap1: '## Win! ',
		submap2: "#Don't Lose"
	},
	option4Heroes: [['Ana', 'Zen'], ['h4', 'h6']],
	option4mapInfo: ['## Win! ', "#Don't Lose"]
}

const EditControl = props => {
	// // console.log(props.data.owStrategies[0])
	const { subMaps, mapName } = props.data.owMapInfoes[0]
	const [currentSubMap, setCurrentSubMap] = useState(subMaps[0])
	const [rank, setRank] = useState()
	const [stratName, setStratName] = useState('')

	const [allMapInfo, setAllMapInfo] = useState(possibleControlMapData)

	const accumulateHeroes = heroes => {
		const subMapIndex = subMaps.findIndex(map => map === currentSubMap)
		const newMapInfo = { ...allMapInfo }
		newMapInfo.SubmapInfo[subMapIndex].heroes = heroes
		newMapInfo.SubmapInfo[subMapIndex].name = currentSubMap
		setAllMapInfo(newMapInfo)
	}
	const setMapMarkdown = markdown => {
		const subMapIndex = subMaps.findIndex(map => map === currentSubMap)
		const newMapInfo = { ...allMapInfo }
		newMapInfo.SubmapInfo[subMapIndex].markdown = markdown
		newMapInfo.SubmapInfo[subMapIndex].name = currentSubMap
		setAllMapInfo(newMapInfo)
	}

	/**
	 * TODO:
	 * Get all data from state, put it in the allmapinfo, and then push that to the DB.
	 */
	const saveForm = () => {
		// console.log('saving')
		// console.log({ allMapInfo })

		const data = {}
	}

	return (
		<>
			<h2>{mapName}</h2>
			<form onSubmit={e => e.preventDefault()}>
				{/* TODO: orchestrator */}
				<label htmlFor="ExpectedRankSelect">
					Expected Rank
					<select name="expectedRank" id="expectedRankSelect" onChange={e => setRank(e.target.value)} value={rank}>
						<option />
						{/* TODO: Probably should be put in a config or get from DB */}
						{owRanks.map(rank => (
							<option key={rank}>{rank}</option>
						))}
					</select>
				</label>
				{subMaps.map(map => {
					return (
						<button type="button" onClick={() => setCurrentSubMap(map)} key={map}>
							{map}
						</button>
					)
				})}
				<label htmlFor="strategyName">
					Strategy Name
					<input
						id="strategyName"
						name="strategyName"
						placeholder="Name your Strategy"
						// required
						type="text"
						value={stratName}
						onChange={e => setStratName(e.target.value)}
					/>
				</label>
				<Point
					subMapName={currentSubMap}
					setMapHeroes={accumulateHeroes}
					setMapMarkdown={setMapMarkdown}
					allMapInfo={allMapInfo}
					subMaps={subMaps}
				/>
				<button type="button" onClick={saveForm}>
					Save
				</button>
			</form>
		</>
	)
}

EditControl.propTypes = {}

export default EditControl

const Point = ({ subMapName, setMapHeroes, setMapMarkdown, allMapInfo, subMaps, handleHeroSelect }) => {
	return (
		<>
			<h4>Point {subMapName}</h4>
			{[0, 1, 2, 3, 4, 5].map(index => {
				return (
					<li key={index}>
						<select
							onChange={e => {
								//  handleHeroSelect(e, index)
								handleHeroSelect(e, index, subMapName)
							}}
							// value={heroes[index]}
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
				markdown={markdown}
				mapName={subMapName}
				updateMD={(isDefense, md) => {
					// setMarkdown(md)
					// setMapMarkdown(md)
					handleMarkdownChange(md, subMapName)
				}}
			/>
		</>
	)
}
