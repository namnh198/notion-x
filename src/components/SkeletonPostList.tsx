import React from 'react'
import IsDocumentText from '../icons/IsDocumentText'
import { cn } from '../lib/utils'
import { PostType, postListClass } from './PostList'

type SkeletonPostListProps = {
  count: number
  postType?: PostType
  options?: {
    className?: string
  }
}

export default function SkeletonPostList({
  count,
  postType = 'simple',
  options
}: SkeletonPostListProps) {
  return (
    <>
      <div className={cn(options?.className || postListClass, 'animate-pulse')}>
        {Array.from({ length: count }).map((_, index) => getSkeleton(index, postType))}
      </div>
    </>
  )
}

const getSkeleton = (key: number, postType: PostType): JSX.Element => {
  switch (postType) {
    case 'simple':
      return <PostSimpleSkeleton key={key} />
    default:
      return <></>
  }
}

const PostSimpleSkeleton = (): JSX.Element => (
  <div className="flex items-center gap-3 py-3 px-2">
    <div>
      <IsDocumentText className="text-xl text-slate-700" />
    </div>
    <div className="flex-1 flex justify-start">
      <div className="h-6 w-3/4 rounded-md bg-slate-200"></div>
    </div>
    <div className="h-4 w-[150px] rounded-md bg-slate-200"></div>
  </div>
)
