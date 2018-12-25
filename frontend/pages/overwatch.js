import MapsList from '../components/OwStrategy/MapsList'
import Strat from '../components/OwStrategy/Strat'
import StratEdit from '../components/OwStrategy/StratEdit'
import { OwUrlToMap, OwIsMap } from '../configs/Overwatch/OwData'
import Router, { withRouter } from 'next/router'

class Overwatch extends React.Component {
    static async getInitialProps({ asPath, req, res, query }) {
        if (query.map && !query.stratNumber) {
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
        return (
            <div>
                {/* <h1>Game: Overwatch</h1> */}
                {url.query.user && <p> User URL: {url.query.user}</p>}
                {url.query.stratNumber && (
                    <p> stratNumber: {url.query.stratNumber}</p>
                )}

                {!url.query.map ? (
                    <MapsList teamName={url.query.user} url={url} />
                ) : (
                    <>
                        {/* <StratEdit
                            mapName={OwUrlToMap(url.query.map)}
                            userName={url.query.user}
                        /> */}
                        <Strat
                            mapName={OwUrlToMap(url.query.map)}
                            userName={url.query.user}
                        />
                    </>
                )}
            </div>
        )
    }
}

export default withRouter(Overwatch)
