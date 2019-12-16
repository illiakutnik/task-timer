import React, { useState } from 'react'
import styled from 'styled-components/macro'

import Logo from '../../Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import NavItems from '../NavItems/NavItems'

const FixedWrapper = styled.div`
	position: fixed;
	background-color: var(--color-main);
	padding: 0rem 2rem;
	z-index: 10;
	top: 0;
	left: 0;
	width: 100%;
	height: 6rem;
	display: none;
	@media ${props => props.theme.mediaQueries.smallest} {
		display: flex;
	}
`
const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	width: 100%;
`
const Menu = styled.div`
	width: 100%;
	background-color: var(--color-mainDark);
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	margin-top: 6rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-main);
	visibility: ${props => (props.opened ? 'visible' : 'hidden')};
	transform: translateY(${props => (props.opened ? '0%' : '-100%')});
	transition: all 0.2s ease-in-out;
	display: none;
	@media ${props => props.theme.mediaQueries.smallest} {
		display: flex;
	}
`

const SideDrawer = ({ loggedIn }) => {
	const [isOpened, setIsOpened] = useState(false)
	return (
		<>
			<FixedWrapper>
				<Wrapper>
					<Logo />
					<Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} />
				</Wrapper>
			</FixedWrapper>
			<Menu opened={isOpened}>
				<NavItems
					loggedIn={loggedIn}
					mobile='true'
					clicked={() => setIsOpened(false)}
				/>
			</Menu>
		</>
	)
}

export default SideDrawer
