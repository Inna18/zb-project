import React from 'react'

type LinkProps = {
    to: string,
    text: string
}

const Link = (linkProps: LinkProps) => {
  const { to, text } = linkProps;

  return (
    <a href={to}>{text}</a>
  )
}

export default Link
