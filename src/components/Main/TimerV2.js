import React, { Component } from 'react'
import { isLoaded } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirestore } from 'react-redux-firebase'
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
	align-items: center;
	border-radius: 0.7rem;
	width: 40%;
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
	color: #fff;
	box-shadow: 0 0 3.5rem var(--shadow);
	background-color: var(--color-mainLighter);
`
const StyledForm = styled(Form)`
	width: 60%;
`

const ButtonWrapper = styled.div`
	margin-bottom: 2rem;
	display: flex;
	justify-content: space-around;
`

const TaskSchema = Yup.object().shape({
	task: Yup.string().required('type some name for task')
})

class TimerV2 extends Component {
	state = {
		time: 0,
		startTime: null,
		isActive: false,
		isStarted: false
	}

	componentDidMount() {
		if (localStorage.getItem('ongoingTask') !== null) {
			const task = JSON.parse(localStorage.getItem('ongoingTask'))
			const time = task.timeLeave
				? moment().unix() - task.timeLeave + task.time
				: task.time
			const activeStatus = task.timeLeave ? true : false
			this.setState({
				time: time,
				startTime: task.startTime,
				isStarted: true,
				isActive: activeStatus
			})
			this.interval = setInterval(this.timerTik, 1000)
		}
		localStorage.removeItem('ongoingTask')
		window.addEventListener('beforeunload', this.componentWillClose)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
		this.saveDataOnClose()
		window.removeEventListener('beforeunload', this.componentWillClose)
	}

	componentWillClose = () => {
		this.saveDataOnClose()
	}

	saveDataOnClose = () => {
		const { time, isStarted, isActive, startTime } = this.state
		if (isStarted) {
			const ongoingTask = {
				time,
				startTime
			}
			if (isActive) {
				ongoingTask.timeLeave = moment().unix()
			}
			localStorage.setItem('ongoingTask', JSON.stringify(ongoingTask))
		}
	}

	timerTik = () => {
		if (this.state.isActive) {
			this.setState(prevState => ({ time: prevState.time + 1 }))
		}
	}

	startClick = () => {
		this.setState({
			startTime: moment().unix(),
			isActive: true,
			isStarted: true
		})
		this.interval = setInterval(this.timerTik, 1000)
	}

	pauseClick = () => {
		this.setState(prevState => ({
			isActive: !prevState.isActive
		}))
	}

	stopClick = async (values, setSubmitting, resetForm) => {
		const { tasks, firestore, userID } = this.props
		const completeTask = {
			id: uuid(),
			time: this.state.time,
			name: values.task,
			timeStart: this.state.startTime,
			timeEnd: moment().unix()
		}
		this.setState({
			isActive: false
		})
		try {
			if (isLoaded(tasks)) {
				if (!tasks[userID]) {
					await firestore
						.collection('tasks')
						.doc(userID)
						.set({
							tasks: [completeTask]
						})
				} else {
					await firestore
						.collection('tasks')
						.doc(userID)
						.update({
							tasks: [...tasks[userID].tasks, completeTask]
						})
				}
				resetForm()
				clearInterval(this.interval)
				this.setState({
					time: 0,
					isStarted: false
				})
			}
		} catch (e) {
			alert(e.message)
		} finally {
			setSubmitting(false)
		}
	}

	toHHMMSS = sec => {
		let secNum = parseInt(sec)
		let hours = Math.floor(secNum / 3600)
		let minutes = Math.floor(secNum / 60) % 60
		let seconds = secNum % 60
		return [hours, minutes, seconds].map(x => (x < 10 ? `0${x}` : x)).join(':')
	}

	render() {
		return (
			<TimerWrapper>
				<StyledTimer>{this.toHHMMSS(this.state.time)}</StyledTimer>
				<Formik
					initialValues={{
						task: ''
					}}
					validationSchema={TaskSchema}
					onSubmit={(values, { resetForm, setSubmitting }) => {
						this.stopClick(values, setSubmitting, resetForm)
					}}
				>
					{({ isSubmitting }) => (
						<StyledForm>
							<Field
								type='text'
								name='task'
								placeholder='name your task'
								lightColor={true}
								component={Input}
							/>
							<ButtonWrapper>
								{!this.state.isStarted ? (
									<Button contain type='button' onClick={this.startClick}>
										Start
									</Button>
								) : (
									<>
										<Button contain type='button' onClick={this.pauseClick}>
											Pause
										</Button>
										<Button
											color='red'
											contain
											type='submit'
											disabled={isSubmitting}
											loading={isSubmitting ? 'Saving...' : null}
										>
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
}

export default compose(
	withFirestore,
	connect(state => ({
		tasks: state.firestore.data.tasks,
		userID: state.firebase.auth.uid
	}))
)(TimerV2)
