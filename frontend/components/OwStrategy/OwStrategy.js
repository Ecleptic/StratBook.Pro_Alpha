import React, { Component } from 'react'

import MapsList from './MapsList'
import StratsTab from './StratsTab'
import StratEdit from './StratEdit'
import StratView from './StratView'
// import { getStratByID } from '../../../helpers/graphQueries'

export default class OwStrategy extends Component {
    constructor(props) {
        super(props)
        // Need to setup initial state
        this.state = {
            teamName: this.props.teamName,
            mapName: null,
            strats: [],
            activeStratID: null,
            activeStratInfo: [],
            isEditing: false
        }
    }

    setMapName = mapName => {
        this.setState({ mapName })
    }
    setStrats = strats => {
        this.setState({ strats })
    }
    /**
     * Takes stratID and sets state
     * THEN
     * take strat id get strat from graphcool then
     * take the data and place it into state for use
     */
    setActiveStrat = strat => {
        this.setState({ activeStratID: strat })
        // strat
        //     ? getStratByID(strat)
        //           .then(res => {
        //               this.setState({ activeStratInfo: res.OwStrategy })
        //           })
        //           .catch(error => {
        //               console.log(error)
        //           })
        //     : this.setState({ activeStratInfo: [] })
    }

    render() {
        return (
            <div>
                {this.props.match &&
                    this.props.params &&
                    this.this.props.userId && (
                        <h2>Hello {this.props.match.params.userId}</h2>
                    )}
                {/* Lists the maps  */}
                <MapsList
                    teamName={this.state.teamName}
                    setMapName={this.setMapName}
                    setStrats={this.setStrats}
                    setActiveStrat={this.setActiveStrat}
                />
                {/**
                 * if there are strats, render strats tab
                 * which will show the number of strats as buttons
                 */}
                {this.state.strats.length > 0 && (
                    <StratsTab
                        strats={this.state.strats}
                        setActiveStrat={this.setActiveStrat}
                    />
                )}
                {/**
                 * Temporary button toggles the editing state
                 */}
                <button
                    onClick={() => {
                        this.setState({ isEditing: !this.state.isEditing })
                    }}
                >
                    EDIT
                </button>
                {/**
                 * If not editing and there is an active strat,
                 * view  the strats
                 * if you ARE editing, render editable data instead and
                 */}
                {this.state.activeStratID && this.state.isEditing ? (
                    <StratEdit
                        map={this.state.mapName}
                        activeStratID={this.state.activeStratID}
                        activeStratInfo={this.state.activeStratInfo}
                    />
                ) : (
                    <StratView
                        map={this.state.mapName}
                        activeStratID={this.state.activeStratID}
                        activeStratInfo={this.state.activeStratInfo}
                    />
                )}
            </div>
        )
    }
}
