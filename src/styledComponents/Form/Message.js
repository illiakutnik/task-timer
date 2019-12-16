import React from 'react'
import styled from 'styled-components/macro'

const P = styled.p`
	position: absolute;
	bottom: -4.5rem;
	font-weight: 700;
	font-size: 1.2rem;
	color: ${({ error, success }) => {
		if (error) return 'var(--color-errorRed)'
		if (success) return 'green'
		else return 'var(--color-main)'
	}};
	visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
	transform: translateY(${({ show }) => (show ? '0' : '-30px')});
	text-align: center;
	transition: all 0.3s;
`

const Message = ({ children, error, success, show }) => {
	return (
		<P error={error} success={success} show={show}>
			{children}
		</P>
	)
}

export default Message
