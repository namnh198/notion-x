'use client'
import { cn } from '../lib/utils'
import React from 'react'
import type { Post } from '../interface'
import PostSimple, { PostSimpleOpts } from '../post-types/PostSimple'

export type PostType = 'simple'
export type PostTypeOpts = PostSimpleOpts

type PostListProps = {
  posts: Post[]
  postType?: PostType
  options?: {
    className?: string
  }
  postTypeOpts?: PostSimpleOpts
}

export const postListClass = cn(
  'rounded-xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-700'
)

export default function PostList({
  posts,
  postType = 'simple',
  options,
  postTypeOpts
}: PostListProps) {
  return (
    <section className={options?.className || postListClass}>
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {posts.map(post => (
            <React.Fragment key={post.id}>
              {getPostTypeElement(postType, post, postTypeOpts)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

const getPostTypeElement = (postType: PostType, post: Post, options: any): JSX.Element => {
  switch (postType) {
    case 'simple':
      return <PostSimple post={post} options={options} />
    default:
      return <></>
  }
}
