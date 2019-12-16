import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
	font-size: 3rem;
	outline: none;
	padding: 1.2rem 2rem;
	border-radius: 2rem;
	font-size: 1.2rem;
	color: var(--color-white);
	font-weight: 700;
	box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
	background-color: var(--color-mainLighter);
	margin-top: 2rem;
`

const HelpLink = ({ link, children }) => {
	return <StyledLink to={link}>{children}</StyledLink>
}

export default HelpLink
