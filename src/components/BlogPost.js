import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from 'styled-components'
import { Link } from 'gatsby'
import format from 'date-fns/format'

const StyledImage = styled.img`
  max-width: 100%;
  margin-bottom: 30px;
  border-radius: 4px;

  &:not(:first-of-type) {
    margin-top: 30px;
  }
`

const StyledBlogPost = styled.div`
  &:not(:last-of-type) {
    padding-bottom: 80px;
  }

  > a {
    text-decoration: none;
    color: #000;
    display: block;
    padding-bottom: 20px;
  }

  > p {
    margin-top: 0;

    &:first-of-type {
      font-style: italic;
      margin: 0;
      padding-bottom: 30px;
      font-size: 13px;
    }
  }
`

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if (node.data.target.fields)
        return <StyledImage src={node.data.target.fields.file['en-US'].url} />
      return null
    }
  }
}

const BlogPost = ({ title, id, postedAt, jsonContent }) => (
  <StyledBlogPost>
    <Link to={`/post/${id}`}>
      <h2>{title}</h2>
    </Link>
    <p>{`Posted on ${format(postedAt, 'DD.MM.YYYY')}`}</p>
    {documentToReactComponents(jsonContent, options)}
  </StyledBlogPost>
)

export default BlogPost
