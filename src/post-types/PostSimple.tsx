import React from 'react'
import { Post } from '../interface'

import cn from 'classnames'
import Link from 'next/link'
import BadgeLabel from '../components/BadgeLabel'
import DateComponent from '../components/DateComponent'
import { usePostDateStatus } from '../hooks/postUpdatedDateStatus'
import AiFillPushpin from '../icons/AiFillPushpin'
import HiMiniCheckBadge from '../icons/HiMiniCheckBadge'
import IsDocumentText from '../icons/IsDocumentText'

export type PostSimpleOpts = {
  showPinned?: boolean
  customIcons?: React.ReactNode
  humanizeDate?: boolean
  maxDaysWinthin?: number
  addedOnLabel?: string
  newLabel?: string
  updatedOnLabel?: string
}

type PostSimpleProps = {
  post: Post
  options?: PostSimpleOpts
}

export default function PostSimple({ post, options }: PostSimpleProps) {
  const status = usePostDateStatus(
    post.createdDate!,
    post.updatedDate!,
    options?.maxDaysWinthin || 7
  )
  return (
    <Link
      key={post.id}
      href={post.permalink}
      className="group flex items-center p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800"
    >
      <div className="relative shrink-0 mr-2.5 text-2xl">
        {post.pinned && options?.showPinned ? <AiFillPushpin /> : <IsDocumentText />}
        {post.verified && (
          <span className="absolute bottom-[-5px] right-[-5px]">
            <HiMiniCheckBadge className="text-sm text-gray-400" />
          </span>
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-[15px] group-hover:text-indigo-800 dark:group-hover:text-indigo-400 text-neutral-900 dark:text-neutral-100 font-medium">
          {post.title}
          {post.draft && (
            <BadgeLabel labelType="draft" className="ml-2">
              draft
            </BadgeLabel>
          )}
        </h2>
      </div>
      {(post.createdDate || post.updatedDate) && (
        <div className="gap-2 hidden md:flex items-center">
          {['updated', 'updatedWithin'].includes(status) && post.updatedDate && (
            <BadgeLabel labelType={status}>
              <DateComponent
                dateString={post.updatedDate}
                format="MMM DD, YYYY"
                humanize={options?.humanizeDate}
                dateLabel={options?.updatedOnLabel || 'updated'}
              />
            </BadgeLabel>
          )}
          {status === 'new' && (
            <div
              className={cn(
                'px-3 py-0.5 text-[0.8rem] rounded-md whitespace-nowrap',
                'bg-amber-200 text-amber-900'
              )}
            >
              {options?.newLabel || 'new'}
            </div>
          )}
          {post.createdDate && (
            <DateComponent
              className="text-[0.8rem] text-slate-500 group-hover:text-slate-700"
              dateString={post.createdDate}
              format="MMM DD, YYYY"
              humanize={options?.humanizeDate}
              dateLabel={options?.addedOnLabel || 'added'}
            />
          )}
        </div>
      )}
      {/* <div className="gap-2 hidden md:flex items-center">
        <Badge label={`updated ${getFormattedDate(post.updatedDate)}`} color="green" />
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          added {getFormattedDate(post.createdDate)}
        </span>
      </div> */}
    </Link>
  )
}
