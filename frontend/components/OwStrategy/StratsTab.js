import PropTypes from 'prop-types'
import React from 'react'

const StratsTab = ({ strats, setActiveStrat }) => {
    return (
        <div>
            <h1>strats</h1>
            <ul>
                {strats.map((strat, index) => {
                    return (
                        <li key={strat.id}>
                            <button
                                onClick={() => {
                                    setActiveStrat(strat.id)
                                }}
                            >
                                {index + 1}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default StratsTab

StratsTab.propTypes = {
    strats: PropTypes.array,
    setActiveStrat: PropTypes.func
}
