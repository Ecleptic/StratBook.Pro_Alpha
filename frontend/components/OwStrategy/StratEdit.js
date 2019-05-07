import React, { Component } from 'react'
// import marked from 'marked'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// import Form from '../WYSIWYG/Form'
import DraftEditor from '../Draft'
import Error from '../ErrorMessage'
import Signup from '../Signup_Portal'
// import TextEditor from './textEditor'
import User from '../User'

import { OwHeroes, OwMaps, OwControlMapsData, OwMapTypes, OwMapToEnum } from '../../configs/Overwatch/OwData'

const CREATE_OW_STRATEGY_MUTATION = gql`
	mutation CREATE_OW_STRATEGY_MUTATION(
		$mapName: OwMap!
		$mapMode: OwMapMode!
		$offenseStrats: String!
		$offenseHeroes: [OwHero!]!
		$defenseHeroes: [OwHero!]!
		$creatorName: String!
		$strategyName: String! # $subMap: OwControlSubMap
	) {
		createOwStrategy(
			data: {
				mapName: $mapName
				mapMode: $mapMode
				strategyName: $strategyName
				creatorName: { connect: { name: $creatorName } }
				offenseStrats: $offenseStrats
				offenseHeroes: { set: $offenseHeroes }
				defenseStrats: $defenseStrats
				defenseHeroes: { set: $defenseHeroes }
				# subMap: $subMap
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
const GET_STRATEGIES_QUERY = gql`
	query GET_STRATEGIES_QUERY($userName: String!, $mapName: OwMap!) {
		owStrategies(where: { AND: [{ creatorName: { name: $userName } }, { mapName: $mapName }] }) {
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

class StratEdit extends Component {
	state = {
		mapName: '',
		defenseStrats: '',
		defenseHeroes: [],
		offenseStrats: '',
		offenseHeroes: [],
		mapMode: '',
		strategyName: '',
		expectedRank: '', //TODO: might give an error later
		subMap: this.props.subMap || '',
		creatorName: this.props.me.name || this.props.username || ''
	}

	componentWillMount = () => {
		this.setState({
			mapName: OwMapToEnum(this.props.mapName)
		})
	}
	componentDidMount = () => {
		console.log('mounted stratEdit.js')

		this.setState({
			mapMode: OwMapToEnum(OwMapTypes[this.props.mapName])
		})
	}

	handleChange = e => {
		const {
			name,
			type,
			value,
			dataset: { index }
		} = e.target

		const val = type === 'number' ? parseFloat(value) : value
		this.setState({ [name]: val })
	}

	handleSelectChange = e => {
		const {
			name,
			type,
			value,
			dataset: { index }
		} = e.target
		if (type === 'select-one') {
			let val = [...this.state[name]]
			// console.log(val)
			val[index] = value
			this.setState({ [name]: val })
		}
	}

	updateMD = (isDefense, md) => {
		console.log(isDefense, md)
		if (isDefense) {
			this.setState({ defenseStrats: md })
		} else {
			this.setState({ offenseStrats: md })
		}
	}

	render() {
		const { mapName, userName } = this.props
		const mapType = OwMapTypes[mapName]
		return (
			<User>
				{({ data: { me } }) => {
					// console.log({ me })
					if (!me) {
						return (
							<div>
								<h3>Please sign in or sign up first</h3>
								<Signup />
							</div>
						)
					} else {
						return (
							<Query query={GET_STRATEGIES_QUERY} variables={{ userName, mapName: OwMapToEnum(mapName) }}>
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
										<Mutation mutation={CREATE_OW_STRATEGY_MUTATION} variables={this.state}>
											{(createOwStrategy, { loading, error }) => <></>}
										</Mutation>
									)
								}}
							</Query>
						)
					}
				}}
			</User>
		)
	}
}

export default StratEdit
