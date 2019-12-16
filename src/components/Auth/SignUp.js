import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useFirebase, useFirestore } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button'

import { FormWrapper, StyledForm } from '../../styledComponents/Form/Form'
import Heading from '../../styledComponents/Headings'
import Input from '../../styledComponents/Form/Input'
import Button from '../../styledComponents/Form/Button'
import Message from '../../styledComponents/Form/Message'
import HelpSection from '../../styledComponents/Form/HelpSection'
// import GoogleCustomButton from '../../styledComponents/Form/GoogleButton'

const SignUpSchema = Yup.object().shape({
	firstName: Yup.string()
		.required('Your first name is required.')
		.min(3, 'Too short.')
		.max(25, 'Too long.'),
	lastName: Yup.string()
		.required('Your last name is required.')
		.min(3, 'Too short.')
		.max(25, 'Too long.'),
	email: Yup.string()
		.email('Invalid email.')
		.required('The email is required.'),
	password: Yup.string()
		.required('The passoword is required.')
		.min(8, 'The password needed to be at least 8 characters'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], `Password doesn't match`)
		.required('You need to confirm your password.')
})

const SignUp = () => {
	const firebase = useFirebase()
	const firestore = useFirestore()
	let error

	const signUpWithFirebase = async (values, setSubmitting) => {
		try {
			const user = await firebase
				.auth()
				.createUserWithEmailAndPassword(values.email, values.password)
			await firestore.set(
				{ collection: 'users', doc: user.user.uid },
				{
					firstName: values.firstName,
					lastName: values.lastName
				}
			)
		} catch (e) {
			error = e
			setSubmitting(false)
		}
	}

	// const signUpWithGoogle = async () => {
	// 	try {
	// 		const user = await firebase.login({
	// 			provider: 'google',
	// 			type: 'popup'
	// 		})
	// 		console.log(user)
	// 	} catch (e) {
	// 		error = e
	// 	}
	// }

	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: ''
			}}
			validationSchema={SignUpSchema}
			onSubmit={(values, { setSubmitting }) => {
				signUpWithFirebase(values, setSubmitting)
			}}
		>
			{({ isSubmitting, isValid }) => (
				<FormWrapper>
					<Heading size='h1' color='white'>
						Sign up for an account
					</Heading>
					<Heading bold size='h4' color='white'>
						Fill in your details to register your new account
					</Heading>
					<StyledForm>
						<Field
							type='text'
							name='firstName'
							placeholder='Your first name...'
							component={Input}
						/>
						<Field
							type='text'
							name='lastName'
							placeholder='Your last name...'
							component={Input}
						/>
						<Field
							type='email'
							name='email'
							placeholder='Your email...'
							component={Input}
						/>
						<Field
							type='password'
							name='password'
							placeholder='Your password...'
							component={Input}
						/>
						<Field
							type='password'
							name='confirmPassword'
							placeholder='Re-type your password...'
							component={Input}
						/>
						<Button
							disabled={!isValid || isSubmitting}
							loading={isSubmitting ? 'Signing Up...' : null}
							type='submit'
						>
							Sign up
						</Button>
						<Message error show={error}>
							{error ? error.message : null}
						</Message>
					</StyledForm>
					{/* <GoogleCustomButton

					// onClick={signUpWithGoogle}
					>
						Sign up with google
					</GoogleCustomButton> */}
					<HelpSection show={error} error={error ? error.code : null} />
				</FormWrapper>
			)}
		</Formik>
	)
}

export default SignUp
