const ReactMarkdown = require('react-markdown')
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
        editBool: false,
        userName: this.props.userName || '',
        mapName: this.props.mapName || ''
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
                    {this.state.editBool || !this.props.userName ? (
                        <StratEdit {...this.props} />
                    ) : (
                        <StratView {...this.props} />
                    )}
                </>
            )
        } else {
            return <h2>Sorry this map is not a known Overwatch Map</h2>
        }
    }
}

export default Strat
