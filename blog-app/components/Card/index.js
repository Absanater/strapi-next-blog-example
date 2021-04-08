import React from 'react';
import ReactMarkdown from 'react-markdown';

const Card = (props) => (
  <div>
    <h1>{props.title}</h1>
    <img style={{ width: '100%' }} src={process.env.NEXT_PUBLIC_BLOG_API + props.background[0].url} />
  </div>
)

export default Card;
