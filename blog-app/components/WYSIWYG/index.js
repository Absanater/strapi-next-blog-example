import React from 'react';
import ReactMarkdown from 'react-markdown';

const WYWIWYG = (props) => (
  <ReactMarkdown>
    {props.Content}
  </ReactMarkdown>
)

export default WYWIWYG;
