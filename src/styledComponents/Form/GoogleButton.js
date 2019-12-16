import React from 'react'
import styled from 'styled-components/macro'

const GoogleStyledButton = styled.button`
	width: 60px;
	height: 60px;
`
const Icon = styled.div`
	background: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg')
		6px 6px no-repeat;
`

const P = styled.p``

const GoogleCustomButton = () => {
	return (
		<GoogleStyledButton>
			<Icon />
			<P>Sign up with google</P>
		</GoogleStyledButton>
	)
}

export default GoogleCustomButton
