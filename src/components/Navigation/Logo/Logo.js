import React from 'react'
import styled from 'styled-components/macro'

import icon from './icon.png'

const LogoWrapper = styled.div`
	color: #fff;
	font-size: 1.5rem;
	padding: 1rem;
	height: 100%;
	font-weight: 700;
	display: flex;
	align-items: center;
`
const Icon = styled.img`
	height: 100%;
	filter: brightness(1000%);
	margin-right: 1rem;
`

const Logo = () => {
	return (
		<LogoWrapper>
			<Icon src={icon} alt="k" />
			TASK TIMER
		</LogoWrapper>
	)
}

export default Logo
