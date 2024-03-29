'use client'

import dynamic from 'next/dynamic'
import * as types from 'notion-types'
import { TableOfContentsEntry } from 'notion-utils'
import React, { useState } from 'react'
import { cn } from '../lib/utils'

import { useHeadsObserver } from '../hooks/hook'
import IoIosArrowDown from '../icons/IoIosArrowDown'
import { generateAnchor } from '../lib/helpers'
import { Text } from './text'

type PostTocProps = {
  recordMap: types.ExtendedRecordMap
  tocs: TableOfContentsEntry[]
  inPost?: boolean // This component is used in 2 places: post-body and [postSlug]
  minNumHeadingsToShowToc?: number
  labelTocTitle?: string
  labelTocClassName?: string
  showContent?: boolean
}
// @ts-ignore
const Equation = dynamic(() => import('./blocks/equation'))
// @ts-ignore
const Code = dynamic(() => import('./blocks/code'), { ssr: false })

/**
 * IMPORTANT: Add class "scroll-mt-[70px]" to the heading elements!
 */

export default function PostToc(props: PostTocProps) {
  const [showContent, setShowContent] = useState(props.showContent)
  const components = React.useMemo(
    () => ({
      Code,
      Equation
    }),
    []
  )

  const showToc = props.tocs.length >= (props.minNumHeadingsToShowToc || 4)

  const { activeId } = useHeadsObserver()

  if (!showToc) return null

  return (
    <nav
      className={cn(
        'h-fit w-full flex gap-2 flex-col px-4 py-3 bg-slate-50 dark:bg-neutral-800 border border-neutral-200 dark:border-slate-600 rounded-xl notion-box-shadow',
        {
          '2xl:hidden': props.inPost, // hide on large screens
          'max-h-full p-3': !props.inPost,
          'border-[0.5px] border-neutral-200 dark:border-slate-600': !props.inPost,
          'max-h-[350px] mt-8 mb-10': props.inPost,
          border: props.inPost
        }
      )}
      aria-label="Table of contents"
    >
      <button
        className={cn('flex items-center justify-between text-md font-semibold pb-0')}
        onClick={() => setShowContent(!showContent)}
      >
        <div className={props.labelTocClassName}>{props.labelTocTitle || 'In this post'}</div>
        <div>
          <IoIosArrowDown
            className={cn('text-2xl ease-in-out transition-all duration-[400ms]', {
              'rotate-0': showContent,
              'rotate-[-90deg]': !showContent
            })}
          />
        </div>
      </button>
      {showContent && (
        <div
          className={cn(
            'pt-3 pl-1 overflow-auto notion-scrollbar notion-scrollbar-small border-t border-neutral-200 dark:border-slate-600',
            {
              'columns-1 md:columns-2': props.inPost
            }
          )}
        >
          {props.tocs.map(toc => {
            const anchor = generateAnchor(toc.id, toc.text)
            const isH2 = toc.indentLevel === 0
            const isH3 = toc.indentLevel === 1

            const block = props.recordMap?.block?.[toc.id]?.value

            return (
              <a
                key={toc.id}
                href={`#${anchor}`}
                className={cn(
                  'flex items-baseline gap-2 hover:notion-link text-sm py-1 break-inside-avoid',
                  {
                    'pl-4 border-l border-neutral dark:border-slate-600': isH3,
                    '-ml-1': isH2,
                    'font-semibold hover:font-semibold text-slate-700 dark:text-slate-200 hover:notion-link-hover':
                      activeId === anchor && !props.inPost,
                    'text-slate-700 dark:text-slate-400 hover:notion-link-hover':
                      activeId !== anchor || props.inPost
                  }
                )}
              >
                {isH2 && <span className="text-[0.7rem] text-slate-400">◆</span>}
                {isH3 && <span className="text-[0.6rem] text-slate-400">○</span>}
                {!block?.properties?.title && <span className="block">{toc.text}</span>}
                {block?.properties?.title && (
                  <span>
                    <Text
                      ignoreMarkup={['_', 'a', 'b', 'u', 'h']}
                      components={components}
                      value={block.properties.title}
                      block={block}
                    />
                  </span>
                )}
              </a>
            )
          })}
        </div>
      )}
    </nav>
  )
}
