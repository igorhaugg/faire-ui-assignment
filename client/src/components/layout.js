import React, { Fragment } from 'react'
import { css } from 'emotion'

import Header from './header'
import Menu from './menu'

const Layout = props => (
	<Fragment>
		<Header />
		<main className={main}>
			<Menu />
			<div className={main__area}>{props.children}</div>
		</main>
	</Fragment>
)

const main = css`
	display: flex;
	flex-direction: column;
	width: 100%;
	@media (min-width: 650px) {
		flex-direction: row;
	}
`
const main__area = css`width: 100%;`

export default Layout
