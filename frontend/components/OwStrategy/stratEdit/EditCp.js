import React from 'react'
import PropTypes from 'prop-types'
import { OwHeroes } from '../../../configs/Overwatch/OwData'
import DraftEditor from '../../Draft'
const EditCP = props => {
	/**
	 * Attack / Defend
	 * Point A Heroes
	 * Point A Strat
	 * * Future: Point A Map
	 */
	return (
		<form>
			<Point pointType="A" />
			<Point pointType="B" />
		</form>
	)
}

EditCP.propTypes = {}

export default EditCP

const Point = ({ pointType }) => (
	<>
		<h4>Point {pointType}</h4>
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
