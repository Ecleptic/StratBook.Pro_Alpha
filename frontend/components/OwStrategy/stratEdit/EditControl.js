import React from 'react'
import PropTypes from 'prop-types'
import { OwHeroes } from '../../../configs/Overwatch/OwData'
import DraftEditor from '../../Draft'
const EditControl = props => {
	/**
	 * Attack / Defend
	 * Point A Heroes
	 * Point A Strat
	 * * Future: Point A Map
	 */
	console.log(props.data)
	return (
		<form>
			<Point subMapName={'Sub-Map Name'} />
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
