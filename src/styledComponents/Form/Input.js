import React from 'react'
import styled from 'styled-components/macro'

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	position: relative;
	margin-bottom: 3.5rem;
	flex-direction: column;
	&:last-of-type {
		margin-bottom: 4.5rem;
	}
`

const StyledInput = styled.input`
	padding: 1.2rem 2rem;
	width: 100%;
	background-color: ${({ lightColor }) =>
		lightColor ? 'var(--color-mainLighter)' : 'var(--color-mainLight)'};
	color: #fff;
	font-weight: 500;
	font-size: 1.2rem;
	border-radius: 2rem;
	border: none;
	&::placeholder {
		color: #fff;
	}
`
const Error = styled.div`
	color: var(--color-errorRed);
	visibility: ${({ show }) => (show ? 'visibile' : 'hidden')};
	opacity: ${({ show }) => (show ? '1' : '0')};
	transform: translateY(${({ show }) => (show ? '20px' : '10px')});
	transition: all 0.1s;
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 0rem 2rem;
	font-weight: 500;
	font-size: 1.2rem;
`

const Input = ({
	lightColor,
	name,
	field,
	form: { touched, errors },
	...props
}) => {
	return (
		<InputWrapper>
			<StyledInput lightColor={lightColor} {...field} {...props}></StyledInput>
			<Error show={errors[field.name] && touched[field.name]}>
				{errors[field.name]}
			</Error>
		</InputWrapper>
	)
}

export default Input
