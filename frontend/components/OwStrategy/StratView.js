const ReactMarkdown = require('react-markdown')
import { Query } from 'react-apollo'
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
        const {
            mapName,
            userName: propUser,
            me: { name: meUser }
        } = this.props

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
                            <h2>{mapName}</h2>
                            {expectedRank && <h3>Rank: {expectedRank}</h3>}
                            <p>
                                Submap: {subMap}, mapMode{mapMode}
                            </p>
                            <p>{`${creatorName.name}'s`}</p>
                            <h3>{strategyName}</h3>
                            <label htmlFor="offenseHeroesList">
                                offenseHeroes
                                <ul id="offenseHeroesList">
                                    {offenseHeroes.map(hero => (
                                        <li key={hero}>
                                            <HeroImage hero={hero} />
                                        </li>
                                    ))}
                                </ul>
                            </label>
                            <p>
                                OffenseStrats:
                                {/* {offenseStrats} */}
                            </p>
                                <ReactMarkdown source={offenseStrats} />
                            <p>
                                defenseStrats:
                                {/* {defenseStrats} */}
                            </p>
                                <ReactMarkdown source={defenseStrats} />
                            <label htmlFor="defenseHeroesList">
                                defenseHeroes
                                <ul id="defenseHeroesList">
                                    {defenseHeroes.map(hero => (
                                        <li key={hero}>
                                            <HeroImage hero={hero} />
                                        </li>
                                    ))}
                                </ul>
                            </label>
                        </>
                    )
                }}
            </Query>
        )
    }
}

export default StratView
