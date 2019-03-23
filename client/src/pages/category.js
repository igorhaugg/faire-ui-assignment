import React, { Component } from 'react'
import axios from 'axios'
import { css } from 'emotion'

import Layout from '../components/layout'
import Loading from '../components/loading'
import ProductList from '../components/product-list'

class Home extends Component {
	state = {
		products : [],
		title    : 'All markers',
		loading  : false,
		error    : null
	}
	componentDidMount() {
		document.title = 'Faire - Markers'
		const url = this.props.match.params.category || ''
		this.postMarkers(url)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.category !== nextProps.match.params.category) {
			const url = nextProps.match.params.category || ''
			return this.postMarkers(url)
		}
	}
	postMarkers = async (url = '') => {
		this.setState({ loading: true, title: url ? url : this.state.title })
		try {
			let category
			if (url) {
				category = {
					category : url
				}
			} else {
				category = {
					category : 'New'
				}
			}
			const response = await axios.post(
				'http://localhost:4242/api/search/makers-with-filters',
				category
			)
			const { data } = response
			const products = data.brands
			this.setState({ products, loading: false })
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
						<h2 className={home__title}>{title}</h2>
						{products && <ProductList products={products} />}
					</div>
				)}
			</Layout>
		)
	}
}

const home__title = css`
	color: #000000;
	font-size: 24px;
	font-weight: normal;
	padding-left: 20px;
`

export default Home
