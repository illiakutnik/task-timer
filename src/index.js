import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {
	ReactReduxFirebaseProvider,
	firebaseReducer,
	getFirebase
} from 'react-redux-firebase'
import {
	createFirestoreInstance,
	firestoreReducer,
	getFirestore
} from 'redux-firestore'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from './utils/theme'
import GlobalStyles from './utils/global'
import App from './App'

const fbConfig = {
	apiKey: 'AIzaSyBnXwyr1B79k-8Qw5b-pe0Bi-03uogMyTc',
	authDomain: 'tasktimer-9bca8.firebaseapp.com',
	databaseURL: 'https://tasktimer-9bca8.firebaseio.com',
	projectId: 'tasktimer-9bca8',
	storageBucket: 'tasktimer-9bca8.appspot.com',
	messagingSenderId: '915251427166',
	appId: '1:915251427166:web:7ed2bda682e42c19aa41cf'
}

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
}

firebase.initializeApp(fbConfig)
firebase.firestore()

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const initialState = {}
const store = createStore(
	rootReducer,
	// initialState,
	composeEnhancers(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
	)
)

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance
}

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<>
						<App />
						<GlobalStyles />
					</>
				</ThemeProvider>
			</BrowserRouter>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
)
