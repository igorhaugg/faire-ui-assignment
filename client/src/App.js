import React, { Component } from 'react'
import Loadable from 'react-loadable'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Loading = () => <div className=''>Loading...</div>

const HomePage = Loadable({
	loader  : () => import('./pages/category'),
	loading : () => <Loading />
})

const BrandPage = Loadable({
	loader  : () => import('./pages/brand'),
	loading : () => <Loading />
})

// const Loading = () => (
//   <div className="full-centralize full-screen">
//     <Spinner />
//   </div>
// );

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/category/:category' component={HomePage} />
					<Route exact path='/brand/:brand' component={BrandPage} />
					<Route path='*' component={HomePage} />
				</Switch>
			</Router>
		)
	}
}

export default App
