const express = require('express')
const proxy = require('http-proxy-middleware')
const cors = require('cors')

const app = express()
app.use(cors({ credentials: true, origin: true }))

app.use(
	'/api',
	proxy({ target: 'https://www.faire.com', secure: false, changeOrigin: true })
)

app.listen(4242, err => {
	if (err) {
		console.error(err)
		return
	}
	console.log(`Listening at http://localhost:4242/api`)
})
