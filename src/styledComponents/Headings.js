import React from 'react'
import styled, { css } from 'styled-components/macro'

const baseStyle = css`
	color: ${({ color }) =>
		color === 'white' ? '#fff' : 'var(--color-main)'};
	font-weight: ${({ bold }) => (bold ? '700' : '300')};
	margin-top: 0;
	letter-spacing: 1px;
	margin-bottom: ${({ margin }) => {
		if (!margin) return '4rem'
		if (margin === 'no') return '0rem'
		else return margin
	}};
`

const Heading1 = styled.h1`
	font-size: 2.5rem;
	text-transform: uppercase;
	${baseStyle}
`

const Heading2 = styled.h2`
	font-size: 1.8rem;
	${baseStyle}
`

const Heading3 = styled.h3`
	font-size: 1.5rem;
	${baseStyle}
`

const Heading4 = styled.h4`
	font-size: 1.3rem;
	${baseStyle}
`

const Heading = ({ children, color, margin, bold, size }) => {
	if (size === 'h1')
		return (
			<Heading1 margin={margin} bold={bold} color={color}>
				{children}
			</Heading1>
		)

	if (size === 'h2')
		return (
			<Heading2 margin={margin} bold={bold} color={color}>
				{children}
			</Heading2>
		)

	if (size === 'h3')
		return (
			<Heading3 margin={margin} bold={bold} color={color}>
				{children}
			</Heading3>
		)

	if (size === 'h4')
		return (
			<Heading4 margin={margin} bold={bold} color={color}>
				{children}
			</Heading4>
		)
}

export default Heading
