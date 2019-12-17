import React from 'react'
import TaskList from './TaskList/TaskList'
import Timer from './Timer'
import styled from 'styled-components/macro'

import Container from '../../styledComponents/Container'

const BigMainWrapper = styled.div`
	width: 100%;
	align-self: flex-start;
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
