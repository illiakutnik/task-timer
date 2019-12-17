import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import NavItem from './NavItem'

const Nav = styled.nav`
	display: flex;
`

const Ul = styled.ul`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
`
const NavItems = () => {
	const auth = useSelector(state => state.firebase.auth.uid)
	let links
	if (auth) {
		links = (
			<Ul>
				<NavItem link="/">Tasks</NavItem>
				<NavItem link="/profile">Profile</NavItem>
				<NavItem link="/logout">Logout</NavItem>
			</Ul>
		)
	} else {
		links = (
			<Ul>
				<NavItem link="/login">Login</NavItem>
				<NavItem link="/signup">Signup</NavItem>
			</Ul>
		)
	}

	return <Nav>{links}</Nav>
}

export default NavItems
