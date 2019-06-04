import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const StyledCategoryLink = styled(Link)`
  width: 100%;
  height: 100%;
  background-image: url(${props.image});
  background-position: center;
  background-size: cover;
`

const CategoryLink = ({ image }) => <StyledCategoryLink />
