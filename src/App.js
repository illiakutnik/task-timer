import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

import Layout from './components/Layout/Layout'
import SignUp from './components/Auth/SignUp'
import Main from './components/Main/Main'
import LogIn from './components/Auth/LogIn'
import LogOut from './components/Auth/LogOut'
import Loader from './styledComponents/Loader'
import Profile from './components/Auth/Profile'
import Recovery from './components/Auth/Recovery'

function App() {
	const auth = useSelector(state => state.firebase.auth)
	if (!isLoaded(auth)) {
		return <Loader />
	} else if (isEmpty(auth)) {
		return (
			<Layout>
				<Switch>
					<Route exact path='/signup' component={SignUp} />
					<Route exact path='/login' component={LogIn} />
					<Route exact path='/recovery' component={Recovery} />
					<Redirect to='/login' />
				</Switch>
			</Layout>
		)
	} else {
		return (
			<Layout>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/logout' component={LogOut} />
					<Redirect to='/' />
				</Switch>
			</Layout>
		)
	}
}

export default App
