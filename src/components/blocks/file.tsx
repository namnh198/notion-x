import { FileBlock } from 'notion-types'
import * as React from 'react'

import { useNotionContext } from '../../hooks/context'
import BsPaperclip from '../../icons/BsPaperclip'
import { cn } from '../../lib/utils'
import { Text } from '../text'

export const File: React.FC<{
  block: FileBlock
  className?: string
}> = ({ block, className }) => {
  const { components, recordMap } = useNotionContext()
  const source = recordMap.signed_urls[block.id] || block.properties?.source?.[0]?.[0]

  return (
    <div className={cn('notion-file', [className])}>
      <components.Link
        className="notion-file-link"
        href={source}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsPaperclip className="notion-file-icon" />

        <div className="notion-file-info">
          <div className="notion-file-title">
            <Text value={block.properties?.title || [['File']]} block={block} />
          </div>

          {block.properties?.size && (
            <div className="notion-file-size">
              <Text value={block.properties.size} block={block} />
            </div>
          )}
        </div>
      </components.Link>
    </div>
  )
}
