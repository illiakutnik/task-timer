import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components/macro'

import Backdrop from './Backdrop'

const WrappedModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: ${({ opened }) =>
		opened ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)'};
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5rem 0;
	z-index: 5;
	justify-content: center;
	opacity: ${({ opened }) => (opened ? '1' : '0')};
	visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
	width: 100%;
	max-width: 50rem;
	box-shadow: 0 0.5rem 3.5em var(--shadow);
	border-radius: 1rem;
	background-color: ${({ changeMode }) =>
		changeMode ? 'var(--color-main)' : 'var(--color-mainLighter)'};
	transition: all 0.3s;
`

const InsideWrapper = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	padding: 3rem 3rem;
`

const Modal = ({ opened, close, changeMode, children }) => {
	return ReactDOM.createPortal(
		<>
			<Backdrop close={close} opened={opened} />
			<WrappedModal opened={opened} changeMode={changeMode}>
				<InsideWrapper>{children}</InsideWrapper>
			</WrappedModal>
		</>,
		document.getElementById('root-modal')
	)
}

export default Modal
