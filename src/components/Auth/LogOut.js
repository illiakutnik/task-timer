import { useEffect } from 'react'
import { useFirebase } from 'react-redux-firebase'

const LogOut = () => {
	const firebase = useFirebase()
	useEffect(
		() => {
			try {
				localStorage.removeItem('ongoingTask')
				firebase.auth().signOut()
			} catch (err) {
				alert(err.message)
			}
		},
		[firebase]
	)
	return null
}

export default LogOut
