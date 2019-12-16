import React, { useState, useEffect } from 'react'
import { useFirestore, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import uuid from 'uuid'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

import Input from '../../styledComponents/Form/Input'
import Button from '../../styledComponents/Form/Button'

const TimerWrapper = styled.div`
	display: flex;
	align-self: center;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	border-radius: 0.7rem;
	background-color: var(--color-mainDark);
	box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
	width: 50%;
`

const StyledTimer = styled.div`
	margin: 1rem 0;
	width: 15rem;
	height: 15rem;
	font-size: 2rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	/* color: #fff; */
	background-color: var(--color-mainLighter);
`
const StyledForm = styled(Form)`
	width: 70%;
`

const ButtonWrapper = styled.div`
	margin-bottom: 2rem;
	display: flex;
	justify-content: space-around;
`

const TaskSchema = Yup.object().shape({
	task: Yup.string().required('type name for task')
})

const Timer = () => {
	const firestore = useFirestore()
	const userID = useSelector(state => state.firebase.auth.uid)
	const tasks = useSelector(state => state.firestore.data.tasks)
	const [time, setTime] = useState(0)
	const [startTime, setStartTime] = useState(null)
	const [isActive, setIsActive] = useState(false)
	const [isStarted, setIsStarted] = useState(false)

	const startClick = () => {
		setStartTime(moment().unix())
		setIsActive(true)
		setIsStarted(true)
	}
	const pauseClick = () => {
		setIsActive(!isActive)
	}

	const toHHMMSS = sec => {
		let secNum = parseInt(sec)
		let hours = Math.floor(secNum / 3600)
		let minutes = Math.floor(secNum / 60) % 60
		let seconds = secNum % 60
		return [hours, minutes, seconds].map(x => (x < 10 ? `0${x}` : x)).join(':')
	}

	const stopClick = values => {
		const completeTask = {
			id: uuid(),
			time: time,
			name: values.task,
			timeStart: startTime,
			timeEnd: moment().unix()
		}

		if (isLoaded(tasks)) {
			if (!tasks[userID]) {
				firestore
					.collection('tasks')
					.doc(userID)
					.set({
						tasks: [completeTask]
					})
			} else {
				firestore
					.collection('tasks')
					.doc(userID)
					.update({
						tasks: [...tasks[userID].tasks, completeTask]
					})
			}
		}
		setTime(0)
		setIsActive(false)
		setIsStarted(false)
	}

	// console.log(time)
	useEffect(() => {
		return () => {
			// firestore
			// 	.collection('tasks')
			// 	.doc(userID)
			// 	.update({
			// 		ongoingTask: { time: time }
			// 	})
			// console.log(time)
			// if (isLoaded(tasks)) {
			// 	if (!tasks[userID]) {
			// 		firestore
			// 			.collection('tasks')
			// 			.doc(userID)
			// 			.set({
			// 				ongoingTask: { time: time }
			// 			})
			// 	} else {
			// 		firestore
			// 			.collection('tasks')
			// 			.doc(userID)
			// 			.update({
			// 				ongoingTask: { time: time }
			// 			})
			// 	}
			// }
		}
	}, [time])

	useEffect(() => {
		let interval = null
		if (isActive) {
			interval = setInterval(() => {
				setTime(prevState => prevState + 1)
			}, 1000)
		} else if (!isActive && time !== 0) {
			clearInterval(interval)
		}
		return () => {
			// console.log(startTime)
			// firestore
			// 	.collection('tasks')
			// 	.doc(userID)
			// 	.update({
			// 		ongoingTask: {
			// 			time: time,
			// 			start: startTime,
			// 			unMount: moment().unix(),
			// 			dif: moment().unix() - startTime
			// 		}
			// 	})

			clearInterval(interval)
		}
	}, [isActive, time])
	return (
		<TimerWrapper>
			<StyledTimer>{toHHMMSS(time)}</StyledTimer>
			<Formik
				initialValues={{
					task: ''
				}}
				validationSchema={TaskSchema}
				onSubmit={(values, { setSubmitting }) => {
					stopClick(values)
				}}
			>
				{(isSubmitting, isValid) => (
					<StyledForm>
						<Field
							type='text'
							name='task'
							placeholder='name your task'
							component={Input}
						/>
						<ButtonWrapper>
							{!isStarted ? (
								<Button contain type='button' onClick={startClick}>
									Start
								</Button>
							) : (
								<>
									<Button contain type='button' onClick={pauseClick}>
										Pause
									</Button>
									<Button color='red' contain type='submit'>
										Stop
									</Button>
								</>
							)}
						</ButtonWrapper>
					</StyledForm>
				)}
			</Formik>
		</TimerWrapper>
	)
}

export default Timer
