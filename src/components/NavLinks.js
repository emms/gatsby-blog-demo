import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const sharedNavLinkStyle = css`
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 20px;
  background-color: ${props => props.theme.colorAccent};
  border-radius: 4px;
`

const StyledPrevPageLink = styled(Link)`
  ${sharedNavLinkStyle}
  align-self: flex-start;

  > span {
    font-size: 16px;
    color: #fff;
  }
`

const StyledNextPageLink = styled(Link)`
  ${sharedNavLinkStyle}
  align-self: flex-end;

  > span {
    font-size: 16px;
    color: #fff;
  }
`

export const PrevPageLink = ({ to }) => (
  <StyledPrevPageLink to={to}>
    <span>Previous page</span>
  </StyledPrevPageLink>
)

export const NextPageLink = ({ to }) => (
  <StyledNextPageLink to={to}>
    <span>Next page</span>
  </StyledNextPageLink>
)
