import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

// import HeroImage from './HeroImage'
import { OwHeroes } from '../../configs/Overwatch/OwData'



const StratView = props => (
	<Query {...props} query={GET_STRATEGIES_QUERY}>
		{payload => props.children(payload)}
	</Query>
)

StratView.propTypes = {}

export default StratView
export { GET_STRATEGIES_QUERY }
