import Katex from '@matejmazur/react-katex'
import { EquationBlock } from 'notion-types'
import { getBlockTitle } from 'notion-utils'
import * as React from 'react'

import { useNotionContext } from '../../hooks/context'
import { cn } from '../../lib/utils'

const katexSettings = {
  throwOnError: false,
  strict: false
}

export default function BlockEquation(props: {
  block: EquationBlock
  math?: string
  inline?: boolean
  className?: string
}) {
  const { block, math, inline = false, className, ...rest } = props
  const { recordMap } = useNotionContext()
  const math2Use = math || getBlockTitle(block, recordMap)
  if (!math2Use) return null

  return (
    <span
      tabIndex={0}
      className={cn(
        'notion-equation',
        {
          'notion-equation-inline': !!inline,
          'block text-center overflow-x-auto overflow-y-hidden notion-scrollbar notion-scrollbar-small':
            !inline
        },
        [className]
      )}
    >
      <Katex math={math2Use} settings={katexSettings} block={!inline} {...rest} />
    </span>
  )
}
