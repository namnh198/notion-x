'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ExtendedRecordMap, PreviewImage } from 'notion-types'
import * as React from 'react'

import { BlockOptionsContextType } from '../hooks/context'
import { NotionRenderer } from './renderer'
import { SimpleImageProps } from './SimpleImage'

type PostBodyProps = {
  recordMap: ExtendedRecordMap
  className?: string
  blockOptions?: BlockOptionsContextType
  customPreviewImage?: PreviewImage
  useSimpleImage?: boolean
  simpleImageProps?: SimpleImageProps
}

const Equation = dynamic(() => import('./blocks/equation'))
const Code = dynamic(() => import('./blocks/code'))

// In case we need more suppored components, check this out:
// https://github.com/transitive-bullshit/nextjs-notion-starter-kit/blob/main/components/NotionPage.tsx
export default function PostBody(props: PostBodyProps) {
  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      Equation
    }),
    []
  )

  return (
    <div className={props.className}>
      <NotionRenderer
        recordMap={props.recordMap}
        fullPage={true}
        darkMode={false}
        components={components}
        showTableOfContents={false}
        minTableOfContentsItems={3}
        disableHeader={true}
        previewImages={true}
        blockOptions={props.blockOptions}
        customPreviewImage={props.customPreviewImage}
        useSimpleImage={props.useSimpleImage}
        simpleImageProps={props.simpleImageProps}
      />
    </div>
  )
}
