import React from 'react'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from 'styled-components'
import format from 'date-fns/format'

const StyledImage = styled.img`
  max-width: 100%;
  padding-bottom: 30px;
`

const StyledBlogPost = styled.div`
  &:not(:last-child) {
    padding-bottom: 60px;
  }

  > h2 {
    padding-bottom: 30px;
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
    [BLOCKS.EMBEDDED_ASSET]: node => (
      <StyledImage src={node.data.target.fields.file['en-US'].url} />
    )
  }
}

const BlogPost = ({ title, postedAt, jsonContent }) => (
  <StyledBlogPost>
    <h2>{title}</h2>
    <p>{`Posted on ${format(postedAt, 'DD.MM.YYYY')}`}</p>
    {documentToReactComponents(jsonContent, options)}
  </StyledBlogPost>
)

export default BlogPost
