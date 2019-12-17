import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useFirebase } from 'react-redux-firebase'

import { FormWrapper, StyledForm } from '../../styledComponents/Form/Form'
import Heading from '../../styledComponents/Headings'
import Input from '../../styledComponents/Form/Input'
import Button from '../../styledComponents/Form/Button'
import Message from '../../styledComponents/Form/Message'
import HelpSection from '../../styledComponents/Form/HelpSection'

const LogInSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email')
		.required('The email is required'),
	password: Yup.string().required('The password is required')
})

const LogIn = () => {
	const firebase = useFirebase()
	let error
	const logInWithFirebase = async (values, setSubmitting) => {
		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(values.email, values.password)
		} catch (e) {
			error = e
			setSubmitting(false)
		}
	}
	return (
		<Formik
			initialValues={{
				email: '',
				password: ''
			}}
			validationSchema={LogInSchema}
			onSubmit={(values, { setSubmitting }) => {
				logInWithFirebase(values, setSubmitting)
			}}
		>
			{({ isSubmitting, isValid }) => (
				<FormWrapper>
					<Heading size="h1" color="white">
						Login in your account
					</Heading>
					<Heading size="h4" bold color="white">
						Fill in your details to login into your account
					</Heading>
					<StyledForm>
						<Field
							type="email"
							name="email"
							placeholder="Your email"
							component={Input}
						/>
						<Field
							type="password"
							name="password"
							placeholder="Your password"
							component={Input}
						/>
						<Button
							disabled={!isValid || isSubmitting}
							loading={isSubmitting ? 'Logging in...' : null}
							type="submit"
						>
							Login
						</Button>
						<Message error show={error}>
							{error ? error.message : null}
						</Message>
					</StyledForm>
					<HelpSection show={error} error={error ? error.code : null} />
				</FormWrapper>
			)}
		</Formik>
	)
}

export default LogIn
