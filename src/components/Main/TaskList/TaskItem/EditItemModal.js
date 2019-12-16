import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import styled from 'styled-components/macro'
import * as Yup from 'yup'

import Modal from '../../../../styledComponents/Modal/Modal'
import Input from '../../../../styledComponents/Form/Input'
import Button from '../../../../styledComponents/Form/Button'
import Heading from '../../../../styledComponents/Headings'

const StyledForm = styled(Form)`
	width: 85%;
`

const ButtonWrapper = styled.div`
	margin-bottom: 2rem;
	display: flex;
	justify-content: space-around;
`
const TaskSchema = Yup.object().shape({
	task: Yup.string().required('type some name for task')
})

const EditItemModal = ({ open, close, name }) => {
	const changeName = (values, setSubmitting) => {
		if (name !== values.task) {
			console.log('changed')
		}
	}

	return (
		<Modal opened={open} close={close} changeMode={true}>
			<Heading bold size='h2' color='white'>
				You can change the name of task
			</Heading>
			<Formik
				initialValues={{
					task: name
				}}
				validationSchema={TaskSchema}
				onSubmit={(values, { setSubmitting }) => {
					changeName(values, setSubmitting)
					console.log('submit')
				}}
			>
				{({ isSubmitting, isValid, resetForm }) => (
					<StyledForm>
						<Field
							type='text'
							name='task'
							lightColor={true}
							component={Input}
						/>
						<ButtonWrapper>
							<Button
								contain
								type='button'
								onClick={() => {
									close()
									resetForm()
								}}
							>
								Close
							</Button>
							<Button
								color='red'
								contain
								type='submit'
								disabled={isSubmitting || !isValid}
								loading={isSubmitting ? 'Saving...' : null}
							>
								Save
							</Button>
						</ButtonWrapper>
					</StyledForm>
				)}
			</Formik>
		</Modal>
	)
}

export default EditItemModal
