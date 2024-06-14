import { Block } from 'notion-types'
import * as React from 'react'

import FaGithub from '../../icons/FaGithub'
import hexImg from '../../icons/HexSquareLogo.png'
import RxDotFilled from '../../icons/RxDotFilled'
import RxDotHorizontal from '../../icons/RxDotHorizontal'
import { cn, formatNotionDateTime } from '../../lib/utils'
import { LazyImage } from '../lazy-image'


// External Object Instance
export const EOI: React.FC<{
  block: Block
  inline?: boolean
  className?: string
  updatedBlock?: React.JSX.Element
}> = ({ block, inline, className, updatedBlock }) => {
  const { original_url, attributes, domain } = block?.format || {}
  if (!original_url || !attributes) {
    return null
  }

  const title = attributes.find((attr: { id: string }) => attr.id === 'title')?.values[0]

  if(original_url.indexOf('app.hex.tech') !== -1) {
    let description = attributes.find((attr: { id: string }) => attr.id === 'description')?.values[0]
    const createdAt = attributes.find((attr: { id: string }) => attr.id === 'createdDate')?.values[0]
    const createDate = createdAt ? formatNotionDateTime(createdAt) : null
    return <HexComponent title={title} description={description} className={className} original_url={original_url} createdDate={createDate}  />
  }

  
  let owner = attributes.find((attr: { id: string }) => attr.id === 'owner')?.values[0]
  const lastUpdatedAt = attributes.find((attr: { id: string }) => attr.id === 'updated_at')
    ?.values[0]
  const lastUpdated = lastUpdatedAt ? formatNotionDateTime(lastUpdatedAt) : null

  switch (domain) {
    case 'github.com':
      if (owner) {
        const parts = owner.split('/')
        owner = parts[parts.length - 1]
      }
      break

    default:
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `Unsupported external_object_instance domain "${domain}"`,
          JSON.stringify(block, null, 2)
        )
      }

      return null
  }

  return (
    <>
      {!inline && (
        <a
          className={cn(
            className,
            'p-3 no-underline border border-neutral-200/70 dark:border-slate-600 rounded-md hover:cursor-pointer flex gap-3 flex-row items-center group relative hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors'
          )}
          target="_blank"
          href={original_url}
          rel="noopener noreferrer"
        >
          {!!updatedBlock && updatedBlock}
          <FaGithub className="text-4xl" />
          <div className={cn('flex gap-0 flex-col')}>
            <div className="text-base">{title}</div>
            <div className="flex flex-row gap-1 items-center text-slate-500 dark:text-slate-400 text-sm">
              <div>{owner}</div>
              <RxDotFilled />
              <div>{lastUpdated}</div>
            </div>
          </div>
        </a>
      )}
      {inline && (
        <a
          className="px-1 no-underline hover:cursor-pointer inline-flex gap-1 flex-row items-baseline group"
          target="_blank"
          href={original_url}
          rel="noopener noreferrer"
        >
          <FaGithub className="text-sm" />
          <div className="text-base leading-[1.1]">{title}</div>
        </a>
      )}
    </>
  )
}

const HexComponent = ({
  title,
  description,
  original_url,
  className,
  updatedBlock,
  createdDate
}: {
  title: string,
  description: string,
  original_url: string,
  className?: string,
  updatedBlock?: any,
  createdDate?: any
}) => (
  <a
    className={cn(
      className,
      'p-3 no-underline border border-neutral-200/70 dark:border-slate-600 rounded-md hover:cursor-pointer flex gap-3 flex-row items-center group relative hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors'
    )}
    target="_blank"
    href={original_url}
    rel="noopener noreferrer"
  >
    {!!updatedBlock && updatedBlock}
    <LazyImage src={hexImg.src} alt='Hex'/>
    <div className={cn('flex flex-col')}>
      <div className="text-base">{title}</div>
      <div className='text-slate-500 dark:text-slate-400 text-xs'>{description}</div>
      <div className='mt-4 mb-2 text-slate-400'>
        <RxDotHorizontal/>
      </div>
      <div className='text-slate-400 dark:text-slate-400 text-xs'>{createdDate}</div>
    </div>
  </a>
)