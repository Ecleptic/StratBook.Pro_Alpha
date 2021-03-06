import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

import Page from '../components/Page'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        // Crawling through all pages to see if we need to run Queries/Mutations before the first render happens and expose it as props
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        // This exposes the query to the user
        pageProps.query = ctx.query
        return { pageProps }
    }
    render() {
        const { Component, apollo, pageProps } = this.props

        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(MyApp)
