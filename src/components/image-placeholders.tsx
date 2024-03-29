import React from 'react'
import { cn } from '../lib/utils'

import AiOutlineLoading3Quarters from '../icons/AiOutlineLoading3Quarters'

export function ImagePlaceholderPostHeader() {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center w-full h-full',
        'flex flex-col'
      )}
    >
      <AiOutlineLoading3Quarters className="text-[60px] text-white animate-spin" />
    </div>
  )
}
