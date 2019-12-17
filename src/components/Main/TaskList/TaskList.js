import React from 'react'
import { useSelector } from 'react-redux'
import {
	useFirestoreConnect,
	isLoaded,
	isEmpty,
	useFirestore
} from 'react-redux-firebase'
import styled from 'styled-components/macro'

import TaskItem from './TaskItem/TaskItem'
import Loader from '../../../styledComponents/Loader'
import Heading from '../../../styledComponents/Headings'

const StyledTable = styled.table`
	border-collapse: collapse;
	text-align: center;
	width: 100%;
	box-shadow: 0 0 3.5rem var(--shadow);
	border-radius: 1.5rem 1.5rem 0 0;
	overflow: hidden;
	color: #00162b;
	thead {
		background-color: var(--color-main);
		font-size: 2rem;
		color: var(--color-mainPale);
	}
	thead th {
		padding: 1.5rem;
	}
`
const TextContainer = styled.div`
	margin-top: 2rem;
	width: 100%;
	text-align: center;
`

const TaskList = () => {
	const firestore = useFirestore()
	const tasks = useSelector(state => state.firestore.data.tasks)
	const orderedTasks = useSelector(state => state.firestore.ordered.tasks)
	const userID = useSelector(state => state.firebase.auth.uid)
	useFirestoreConnect([{ collection: 'tasks', doc: userID }])

	const deleteItem = id => {
		try {
			firestore
				.collection('tasks')
				.doc(userID)
				.update({
					tasks: tasks[userID].tasks.filter(x => x.id !== id)
				})
		} catch (e) {
			alert(e.message)
		}
	}
	const editItem = async (id, newName, setSubmitting) => {
		const newTasks = tasks[userID].tasks
		const index = newTasks.findIndex(item => item.id === id)
		newTasks[index].name = newName
		try {
			await firestore
				.collection('tasks')
				.doc(userID)
				.update({
					tasks: newTasks
				})
		} catch (e) {
			alert(e.message)
		} finally {
			setSubmitting(false)
		}
	}

	if (!isLoaded(tasks)) {
		return <Loader />
	} else if (isEmpty(tasks[userID]) || isEmpty(tasks[userID].tasks)) {
		return (
			<TextContainer>
				<Heading bold size="h2">
					You don't have any tracked tasks yet. Click start to add your first
					one
				</Heading>
			</TextContainer>
		)
	} else {
		const listOfTasks = orderedTasks[0].tasks.slice(0).reverse()
		return (
			<StyledTable>
				<thead>
					<tr>
						<th>№</th>
						<th>Task</th>
						<th>Total Time</th>
						<th>Start</th>
						<th>End</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{listOfTasks.map((task, i) => (
						<TaskItem
							key={task.id}
							index={i + 1}
							task={task}
							deleteItem={deleteItem}
							editItem={editItem}
						/>
					))}
				</tbody>
			</StyledTable>
		)
	}
}

export default TaskList
