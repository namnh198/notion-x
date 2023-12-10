import {
  EquationRichTextItemResponse,
  RichTextItemResponse,
  TextRichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'
import dynamic from 'next/dynamic'
import React from 'react'

import { TextIgnoreField } from '../../interface'
import BlockText from './text'

const DynamicInlineEquation = dynamic(() => import('./inline-equation'))

type BlockRichTextProps = {
  richText: RichTextItemResponse
  ignore?: TextIgnoreField[]
  mathFontSize?: string
}

export default function BlockRichText(props: BlockRichTextProps) {
  switch (props.richText.type) {
    case 'text':
    case 'mention':
      return (
        <BlockText richText={props.richText as TextRichTextItemResponse} ignore={props.ignore} />
      )
    case 'equation':
      return (
        <DynamicInlineEquation
          equation={props.richText as EquationRichTextItemResponse}
          fontSize={props.mathFontSize}
        />
      )
    default:
      return <BlockText richText={props.richText as TextRichTextItemResponse} />
  }
}
