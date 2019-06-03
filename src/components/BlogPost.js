import React from 'react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    [BLOCKS.EMBEDDED_ENTRY]: node => (
      // does not work yet
      <img src={node.data.target.fields.file['en-US'].url} />
    )
  }
}

const BlogPost = ({ title, jsonContent }) => (
  <div>
    <h1>{title}</h1>
    {documentToReactComponents(jsonContent, options)}
  </div>
)

export default BlogPost
