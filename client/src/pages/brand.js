import React, { Component } from 'react'
import axios from 'axios'
import { css } from 'emotion'

import Layout from '../components/layout'
import Loading from '../components/loading'
import ProductList from '../components/product-list'

class Brand extends Component {
	state = {
		products : [],
		title    : '',
		loading  : false,
		error    : null
	}
	componentDidMount() {
		document.title = 'Faire - Brands'
		const brand = this.props.match.params.brand
		this.getBrands(brand)
	}
	getBrands = async (brand = '') => {
		this.setState({ loading: true })
		try {
			const response = await axios.get(
				`http://localhost:4242/api/brand/${brand}/products`
			)
			const { data } = response
			const title = data[0].categories.join(' & ')
			this.setState({ products: data, loading: false, title })
		} catch (error) {
			this.setState({ error: error, loading: false })
		}
	}
	render() {
		const { products, loading, title } = this.state
		return (
			<Layout>
				{loading ? (
					<Loading />
				) : (
					<div>
						<h2 className={brand__title}>Categories: {title}</h2>
						{products && <ProductList products={products} brand={true} />}
					</div>
				)}
			</Layout>
		)
	}
}

const brand__title = css`
	color: #000000;
	font-size: 24px;
	font-weight: normal;
	padding-left: 20px;
`

export default Brand
