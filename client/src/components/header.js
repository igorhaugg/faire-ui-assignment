import React from 'react'
import { css } from 'emotion'

const Header = () => <header className={header}>Faire</header>

const header = css`
	align-items: center;
	background-color: #231919;
	color: #eaeaea;
	display: flex;
	font-size: 20px;
	height: 75px;
	letter-spacing: 5px;
	padding: 0 25px;
	text-transform: uppercase;
`

export default Header
