import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

const Li = styled.li`
	display: flex;
	height: 100%;
`
const StyledNavLink = styled(NavLink)`
	display: flex;
	text-transform: uppercase;
	align-items: center;
	padding: 1.2rem;
	margin: 0 1rem;
	font-weight: 600;
	font-size: 1.3rem;
	color: #fff;
	transition: all 0.2s;
	&:hover {
		border-bottom: 3px solid #fff;
	}
`

const NavItem = ({ link, children }) => {
	return (
		<Li>
			<StyledNavLink to={link}>{children}</StyledNavLink>
		</Li>
	)
}

export default NavItem
