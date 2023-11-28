import cn from 'classnames'
import Link from 'next/link'
import React from 'react'

import { makeSlugText } from '../lib/helpers'

type HeadingWithMoreProps = {
  title: string
  href?: string
  icon?: React.ReactNode
  className?: string
}

export default function HeadingWithMore(props: HeadingWithMoreProps) {
  const { title, href, icon, className } = props
  return (
    <h2
      id={makeSlugText(title)}
      className={cn(
        className,
        'font-heading text-[1.7rem] font-medium text-slate-700 flex items-baseline flex-wrap gap-y-0 gap-x-4'
      )}
    >
      {!!icon && icon}
      <span>{title}</span>
      {href && (
        <Link
          className="text-[60%] italic text-slate-600 hover:notion-link-hover font-normal"
          href={href}
        >
          ...more
        </Link>
      )}
    </h2>
  )
}
