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

const TaskList = () => {
	const firestore = useFirestore()
	const tasks = useSelector(state => state.firestore.data.tasks)
	const userID = useSelector(state => state.firebase.auth.uid)
	useFirestoreConnect([{ collection: 'tasks', doc: userID }])

	const tasks2 = useSelector(state => state.firestore.ordered.tasks)
	// console.log(tasks2[userID])

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

	if (!isLoaded(tasks)) {
		return 'Loading...'
	} else if (isEmpty(tasks[userID])) {
		return "you don't have any tasks yet"
	} else {
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
					{tasks[userID].tasks.map((task, i) => (
						<TaskItem
							key={task.id}
							index={i + 1}
							task={task}
							deleteItem={deleteItem}
						/>
					))}
				</tbody>
			</StyledTable>
		)
	}
}

export default TaskList
