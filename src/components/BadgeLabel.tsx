'use client'

import React from 'react'
import { cn } from '../lib/utils'

type LabelTypeVariant = 'normal' | 'draft' | 'new' | 'updated' | 'updatedWithin'

type BadgeLabelProps = {
  labelType: LabelTypeVariant
  children: React.ReactNode
  className?: string
}

export default function BadgeLabel({ children, labelType, className }: BadgeLabelProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs items-start rounded-md whitespace-nowrap font-medium',
        getLabelColor(labelType),
        [className]
      )}
    >
      <span>{children}</span>
    </span>
  )
}

const getLabelColor = (type: LabelTypeVariant) => {
  return cn({
    'text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700': type === 'draft',
    'bg-amber-200 text-amber-900': type === 'new',
    'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200': type === 'updated',
    'bg-green-200 text-green-900': type === 'updatedWithin'
  })
}
