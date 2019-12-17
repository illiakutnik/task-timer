import React from 'react'
import styled from 'styled-components/macro'

import Navbar from '../Navigation//Navbar'

const MainWrapper = styled.div`
	width: 100%;
	min-height: calc(100vh - 6rem);
	margin-top: 6rem;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Layout = ({ children }) => (
	<>
		<Navbar />
		<MainWrapper>{children}</MainWrapper>
	</>
)

export default Layout
