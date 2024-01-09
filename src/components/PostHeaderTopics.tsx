import { cn } from '../lib/utils'
import Link from 'next/link'
import React from 'react'

import TiTag from '../icons/TiTag'
import { Category, Tag } from '../interface'

type PostHeaderTopicsProps = {
  className?: string
  categories?: Category[]
  tags?: Tag[]
  selectedUri?: string
  selectedName?: string
  TiTagClass?: string
  tagClass?: string
}

const topTagClass = `flex items-center justify-center rounded-2xl p-1.5 rounded-md text-xs font-semibold
hover:-translate-y-0.5 transition-all duration-300
whitespace-nowrap`

export default function PostHeaderTopics(props: PostHeaderTopicsProps) {
  const { categories, tags, className, selectedUri, selectedName } = props
  const usedTags = tags?.filter(tag => tag.permalink !== props.selectedUri) || []
  return (
    <div className={cn('flex flex-wrap gap-2 items-center', className)}>
      {!!selectedUri && !!categories && (
        <Link
          className={`${topTagClass} border border-amber-300 bg-amber-50 !text-amber-600`}
          key={'selected'}
          href={selectedUri}
        >
          <i className="icon-star-circled mr-1"></i> {selectedName || 'Selected'}
        </Link>
      )}
      {usedTags.length > 0 && <TiTag className={props.TiTagClass ?? 'text-gray-600 text-lg'} />}
      {usedTags.length > 0 &&
        usedTags.map(tag => (
          <Link
            className={cn(
              topTagClass,
              props.tagClass ?? 'bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200'
            )}
            key={tag.permalink}
            href={tag.permalink || '/'}
          >
            {tag.name}
          </Link>
        ))}
    </div>
  )
}
