import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Trash } from 'styled-icons/boxicons-solid/Trash'
import { EditAlt } from 'styled-icons/boxicons-solid/EditAlt'
import moment from 'moment'

import EditItemModal from './EditItemModal'

const TableRow = styled.tr`
	font-size: 2rem;
	background-color: var(--color-mainLighter);
	border-bottom: 1px solid var(--color-mainLight);
	td {
		padding: 1rem;
	}
	td:nth-child(1) {
		width: 6%;
	}
	td:nth-child(2) {
		width: 30%;
	}
	td:nth-child(3) {
		width: 10%;
	}
	td:nth-child(4) {
		width: 20%;
		font-size: 1.7rem;
	}
	td:nth-child(5) {
		width: 20%;
		font-size: 1.7rem;
	}
	td:nth-child(6) {
		width: 7%;
	}
	td:nth-child(7) {
		width: 7%;
	}
	:nth-of-type(even) {
		background-color: var(--color-mainPale);
	}
	:last-of-type {
		border-bottom: 2px solid var(--color-main);
	}
`
const IconButton = styled.button`
	background-color: inherit;
	border: none;
`
const EditIcon = styled(EditAlt)`
	color: var(--color-main);
	height: 2.5rem;
	width: 2.5rem;
`
const TrashIcon = styled(Trash)`
	color: var(--color-errorRed);
	height: 2.5rem;
	width: 2.5rem;
`

const convertTime = sec => {
	let secNum = parseInt(sec)
	let hours = Math.floor(secNum / 3600)
	let minutes = Math.floor(secNum / 60) % 60
	let seconds = secNum % 60
	let isHours = hours > 0 ? true : false
	let isMinutes = minutes > 0 ? true : false
	let lessThanTen = num => (num < 10 ? `0${num}` : num)
	if (isHours) {
		return [hours, lessThanTen(minutes), lessThanTen(seconds)].join(':')
	} else if (!isHours && isMinutes) {
		return [minutes, lessThanTen(seconds)].join(':')
	} else {
		return `${seconds}s`
	}
}

const TaskItem = ({ task, deleteItem, index, editItem }) => {
	const [editing, setEditing] = useState(false)
	const editModal = () => {
		if (editing) {
			return (
				<EditItemModal
					name={task.name}
					id={task.id}
					open={editing}
					editItem={editItem}
					close={() => setEditing(false)}
				/>
			)
		} else return null
	}
	return (
		<>
			<TableRow>
				<td>{index}</td>
				<td>{task.name}</td>
				<td>{convertTime(task.time)}</td>
				<td>{moment.unix(task.timeStart).format('MMM Do YYYY, H:mm')}</td>
				<td>{moment.unix(task.timeEnd).format('MMM Do YYYY, H:mm')}</td>
				<td>
					<IconButton onClick={() => setEditing(true)}>
						<EditIcon />
					</IconButton>
				</td>
				<td>
					<IconButton onClick={() => deleteItem(task.id)}>
						<TrashIcon />
					</IconButton>
				</td>
			</TableRow>
			{editModal()}
		</>
	)
}

export default TaskItem
