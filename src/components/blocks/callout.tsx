import React from 'react'
import { cn } from '../../lib/utils'

import { mapColorClass } from '../../lib/helpers'

export default function BlockCallout(props: {
  text: React.ReactNode
  icon: React.ReactNode
  color?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn(props.className)}>
      <div
        className={cn(
          'flex rounded-md',
          mapColorClass(props.color) ||
            'bg-transparent border border-neutral-200 dark:border-slate-600'
        )}
      >
        {props.icon && <div className="text-2xl pl-4 py-3">{props.icon}</div>}
        <div className="pl-2 pr-4 w-0 flex-1">
          <div className="mt-4 mb-3">{props.text}</div>
          {!!props.children && <div className="notion-inside-box">{props.children}</div>}
          <div className="my-4"></div>
        </div>
      </div>
    </div>
  )
}
