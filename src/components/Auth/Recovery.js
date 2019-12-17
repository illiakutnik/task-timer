import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useFirebase } from 'react-redux-firebase'

import { FormWrapper, StyledForm } from '../../styledComponents/Form/Form'
import Heading from '../../styledComponents/Headings'
import Input from '../../styledComponents/Form/Input'
import Button from '../../styledComponents/Form/Button'
import Message from '../../styledComponents/Form/Message'

const RecoverSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email.')
		.required('The email is required.')
})

const Recovery = () => {
	const firebase = useFirebase()
	const [error, setError] = useState(null)

	const recoverPassword = async (values, setSubmitting) => {
		try {
			await firebase.auth().sendPasswordResetEmail(values.email)
			setError(false)
		} catch (e) {
			setError(e)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Formik
			initialValues={{
				email: ''
			}}
			validationSchema={RecoverSchema}
			onSubmit={(values, { setSubmitting }) => {
				recoverPassword(values, setSubmitting)
			}}
		>
			{({ isSubmitting, isValid }) => (
				<FormWrapper>
					<Heading noMargin size="h1" color="white">
						Recover password
					</Heading>
					<Heading size="h4" bold color="white">
						Type in your e-mail to recover your password
					</Heading>
					<StyledForm>
						<Field
							type="email"
							name="email"
							placeholder="Type your email..."
							component={Input}
						/>
						<Button
							disabled={!isValid || isSubmitting}
							loading={isSubmitting ? 'Sending recover email...' : null}
							type="submit"
						>
							Send
						</Button>
						<Message error show={error}>
							{error ? error.message : null}
						</Message>
						<Message success show={error === false}>
							Recover email sent successfully!
						</Message>
					</StyledForm>
				</FormWrapper>
			)}
		</Formik>
	)
}

export default Recovery
