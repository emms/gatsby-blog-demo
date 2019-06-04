import React from 'react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from 'styled-components'
import format from 'date-fns/format'

const StyledImage = styled.img`
  max-width: 100%;
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
  <div>
    <h1>{title}</h1>
    <p>{`Posted at ${format(postedAt, 'DD.MM.YYYY')}`}</p>
    {documentToReactComponents(jsonContent, options)}
  </div>
)

export default BlogPost
