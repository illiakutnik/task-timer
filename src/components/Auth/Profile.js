import React, { useState } from 'react'
import { Formik, Field } from 'formik'
import styled from 'styled-components/macro'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestore } from 'react-redux-firebase'

import { FormWrapper, StyledForm } from '../../styledComponents/Form/Form'
import Heading from '../../styledComponents/Headings'
import Input from '../../styledComponents/Form/Input'
import Button from '../../styledComponents/Form/Button'
import Message from '../../styledComponents/Form/Message'
import Modal from '../../styledComponents/Modal/Modal'

const DeleteWrapper = styled.div`
	cursor: pointer;
	color: #fff;
	font-size: 1.3rem;
	font-weight: 700;
	margin-top: 6rem;
	transition: all 0.2s;
	background-color: var(--color-errorRed);
	opacity: 0.6;
	padding: 0.7rem 3rem;
	border-radius: 2rem;
	&:hover {
		transform: translateY(-3px);
		opacity: 1;
	}
	&:active {
		transform: translateY(2px);
	}
`

const ButtonsWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
`

const ProfileSchema = Yup.object().shape({
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
	password: Yup.string().min(8, 'The password is too short.'),
	confirmPassword: Yup.string().when('password', {
		is: password => password && password.length > 0,
		then: Yup.string()
			.required('You need to confirm your password.')
			.oneOf([Yup.ref('password'), null], `Password doesn't match`)
	})
})

const Profile = () => {
	const firebase = useFirebase()
	const firestore = useFirestore()
	const firebaseState = useSelector(state => state.firebase)
	const [error, seterror] = useState(null)
	const [modalOpened, setModalOpened] = useState(false)
	const [deleteError, setDeleteError] = useState(null)
	const [deleteRequest, setDeleteRequest] = useState(false)

	const editProfile = async (values, setSubmitting) => {
		const user = firebase.auth().currentUser
		const { uid: userId, email: userEmail } = firebaseState.auth
		try {
			if (values.email !== userEmail) {
				await user.updateEmail(values.email)
			}

			await firestore.set(
				{ collection: 'users', doc: userId },
				{
					firstName: values.firstName,
					lastName: values.lastName
				}
			)

			if (values.password) {
				await user.updatePassword(values.password)
			}
			seterror(false)
		} catch (e) {
			seterror(e.message)
		} finally {
			setSubmitting(false)
		}
	}

	const deleteUser = async () => {
		setDeleteRequest(true)
		const user = firebase.auth().currentUser
		const uid = firebaseState.auth.uid
		try {
			await firestore.delete({ collection: 'users', doc: uid })
			await user.delete()
		} catch (e) {
			setDeleteError(e.message)
			setDeleteRequest(false)
		}
	}
	console.log(error)

	if (!firebaseState.profile.isLoaded) return null

	return (
		<>
			<Formik
				initialValues={{
					firstName: firebaseState.profile.firstName,
					lastName: firebaseState.profile.lastName,
					email: firebaseState.auth.email,
					password: '',
					confirmPassword: ''
				}}
				validationSchema={ProfileSchema}
				onSubmit={(values, { setSubmitting }) => {
					editProfile(values, setSubmitting)
				}}
			>
				{({ isSubmitting, isValid }) => (
					<FormWrapper>
						<Heading size='h1' color='white'>
							Edit your profile
						</Heading>
						<Heading bold size='h4' color='white'>
							Here you can edit your profile
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
								loading={isSubmitting ? 'Editing...' : null}
								type='submit'
							>
								Edit
							</Button>
							<Message error show={error}>
								{error}
							</Message>
							<Message success show={error === false}>
								Profile was updated!
							</Message>
						</StyledForm>
						<DeleteWrapper onClick={() => setModalOpened(true)}>
							Delete my account
						</DeleteWrapper>
					</FormWrapper>
				)}
			</Formik>
			<Modal opened={modalOpened} close={() => setModalOpened(false)}>
				<Heading bold size='h2' color='white'>
					Do you really want to delete your account?
				</Heading>
				<ButtonsWrapper>
					<Button
						contain
						onClick={() => deleteUser()}
						color='red'
						disabled={deleteRequest}
						loading={deleteRequest ? 'Deleting...' : null}
					>
						Delete
					</Button>
					<Button color='main' contain onClick={() => setModalOpened(false)}>
						Cancel
					</Button>
				</ButtonsWrapper>
				<Message error show={deleteError}>
					{deleteError}
				</Message>
			</Modal>
		</>
	)
}

export default Profile
