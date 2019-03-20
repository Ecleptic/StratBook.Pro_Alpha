import MapsList from '../components/OwStrategy/MapsList'
import Strat from '../components/OwStrategy/Strat'
import StratEdit from '../components/OwStrategy/StratEdit'
import { OwUrlToMap, OwIsMap, OwMapToEnum } from '../configs/Overwatch/OwData'
import Router, { withRouter } from 'next/router'
import Signup from '../components/Signup_Portal'
import User from '../components/User'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Error from '../components/ErrorMessage'

const GET_MAP_STRATEGY_QUERY = gql`
    query GET_MAP_STRATEGY_QUERY($userName: String!, $mapName: OwMap!) {
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
            creatorName {
                name
            }
        }
    }
`
class Overwatch extends React.Component {
    static async getInitialProps({ asPath, req, res, query }) {
        if (query.map && !query.stratNumber) {
            // console.log({ asPath })
            // res.redirect(`${asPath}/1`)
        }
        if (asPath[asPath.length - 1] === '/') {
            res.redirect(asPath.slice(0, -1))
        }
        return {}
    }
    constructor(props) {
        super(props)
    }

    render() {
        const url = this.props.router
        const { user, map } = url.query
        return (
            <div>
                {/* <h1>Game: Overwatch</h1> */}
                {/* {url.query.user && <p> User URL: {url.query.user}</p>} */}
                {/* {url.query.stratNumber && (
                    <p> stratNumber: {url.query.stratNumber}</p>
                )} */}

                {!url.query.map ? (
                    <MapsList teamName={url.query.user} url={url} />
                ) : (
                    <User>
                        {({ data: { me } }) => {
                            /* <StratEdit
                             mapName={OwUrlToMap(url.query.map)}
                             userName={url.query.user}
                         /> */

                            if (me) {
                                return (
                                    <Query
                                        query={GET_MAP_STRATEGY_QUERY}
                                        variables={{
                                            userName: me.name,
                                            mapName: OwMapToEnum(
                                                OwUrlToMap(url.query.map)
                                            )
                                        }}
                                    >
                                        {({
                                            data,
                                            loading,
                                            error,
                                            userName
                                        }) => {
                                            if (loading) return 'Loading'
                                            if (error)
                                                return <Error error={error} />

                                            // If user is logged in and they don't have any previous strats, change url to include their username (do we need to change url?) and show edit...
                                            //  TODO: query to show strat...
                                            // if user is logged in and they already have a strat, show strat

                                            // 1. if the user is not logged in and they are not on a username ask them to log in first. Then we'll need to reload page after login. TODO:
                                            // 2.  if the user is not logged in and they are on a username try to show that strat if available
                                            // 3. if logged in and no user
                                            ////// 3.1 check if strat exists
                                            ////// 3.2 show or edit depending on the result.
                                            // 4. if logged in but they're on a username, show that strat.
                                            ////// 4.1 compare usernames, if the same, give an option to edit
                                            if (url.query.user) {
                                                console.log('user in query')
                                                return (
                                                    <Strat
                                                        mapName={OwUrlToMap(
                                                            url.query.map
                                                        )}
                                                        userName={
                                                            url.query.user
                                                        }
                                                    />
                                                )
                                            } else {
                                                console.log('user not in query')
                                                // 3. if logged in and no user
                                                ////// 3.1 check if strat exists
                                                ////// 3.2 show or edit depending on the result.

                                                // no user
                                                if (data.owStrategies.length) {
                                                    console.log(
                                                        'there are strats'
                                                    )
                                                    //there are strats
                                                    return (
                                                        <Strat
                                                            me={me}
                                                            mapName={OwUrlToMap(
                                                                url.query.map
                                                            )}
                                                            userName={
                                                                url.query.user
                                                            }
                                                        />
                                                    )
                                                } else {
                                                    console.log(
                                                        'there are no strats, but we are logged in'
                                                    )
                                                    // return <h3>No Data</h3>
                                                    return (
                                                        <Strat
                                                            editBool={true}
                                                            me={me}
                                                            mapName={OwUrlToMap(
                                                                url.query.map
                                                            )}
                                                            userName={
                                                                url.query.user
                                                            }
                                                        />
                                                    )
                                                }
                                            }
                                        }}
                                    </Query>
                                )
                            } else {
                                // 2.  if the user is not logged in and they are on a username try to show that strat if available
                                if (url.query.user) {
                                    console.log(`On user: ${url.query.user}`)
                                    return (
                                        <div>
                                            <h3>
                                                Should be a strat view for the
                                                user
                                            </h3>
                                            <ul>
                                                <li>
                                                    Map:
                                                    {OwUrlToMap(url.query.map)}
                                                </li>
                                                <li>
                                                    Player: {url.query.user}
                                                </li>
                                            </ul>
                                            <Strat
                                                mapName={OwUrlToMap(
                                                    url.query.map
                                                )}
                                                userName={url.query.user}
                                            />
                                        </div>
                                    )
                                } else {
                                    // 1. if the user is not logged in and they are not on a username ask them to log in first. Then we'll need to reload page after login. TODO:
                                    return (
                                        <div>
                                            <h3>
                                                Please sign in or sign up first
                                            </h3>
                                            <Signup />
                                        </div>
                                    )
                                }
                            }
                        }}
                    </User>
                )}
            </div>
        )
    }
}

export default withRouter(Overwatch)
