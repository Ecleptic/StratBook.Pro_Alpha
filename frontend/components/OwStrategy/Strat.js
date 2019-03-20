// const ReactMarkdown = require('react-markdown')
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'

import StratEdit from './StratEdit'
import StratView from './StratView'

import GetStrategyQuery from './GetStrategyQuery'
// import HeroImage from './HeroImage'
import { OwHeroes, OwIsMap } from '../../configs/Overwatch/OwData'



class Strat extends Component {
	state = {
		editBool: this.props.editBool || false,
		userName: this.props.userName || '',
		mapName: this.props.mapName || ''
	}

	componentDidMount = () => {
		console.log('Mounted Strat.js')
	}

	handleChange = e => {
		const { name, type, value, checked } = e.target
		const val =
			type === 'number'
				? parseFloat(value)
				: type === 'checkbox'
				? checked
				: value
		// console.log(name, type, value)
		this.setState({ [name]: val })
	}
	render() {
		if (OwIsMap(this.props.mapName)) {
			return (
				<>
                    {this.props.me.name && !this.state.editBool  && (
						<label htmlFor="editBool">
							Edit
							<input
								type="checkbox"
								name="editBool"
								id="editBool"
								value={this.state.editBool}
								onChange={this.handleChange}
							/>
						</label>
					)}
					{/* <ul>
                        <li>
                            Edit Boolean:{' '}
                            {this.state.editBool ? 'True' : 'False'}
                        </li>
                        <li>Username Prop: {this.props.userName}</li>
                        <li>Username Me: {this.props.me.name}</li>
                    </ul> */}

					{this.state.editBool ||
					(!this.props.me && !this.props.userName) ? (
						// TODO: Almost everything should end up here.
						<StratEdit {...this.props} />
					) : (
						<StratView {...this.props} />
					)}
				</>
			)
		} else {
			// TODO: if not a known map, it's  probably a username. maybe have a user profile listing all their games and maps?
			//  NO. I want that to be stratbook.pro/user/{username}
			return <h2>Sorry this map is not a known Overwatch Map</h2>
		}
	}
}

export default Strat
