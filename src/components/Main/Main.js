import React from 'react'
import TaskList from './TaskList/TaskList'
import Timer from './TimerV2'
import styled from 'styled-components/macro'

import Container from '../../styledComponents/Container'

const BigMainWrapper = styled.div`
	/* background-color: var(--color-mainDark); */
	width: 100%;
	align-self: flex-start;
	background-color: #fff;
`
const MainWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const Main = () => {
	return (
		<BigMainWrapper>
			<Container>
				<MainWrapper>
					<Timer />
					<TaskList />
				</MainWrapper>
			</Container>
		</BigMainWrapper>
	)
}

export default Main
