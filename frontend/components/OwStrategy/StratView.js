const ReactMarkdown = require('react-markdown')
import { Query } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'

// import GetStrategyQuery from './GetStrategyQuery'
import HeroImage from './HeroImage'
import {
	OwHeroes,
	OwUrlToMap,
	OwMapToEnum
} from '../../configs/Overwatch/OwData'

const HeroList = styled.ul`
	margin: 0;
	padding: 0 0 5rem 0;
	list-style: none;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`
const HeroListItem = styled.li`
	border: 1px solid ${props => props.theme.borderColor};
	margin-right: -1px;
	padding: 10px;
`
const StratViewHeader = styled.div`
	display: grid;
	/* flex-flow: row wrap; */
	/* justify-content: space-around; */
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-areas: 'subMap mapName playerInfo';
	text-align: center;
`
const MarkDownRendered = styled(ReactMarkdown)`
	border: 2px solid ${props => props.theme.borderColor};
	padding: 15px;
`
const MapNameHeader = styled.h2`
	grid-area: mapName;
`

const GET_STRATEGIES_QUERY = gql`
	query GET_STRATEGIES_QUERY($userName: String!, $mapName: OwMap!) {
		owStrategies(
			where: {
				AND: [
					{ creatorName: { name: $userName } }
					{ mapName: $mapName }
				]
			}
		) {
			id
			mapName
			defenseStrats
			defenseHeroes
			offenseStrats
			offenseHeroes
			mapMode
			strategyName
			expectedRank
			subMap
			creatorName {
				name
			}
			offenseStrats
		}
	}
`

class StratView extends Component {
	render() {
		console.log('Mounted StratView.js')
		const meUser = this.props.me !== undefined ? this.props.me.name : '' || ''
		const { mapName, userName: propUser } = this.props
		console.log(this.props)
		const userName = propUser ? propUser : meUser // should be... if there's a prop user, show that, otherwise, show meUser

		return (
			<Query
				query={GET_STRATEGIES_QUERY}
				variables={{ userName, mapName: OwMapToEnum(mapName) }}
			>
				{({ data, loading, error, userName }) => {
					if (loading) return 'Loading'
					if (error) return <p>Error: {`${error}`}</p>
					const {
						id,
						// mapName,
						defenseStrats,
						defenseHeroes,
						offenseStrats,
						offenseHeroes,
						mapMode,
						strategyName,
						expectedRank,
						subMap,
						creatorName
					} = data.owStrategies[0]

					return (
						<>
							<StratViewHeader>
								<MapNameHeader>
									{mapName.toUpperCase()}
								</MapNameHeader>
								<div>
									{subMap && <h3>Submap: {subMap},</h3>}
								</div>
								<div>
									{mapMode && <h3>Map Mode: {mapMode}</h3>}{' '}
									{expectedRank && (
										<h3>Expected Rank: {expectedRank}</h3>
									)}
									{/* <h3>{`${creatorName.name.toUpperCase()}'S`}</h3> */}
									<h4>{strategyName.toUpperCase()}</h4>
								</div>
							</StratViewHeader>
							<h2>Offense:</h2>
							<HeroList id="offenseHeroesList">
								{offenseHeroes.map(hero => (
									<HeroListItem key={hero}>
										<HeroImage hero={hero} />
									</HeroListItem>
								))}
							</HeroList>
							<MarkDownRendered source={offenseStrats} />
							{ mapMode!== 'control'
							<h2>Defense:</h2>
							<HeroList id="defenseHeroesList">
								{defenseHeroes.map(hero => (
									<HeroListItem key={hero}>
										<HeroImage hero={hero} />
									</HeroListItem>
								))}
							</HeroList>
							<MarkDownRendered source={defenseStrats} />}
						</>
					)
				}}
			</Query>
		)
	}
}

export default StratView
