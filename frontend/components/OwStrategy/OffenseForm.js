import React from 'react'

const OffenseForm = () => {
  return (
    // Have a form and a view for offense and defense.
    // will probably need to customize and create our own dropdown with images... maybe not, we'll see.
        <h3>Team Comps</h3>
        <ul>
            {this.state.isEditing
                ? this.state.position.map(role => {
                    return (
                        <li key={role}>
                            <label htmlFor={role}>
                                {role}
                                <select
                                    name={role}
                                    id={role}
                                    value={
                                        this.state.OffenseRoles[role]
                                    }
                                    onChange={event => {
                                        const newRoles = this.state
                                            .OffenseRoles
                                        const newRole =
                                            event.target.value
                                        newRoles[role] = newRole
                                        this.setState({
                                            OffenseRoles: newRoles
                                        })
                                    }}
                                >
                                    {this.state.heroes.map(
                                        (hero, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={hero}
                                                >
                                                    {hero}
                                                </option>
                                            )
                                        }
                                    )}
                                </select>
                            </label>
                        </li>
                    )
                })
                : this.state.position.map(role => {
                    return (
                        <li key={role}>
                            <span>
                                {this.state.OffenseRoles[role] &&
                                    role}
                                {this.state.OffenseRoles[role] &&
                                    ": "}
                                {this.state.OffenseRoles[role] &&
                                    this.state.OffenseRoles[role]}
                            </span>
                            {/* <img src={heroImages.AnaIcon} alt=""/> */}
                        </li>
                    )
                })}
        </ul>
        <h3>Strats</h3>
                {
        this.state.isEditing ? (
            <textarea
                cols="30"
                rows="10"
                value={this.state.OffenseStrats}
                onChange={event => {
                    this.setState({ OffenseStrats: event.target.value })
                }}
            />
        ) : (
            <p>{this.state.OffenseStrats}</p>
        )
    }
  )
}

export default OffenseForm
