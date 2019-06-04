import React from 'react'
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

	return (
		<form>
			{subMaps.map(map => (
				<Point subMapName={map} key={map} />
			))}
		</form>
	)
}

EditControl.propTypes = {}

export default EditControl

const Point = ({ subMapName }) => (
	<>
		<h4>Point {subMapName}</h4>
		{[0, 1, 2, 3, 4, 5].map(index => {
			return (
				<li key={index}>
					<select name="PointA" id={`PointA${index}`}>
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
