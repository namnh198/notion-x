'use client'

import React from 'react'
import { cn } from '../../lib/utils'

import { getYoutubeId } from '../../lib/utils'
import YoutubeEmbed from './youtube'

type BlockVideoProps = {
  caption: React.ReactNode
  videoUrl: string
  className?: string
}

export default function BlockVideo(props: BlockVideoProps) {
  const videoId = getYoutubeId(props.videoUrl)
  if (!videoId) return null
  return (
    <div className={cn(props.className, 'flex flex-col justify-center items-center gap-2')}>
      <div className="w-full">
        <YoutubeEmbed id={videoId} title={'Youtube video'} className="aspect-video w-full" />
      </div>
      {props.caption && <div className="text-sm italic opacity-90">{props.caption}</div>}
    </div>
  )
}
