// const ReactMarkdown = require('react-markdown')
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Router, { withRouter } from 'next/router'

// import GetStrategyQuery from './GetStrategyQuery'
// import HeroImage from './HeroImage'
import { OwHeroes, OwUrlToMap } from '../../configs/Overwatch/OwData'

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
        const { mapName, userName } = this.props
        return (
            <Query
                query={GET_STRATEGIES_QUERY}
                variables={{ userName, mapName }}
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
                            {/* {!userName && (
                        <label htmlFor="creatorName">
                            creatorName
                            <textarea
                                id="creatorName"
                                name="creatorName"
                                placeholder="Enter a creator Name"
                                required
                                // value={this.state.creatorName}
                                // onChange={this.handleChange}
                            />
                        </label>
                    )} */}
                            <h2>{mapName}</h2>
                            {expectedRank && <h3>Rank: {expectedRank}</h3>}
                            <p>
                                {subMap}, {mapMode}
                            </p>
                            <p>{`${creatorName.name}'s`}</p>
                            <h3>{strategyName}</h3>
                            <ul>
                                {offenseHeroes.map(hero => (
                                    <li key={hero}>{hero}</li>
                                ))}
                            </ul>
                            {/* <ReactMarkdown source={offenseStrats} /> */}
                        </>
                    )
                }}
            </Query>
        )
    }
}

export default StratView
