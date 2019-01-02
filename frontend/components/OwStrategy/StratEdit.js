import React, { Component } from 'react'
// import marked from 'marked'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../ErrorMessage'
import Form from '../WYSIWYG/Form'

import TextEditor from './textEditor'

import {
    OwHeroes,
    OwMaps,
    OwControlMapsData,
    OwMapTypes,
    OwMapToEnum
} from '../../configs/Overwatch/OwData'

const CREATE_OW_STRATEGY_MUTATION = gql`
    mutation CREATE_OW_STRATEGY_MUTATION(
        $mapName: OwMap!
        $mapMode: OwMapMode!
        $offenseStrats: String!
        $offenseHeroes: [OwHero!]!
        $creatorName: String!
        $strategyName: String! # $subMap: OwControlSubMap
    ) {
        createOwStrategy(
            data: {
                mapName: $mapName
                mapMode: $mapMode
                offenseStrats: $offenseStrats
                strategyName: $strategyName
                creatorName: { connect: { name: $creatorName } }
                offenseHeroes: { set: $offenseHeroes }
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

class StratEdit extends Component {
    state = {
        mapName: this.props.mapName || '',
        defenseStrats:
            '"# Counter Dive\n1. Winston dives first, targets the primary squish support first (zen, ana, etc.)\n2. DVA follows closely behind and matrixes the winston on dive.\n3. Genji Dives with the tanks.\n4. Lucio might follow...\n5. Sombra, Ana, & Lucio deal with the counterdive.\n  1. Kill the main diver (probably winston)\n  2. Follow up with the rest of the counter dive.\n6. **WIN**\n',
        defenseHeroes: [
            'Zenyatta',
            'Mei',
            'Reinhardt',
            'Ana',
            'Dva',
            'Widowmaker'
        ],
        offenseStrats:
            '"# Counter Dive\n1. Winston dives first, targets the primary squish support first (zen, ana, etc.)\n2. DVA follows closely behind and matrixes the winston on dive.\n3. Genji Dives with the tanks.\n4. Lucio might follow...\n5. Sombra, Ana, & Lucio deal with the counterdive.\n  1. Kill the main diver (probably winston)\n  2. Follow up with the rest of the counter dive.\n6. **WIN**\n',
        offenseHeroes: [
            'Zenyatta',
            'Mei',
            'Reinhardt',
            'Ana',
            'Dva',
            'Widowmaker'
        ],
        mapMode: '',
        strategyName: 'Divess',
        expectedRank: '', //TODO: might give an error later
        // subMap: this.props.subMap || '',
        creatorName: 'ecleptic'
    }

    componentDidMount = () => {
        this.setState({ mapMode: OwMapToEnum(OwMapTypes[this.state.mapName]) })
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
            <Mutation
                mutation={CREATE_OW_STRATEGY_MUTATION}
                variables={this.state}
            >
                {(createOwStrategy, { loading, error }) => (
                    <form
                        data-test="form"
                        onSubmit={async e => {
                            // 1. Stop the form from submitting
                            e.preventDefault()
                            console.log('SUBMITTING FORM:', this.state)
                            // 2. call the mutation
                            try {
                                const res = await createOwStrategy().then(
                                    response => {
                                        console.log(response)
                                    }
                                )
                                console.log('SUCCESS', res)
                            } catch (error) {
                                console.error('dang it broke:', error)
                            }
                            // 3. change the page the view
                        }}
                    >
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="creatorName">
                                creatorName
                                <br />
                                <textarea
                                    id="creatorName"
                                    name="creatorName"
                                    placeholder="Enter a creator Name"
                                    required
                                    value={this.state.creatorName}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <br />
                            <label htmlFor="strategyName">
                                Strategy Name
                                {/* <br /> */}
                                <input
                                    id="strategyName"
                                    name="strategyName"
                                    placeholder="Name your Strategy"
                                    required
                                    type="text"
                                    value={this.state.strategyName}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <br />
                            <label htmlFor="ExpectedRankSelect">
                                <select
                                    name="expectedRankSelect"
                                    id="expectedRankSelect"
                                    onChange={this.handleChange}
                                >
                                    <option />
                                    {[
                                        'Bronze',
                                        'Silver',
                                        'Gold',
                                        'Platinum',
                                        'Diamond',
                                        'Master',
                                        'Grand Master',
                                        'Top 500'
                                    ].map(rank => (
                                        <option key={rank}>{rank}</option>
                                    ))}
                                </select>
                            </label>

                            <br />

                            <label htmlFor="offenseHeroes">
                                offenseHeroes
                                <ul>
                                    {[0, 1, 2, 3, 4, 5].map(index => {
                                        return (
                                            <li key={index}>
                                                <select
                                                    name={`offenseHeroes`}
                                                    id={`offenseHeroes${index}`}
                                                    data-index={index}
                                                    // selected={index}
                                                    onChange={
                                                        this.handleSelectChange
                                                    }
                                                >
                                                    <option />
                                                    {OwHeroes.map(hero => (
                                                        <option key={hero}>
                                                            {hero}
                                                        </option>
                                                    ))}
                                                </select>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </label>

                            <TextEditor updateMD={this.updateMD} isDefense={false}/>

                            <label htmlFor="defenseHeroes">
                                defenseHeroes
                                <ul>
                                    {[0, 1, 2, 3, 4, 5].map(index => {
                                        return (
                                            <li key={index}>
                                                <select
                                                    name={`defenseHeroes`}
                                                    id={`defenseHeroes${index}`}
                                                    data-index={index}
                                                    onChange={
                                                        this.handleSelectChange
                                                    }
                                                    // selected={index}
                                                >
                                                    <option />
                                                    {OwHeroes.map(hero => (
                                                        <option key={hero}>
                                                            {hero}
                                                        </option>
                                                    ))}
                                                </select>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </label>

                            <TextEditor updateMD={this.updateMD} isDefense={true}/>

                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default StratEdit
