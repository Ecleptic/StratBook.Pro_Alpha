import React, { Component } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Header from './Header'
import Meta from './Meta'

const theme = {
	black: '#393939',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
	darkgrey: '#242424',
	grey: '#3A3A3A',
	white: '#ffffff',
	lightgrey: '#E1E1E1',
	maxWidth: '1000px',
	offWhite: '#EDEDED',
	red: '#FF0000',
	borderColor: '#E1E1E1'
}
// style = {{ background: 'rgb(36, 36, 36)', color: '#ffffff' }}

const StyledPage = styled.div`
	background: ${theme.darkgrey};
	color: ${theme.lightgrey};
`

const Inner = styled.div`
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;
	padding: 2rem;
`

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.5;
    font-family: 'radnika_next';
	background: ${theme.darkgrey};
    /* height: 100vh; */
  }
  a {
    text-decoration: none;
    color: ${theme.lightgrey};
  }
`

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<Inner>{this.props.children}</Inner>
				</StyledPage>
			</ThemeProvider>
		)
	}
}

export default Page
