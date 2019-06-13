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
	subMapInfo: {}
}

const EditControl = props => {
	const { subMaps, mapName } = props.data.owMapInfoes[0]
	const [currentSubMap, setCurrentSubMap] = useState(subMaps[0])
	const [rank, setRank] = useState()
	const [stratName, setStratName] = useState('')

	const [allMapInfo, setAllMapInfo] = useState(possibleControlMapData)

	const handleHeroesChange = (e, index) => {
		let newMapInfo = { ...allMapInfo }
		if (!newMapInfo.subMapInfo[currentSubMap]) newMapInfo.subMapInfo[currentSubMap] = {}
		newMapInfo.subMapInfo[currentSubMap].heroes = heroes
		console.log({ newMapInfo })
		setAllMapInfo(newMapInfo)
	}
	const handleMarkdownChange = markdown => {
		let newMapInfo = { ...allMapInfo }
		if (!newMapInfo.subMapInfo[currentSubMap]) newMapInfo.subMapInfo[currentSubMap] = {}
		newMapInfo.subMapInfo[currentSubMap].markdown = markdown
		console.log({ newMapInfo })
		setAllMapInfo(newMapInfo)
	}

	const saveForm = () => {
		console.log('saving')
	}

	return (
		<>
			<h2>{mapName}</h2>
			<form onSubmit={e => e.preventDefault()}>
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
					handleHeroesChange={handleHeroesChange}
					handleMarkdownChange={handleMarkdownChange}
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

const Point = ({ subMapName, handleHeroesChange, handleMarkdownChange, allMapInfo }) => {
	return (
		<>
			<h4>Point {subMapName}</h4>
			{[0, 1, 2, 3, 4, 5].map(index => {
				return (
					<li key={index}>
						<select
							onChange={e => {
								//  handleHeroSelect(e, index)
								handleHeroesChange(e, index)
							}}
							value={allMapInfo.subMapInfo[subMapName].heroes[index]}
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
				// markdown={markdown}
				mapName={subMapName}
				updateMD={(isDefense, md) => {
					// setMarkdown(md)
					// setMapMarkdown(md)
					handleMarkdownChange(md)
				}}
			/>
		</>
	)
}
