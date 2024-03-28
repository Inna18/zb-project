import React, { LinkHTMLAttributes } from 'react'

interface LinkProps extends LinkHTMLAttributes<HTMLLinkElement>{}

const Link = (linkProps: LinkProps, text: string) => {
  const { href } = linkProps;

  return (
    <a href={href}>{text}</a>
  )
}

export default Link
