import React from 'react'
import styled from 'styled-components/macro'
import Heading from '../Headings'
import HelpLink from './HelpLink'

const StyledHelpSection = styled.div`
	margin-top: ${({ show }) => (show ? '7rem' : '0rem')};
	visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
	opacity: ${({ show }) => (show ? '1' : '0')};
	transition: all 0.3s;
	text-align: center;
`

function HelpSection({ error, show }) {
	switch (error) {
		case 'auth/wrong-password':
			return (
				<StyledHelpSection show={show}>
					<Heading margin='2rem' size='h3' color='white'>
						Forgot your password?
					</Heading>
					<HelpLink link={'/recovery'}>Recover password</HelpLink>
				</StyledHelpSection>
			)
		case 'auth/user-not-found':
			return (
				<StyledHelpSection show={show}>
					<Heading margin='2rem' size='h3' color='white'>
						Don't have an account?
					</Heading>
					<HelpLink link={'/signup'}>Sign Up</HelpLink>
				</StyledHelpSection>
			)
		case 'auth/email-already-in-use':
			return (
				<StyledHelpSection show={show}>
					<Heading margin='2rem' size='h3' color='white'>
						Already have an account?
					</Heading>
					<HelpLink link={'/login'}>Log in</HelpLink>
				</StyledHelpSection>
			)
		default:
			return <StyledHelpSection></StyledHelpSection>
	}
}

export default HelpSection
