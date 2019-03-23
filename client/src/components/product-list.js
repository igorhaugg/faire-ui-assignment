import React, { Component, Fragment } from 'react'
import { css } from 'emotion'
import { Link } from 'react-router-dom'

import Pagination from './pagination'

class ProductList extends Component {
	state = {
		page : 1
	}
	handleClick = page => {
		this.setState({ page })
		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 2)
	}
	render() {
		const { products, brand = false } = this.props
		const { page } = this.state
		const pageBegin = page === 1 ? 0 : (page - 1) * 9
		const pageEnd = page * 9
		return (
			<Fragment>
				<section className={product}>
					{products.slice(pageBegin, pageEnd).map(product => (
						<Link
							to={`/brand/${product.token}`}
							key={product.token}
							className={product__item}>
							<img
								src={
									product.squared_image ? (
										product.squared_image.url
									) : (
										product.images[0].url
									)
								}
								alt={product.name}
								className={product__image}
							/>
							<h4 className={product__title}>{product.name}</h4>
							{brand ? (
								<span className={product__subtitle}>
									${product.retail_price_cents / 100}
								</span>
							) : (
								<span className={product__subtitle}>
									${product.minimum_order_amount_cents / 100} Minimum
								</span>
							)}
						</Link>
					))}
				</section>
				<Pagination
					page={page}
					products={products}
					handlePagination={this.handleClick}
				/>
			</Fragment>
		)
	}
}

const product = css`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	margin-bottom: 10px;
`

const product__item = css`
	border: 1px solid #eaeaea;
	display: flex;
	flex-direction: column;
	height: auto;
	margin: 10px 0 0 10px;
	text-decoration: none;
	width: 95%;
	@media (min-width: 500px) {
		width: 45%;
	}
	@media (min-width: 900px) {
		width: 30%;
	}
`

const product__image = css`
	height: 75%;
	object-fit: cover;
	width: 100%;
`

const product__title = css`
	color: #000000;
	font-size: 15px;
	font-weight: normal;
	text-align: center;
`

const product__subtitle = css`
	color: rgb(136, 136, 136);
	font-size: 12px;
	font-weight: normal;
	text-align: center;
`

export default ProductList
