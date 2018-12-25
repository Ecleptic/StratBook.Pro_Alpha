import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from './ErrorMessage'

export const CREATE_USER_MUTATION = gql`
    mutation CREATE_USER_MUTATION($username: String!, $password: String!) {
        createUser(data: { name: $username, password: $password }) {
            id
        }
    }
`

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    handleChange = e => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: val })
    }

    render() {
        return (
            <Mutation mutation={CREATE_USER_MUTATION} variables={this.state}>
                {(createUser, { loading, error }) => (
                    <form
                        data-test="form"
                        onSubmit={async e => {
                            // 1. Stop the form from submitting
                            e.preventDefault()
                            console.log('SUBMITTING FORM:', this.state)
                            // 2. call the mutation
                            const res = await createUser()
                            // 3. change the page the view
                            console.log(res)
                        }}
                    >
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="username">
                                username
                                {/* <br /> */}
                                <textarea
                                    id="username"
                                    name="username"
                                    placeholder="Enter a username"
                                    required
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor="password">
                                password
                                {/* <br /> */}
                                <textarea
                                    id="password"
                                    name="password"
                                    placeholder="Enter a password"
                                    required
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </label>
                        </fieldset>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default Login
