import React, { Component } from 'react'
import axios from 'axios'
import { css } from 'emotion'
import { NavLink } from 'react-router-dom'

class Menu extends Component {
	state = {
		featuredItem : [],
		productBased : []
	}
	componentDidMount() {
		this.getCategories()
	}
	getCategories = async () => {
		try {
			const response = await axios.get('http://localhost:4242/api/category/new')
			const { data } = response
			const featuredItem = data
				.filter(item => item.is_featured)
				.filter(item => item.name !== 'All Products')
				.sort((a, b) => (a.name > b.name ? 1 : -1))
			const productBased = data
				.filter(item => item.is_product_based)
				.sort((a, b) => (a.name > b.name ? 1 : -1))
			this.setState({ featuredItem, productBased })
		} catch (error) {
			console.warn(error)
		}
	}
	render() {
		const { featuredItem, productBased } = this.state
		return (
			<aside className={menu__bar}>
				{featuredItem &&
					featuredItem.map(item => (
						<NavLink
							to={`/category/${item.name}`}
							key={item.name}
							className={menu__item}
							activeClassName={menu__active}>
							{item.name}
						</NavLink>
					))}
				<div className={menu__divider} />
				<NavLink
					to={`/`}
					exact
					className={menu__item}
					activeClassName={menu__active}>
					All Markers
				</NavLink>
				<div className={menu__divider} />
				{productBased &&
					productBased.map(item => (
						<NavLink
							to={`/category/${item.name}`}
							key={item.name}
							className={menu__item}
							activeClassName={menu__active}>
							{item.name}
						</NavLink>
					))}
			</aside>
		)
	}
}

const menu__bar = css`
	border-right: 1px solid #eaeaea;
	display: flex;
	flex-direction: column;
	padding-top: 10px;
	width: 100%;
	@media (min-width: 650px) {
		width: 200px;
	}
	@media (min-width: 900px) {
		min-height: calc(100vh - 75px);
		width: 300px;
	}
`
const menu__item = css`
	color: #5a5656;
	cursor: pointer;
	display: block;
	font-size: 15px;
	padding: 12px 25px;
	text-decoration: none;
	transition: background-color 200ms linear;
	&:hover {
		background-color: #f5f5f5;
	}
`
const menu__divider = css`
	background-color: #eaeaea;
	height: 1px;
	margin: 10px;
`
const menu__active = css`
	color: #000000;
	font-weight: bold;
`

export default Menu
