'use client'

import mermaid from 'mermaid'
import React, { useEffect } from 'react'

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  themeVariables: {
    lineColor: 'var(--tw-prose-body)'
  },
  securityLevel: 'loose'
})

export default function Mermaid({ chart }: { chart: string }) {
  useEffect(() => {
    mermaid.contentLoaded()
  }, [])
  return (
    <div className="mermaid flex justify-center" suppressHydrationWarning>
      {chart}
    </div>
  )
}
