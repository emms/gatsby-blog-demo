import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const StyledCategoryLink = styled(Link)`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-image: ${props => `url(${props.coverimage})`};
  background-position: center;
  background-size: cover;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > h4 {
    color: #fff;
    text-align: center;
  }
`

const CategoryLink = ({ title, coverimage, url }) => (
  <StyledCategoryLink coverimage={coverimage} to={`/category/${url}`}>
    <h4>{title}</h4>
  </StyledCategoryLink>
)

export default CategoryLink
