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
	useEffect(() => {
		console.log({ currentSubMap })
		if (!allMapInfo.subMapInfo[currentSubMap]) {
			allMapInfo.subMapInfo[currentSubMap] = {}
		}
		if (!allMapInfo.subMapInfo[currentSubMap].heroes) {
			console.log('no heroes! ')
			allMapInfo.subMapInfo[currentSubMap].heroes = []
		}
	}, [])
	useEffect(() => {
		console.log({ allMapInfo })
	}, [allMapInfo])
	const handleHeroesChange = (e, index) => {
		// TODO: look into Object.Assign instead?
		let newMapInfo = { ...allMapInfo }
		if (!newMapInfo.subMapInfo[currentSubMap]) newMapInfo.subMapInfo[currentSubMap] = {}
		if (!newMapInfo.subMapInfo[currentSubMap].heroes) newMapInfo.subMapInfo[currentSubMap].heroes = ['', '', '', '', '', '']
		const newHeroes = [...newMapInfo.subMapInfo[currentSubMap].heroes]
		newHeroes[index] = e.target.value

		newMapInfo.subMapInfo[currentSubMap].heroes = newHeroes
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
					currentSubMap={currentSubMap}
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

const Point = ({ currentSubMap, handleHeroesChange, handleMarkdownChange, allMapInfo }) => {
	const [heroes, setHeroes] = useState(['', '', '', '', '', ''])
	const [markdown, setMarkdown] = useState('')
	useEffect(() => {
		console.log(allMapInfo.subMapInfo[currentSubMap])
	}, [])
	useEffect(() => {
		if (allMapInfo && allMapInfo.subMapInfo[currentSubMap]) {
			if (allMapInfo.subMapInfo[currentSubMap].heroes) setHeroes(allMapInfo.subMapInfo[currentSubMap].heroes)
			else setHeroes(['', '', '', '', '', ''])
			if (allMapInfo.subMapInfo[currentSubMap].markdown) setMarkdown(allMapInfo.subMapInfo[currentSubMap].markdown)
			else setMarkdown('')
		}
	}, [currentSubMap])

	const heroesChange = (e, index) => {
		const newHeroes = [...heroes]
		newHeroes[index] = e.target.value
		setHeroes(newHeroes)
		handleHeroesChange(e, index)
	}

	return (
		<>
			<h4>Point {currentSubMap}</h4>
			{[0, 1, 2, 3, 4, 5].map(index => {
				return (
					<li key={index}>
						<select
							onChange={e => {
								//  handleHeroSelect(e, index)
								heroesChange(e, index)
							}}
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
			<textarea cols={40} rows={10} />

			{/* <DraftEditor
				// This still isn't showing props correctly here..
				markdown={markdown}
				mapName={currentSubMap}
				updateMD={(isDefense, md) => {
					handleMarkdownChange(md)
				}}
			/> */}
		</>
	)
}
