const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const responseTime = require('response-time')
const axios = require('axios')
const redis = require('redis')

const app = express()
const client = redis.createClient()

app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(responseTime())

const getMarkers = async (req, res) => {
	const category = req.body
	const url = 'https://www.faire.com/api/search/makers-with-filters'
	try {
		const response = await axios.post(url, category)
		const data = response.data
		client.setex(category.category, 3600, JSON.stringify(data))
		return res.json(data)
	} catch (e) {
		return res.send(e)
	}
}

const getCategories = async (req, res) => {
	const url = 'https://www.faire.com/api/category/new'
	try {
		const response = await axios.get(url)
		const data = response.data
		client.setex('categoriesList', 3600, JSON.stringify(data))
		return res.json(data)
	} catch (e) {
		return res.send(e)
	}
}

const getSingleBrand = async (req, res) => {
	const { token } = req.params
	const url = `https://www.faire.com/api/brand/${token}/products`
	try {
		const response = await axios.get(url)
		const data = response.data
		client.setex(token, 3600, JSON.stringify(data))
		return res.json(data)
	} catch (e) {
		return res.send(e)
	}
}

const getMarkersCache = (req, res) => {
	const category = req.body
	client.get(category.category, (err, result) => {
		if (result) {
			res.send(result)
		} else {
			getMarkers(req, res)
		}
	})
}

const getCategoryCache = (req, res) => {
	client.get('categoriesList', (err, result) => {
		if (result) {
			res.send(result)
		} else {
			getCategories(req, res)
		}
	})
}

const getSingleBrandCache = (req, res) => {
	const { token } = req.params
	client.get(token, (err, result) => {
		if (result) {
			res.send(result)
		} else {
			getSingleBrand(req, res)
		}
	})
}

app.use('/api/search/makers-with-filters', getMarkersCache)
app.use('/api/category/new', getCategoryCache)
app.use('/api/brand/:token/products', getSingleBrandCache)

app.listen(4242, err => {
	if (err) {
		console.error(err)
		return
	}
	console.log(`Listening at http://localhost:4242/api`)
})
