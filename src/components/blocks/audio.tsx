import { AudioBlock } from 'notion-types'
import * as React from 'react'

import { cn } from '../lib/utils'
import { useNotionContext } from '../../hooks/context'

export const Audio: React.FC<{
  block: AudioBlock
  className?: string
}> = ({ block, className }) => {
  const { recordMap } = useNotionContext()
  const source = recordMap.signed_urls[block.id] || block.properties?.source?.[0]?.[0]

  return (
    <div className={cn('notion-audio', [className])}>
      <audio controls preload="none" src={source} />
    </div>
  )
}
