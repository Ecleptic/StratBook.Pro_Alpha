import { Query } from 'react-apollo'
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

import {
	OwHeroes,
	OwMaps,
	OwControlMapsData,
	OwMapTypes,
	OwMapToEnum
} from '../../configs/Overwatch/OwData'

/**
 * Steps for strat edit.
 * 1. Figure out what type of map this is
 * 2. Show different data for each map
 *  * Different edit view component for each type. *
 *   - Control - Should show all 3 map types
 *   - Assault - A & B Attack & Defend
 *   - Payload - A, B & C Attack & Defend
 */
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
					console.log({ me })
					if (!me) {
						return (
							<div>
								<h3>Please sign in or sign up first</h3>
								<Signup />
							</div>
						)
					} else {
						// if(me)
						return (
							<Query
								query={GET_STRATEGIES_QUERY}
								variables={{
									userName: me.name,
									mapName: OwMapToEnum(mapName)
								}}
							>
								{({ data, loading, error, userName }) => {
									if (loading) return 'Loading'
									if (error)
										return <p>Errors: {`${error}`}</p>
									if (data.owStrategies.length < 1)
										return <p>No Data</p>

									const {
										id,
										mapName,
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
										<Mutation
											mutation={
												CREATE_OW_STRATEGY_MUTATION
											}
											variables={this.state}
										>
											{(
												createOwStrategy,
												{ loading, error }
											) => (
												// 	<form
												// 		data-test="form"
												// 		onSubmit={async e => {
												// 			// 1. Stop the form from submitting
												// 			e.preventDefault()
												// 			console.log(
												// 				'SUBMITTING FORM:',
												// 				this.state
												// 			)
												// 			// 2. call the mutation
												// 			try {
												// 				const res = await createOwStrategy().then(
												// 					response => {
												// 						console.log(
												// 							response
												// 						)
												// 					}
												// 				)
												// 				console.log(
												// 					'SUCCESS',
												// 					res
												// 				)
												// 			} catch (error) {
												// 				console.error(
												// 					'dang it broke:',
												// 					error
												// 				)
												// 			}
												// 			// 3. change the page the view
												// 		}}
												// 	>
												// 		<Error error={error} />
												// 		<fieldset
												// 			disabled={loading}
												// 			aria-busy={loading}
												// 		>
												// 			<label htmlFor="creatorName">
												// 				creatorName
												// 				<br />
												// 				<textarea
												// 					id="creatorName"
												// 					name="creatorName"
												// 					placeholder="Enter a creator Name"
												// 					required
												// 					value={
												// 						this.state
												// 							.creatorName
												// 					}
												// 					onChange={
												// 						this
												// 							.handleChange
												// 					}
												// 				/>
												// 			</label>
												// 			<br />
												// 			<label htmlFor="strategyName">
												// 				Strategy Name
												// 				{/* <br /> */}
												// 				<input
												// 					id="strategyName"
												// 					name="strategyName"
												// 					placeholder="Name your Strategy"
												// 					required
												// 					type="text"
												// 					value={
												// 						this.state
												// 							.strategyName
												// 					}
												// 					onChange={
												// 						this
												// 							.handleChange
												// 					}
												// 				/>
												// 			</label>
												// 			<br />
												// 			{/*TODO: we probably want react-select for images https://jedwatson.github.io/react-select/
												// https://github.com/JedWatson/react-select/issues/2553*/}
												// 			<label htmlFor="ExpectedRankSelect">
												// 				<select
												// 					name="expectedRank"
												// 					id="expectedRankSelect"
												// 					onChange={
												// 						this
												// 							.handleChange
												// 					}
												// 				>
												// 					<option />
												// 					{[
												// 						'Bronze',
												// 						'Silver',
												// 						'Gold',
												// 						'Platinum',
												// 						'Diamond',
												// 						'Master',
												// 						'Grand Master',
												// 						'Top 500'
												// 					].map(rank => (
												// 						<option
												// 							key={
												// 								rank
												// 							}
												// 						>
												// 							{rank}
												// 						</option>
												// 					))}
												// 				</select>
												// 			</label>

												// 			<br />

												// 			<label htmlFor="offenseHeroes">
												// 				offenseHeroes
												// 				<ul>
												// 					{[
												// 						0,
												// 						1,
												// 						2,
												// 						3,
												// 						4,
												// 						5
												// 					].map(index => {
												// 						return (
												// 							<li
												// 								key={
												// 									index
												// 								}
												// 							>
												// 								<select
												// 									name={`offenseHeroes`}
												// 									id={`offenseHeroes${index}`}
												// 									data-index={
												// 										index
												// 									}
												// 									// selected={index}
												// 									onChange={
												// 										this
												// 											.handleSelectChange
												// 									}
												// 								>
												// 									<option />
												// 									{OwHeroes.map(
												// 										hero => (
												// 											<option
												// 												key={
												// 													hero
												// 												}
												// 											>
												// 												{
												// 													hero
												// 												}
												// 											</option>
												// 										)
												// 									)}
												// 								</select>
												// 							</li>
												// 						)
												// 					})}
												// 				</ul>
												// 			</label>
												// 			<DraftEditor
												// 				updateMD={
												// 					this.updateMD
												// 				}
												// 				isDefense={false}
												// 			/>
												// 			{/*
												// <TextEditor
												//     updateMD={this.updateMD}
												//     isDefense={false}
												// /> */}

												// 			<label htmlFor="defenseHeroes">
												// 				defenseHeroes
												// 				<ul>
												// 					{[
												// 						0,
												// 						1,
												// 						2,
												// 						3,
												// 						4,
												// 						5
												// 					].map(index => {
												// 						return (
												// 							<li
												// 								key={
												// 									index
												// 								}
												// 							>
												// 								<select
												// 									name={`defenseHeroes`}
												// 									id={`defenseHeroes${index}`}
												// 									data-index={
												// 										index
												// 									}
												// 									onChange={
												// 										this
												// 											.handleSelectChange
												// 									}
												// 									// selected={index}
												// 								>
												// 									<option />
												// 									{OwHeroes.map(
												// 										hero => (
												// 											<option
												// 												key={
												// 													hero
												// 												}
												// 											>
												// 												{
												// 													hero
												// 												}
												// 											</option>
												// 										)
												// 									)}
												// 								</select>
												// 							</li>
												// 						)
												// 					})}
												// 				</ul>
												// 			</label>

												// 			{/* <TextEditor
												//     updateMD={this.updateMD}
												//     isDefense={true}
												// /> */}
												// 			<DraftEditor
												// 				updateMD={
												// 					this.updateMD
												// 				}
												// 				isDefense={true}
												// 			/>

												// 			<button type="submit">
												// 				Submit
												// 			</button>
												// 		</fieldset>
												// 	</form>
												<div>hi</div>
											)}
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
