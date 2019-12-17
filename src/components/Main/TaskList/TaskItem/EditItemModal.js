import React from 'react'
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

const EditItemModal = ({ open, close, name, editItem, id }) => {
	return (
		<Modal opened={open} close={close} changeMode={true}>
			<Heading bold size="h2" color="white">
				You can change the name of task
			</Heading>
			<Formik
				initialValues={{
					task: name
				}}
				validationSchema={TaskSchema}
				onSubmit={async (values, { setSubmitting }) => {
					await editItem(id, values.task, setSubmitting)
					close()
				}}
			>
				{({ isSubmitting, isValid, values, setValues }) => (
					<StyledForm>
						<Field
							type="text"
							name="task"
							lightColor={true}
							component={Input}
						/>
						<ButtonWrapper>
							<Button
								contain
								type="button"
								onClick={() => {
									close()
									setValues({ task: name })
								}}
							>
								Close
							</Button>
							<Button
								color="red"
								contain
								type="submit"
								disabled={isSubmitting || !isValid || values.task === name}
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
