'use client'

import mediumZoom from '@fisch0920/medium-zoom'
import React, { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

import PiImageSquareDuotone from '../icons/PiImageSquareDuotone'

/* eslint-disable @next/next/no-img-element */

export type SimpleImageProps = {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  imagePlaceholder?: React.ReactNode
  zoomable?: boolean
}

export default function SimpleImage(props: SimpleImageProps) {
  const [loaded, setLoaded] = useState(false)
  const isZoomable = props.zoomable ?? false

  useEffect(() => {
    if (props.src) {
      const img = new Image()
      img.src = props.src
      img.onload = () => {
        setLoaded(true)
      }
    }
  }, [props.src])

  const zoom = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      mediumZoom({
        background: 'rgba(0, 0, 0, 0.8)',
        minZoomScale: 2.0,
        margin: getMediumZoomMargin()
      }),
    []
  )

  const zoomRef = React.useRef(zoom ? zoom.clone() : null)
  const aspectRatio = {
    width: props.width || props.style?.width,
    height: props.height || props.style?.height
  }

  const attachZoom = React.useCallback(
    (image: any) => {
      if (zoomRef.current && image) {
        ;(zoomRef.current as any).attach(image)
      }
    },
    [zoomRef]
  )

  const attachZoomRef = React.useMemo(
    () => (isZoomable ? attachZoom : undefined),
    [isZoomable, attachZoom]
  )

  return (
    <>
      {loaded ? null : (
        <>
          {!!props.imagePlaceholder && props.imagePlaceholder}
          {!props.imagePlaceholder && (
            <div
              style={{
                width: props.width || props.style?.width || 'auto',
                height: props.height || props.style?.height || 'auto'
              }}
              className={cn(
                'bg-gray-100 flex items-center justify-center animate-pulse',
                props.className
              )}
            >
              <PiImageSquareDuotone className="text-[25px] text-slate-400" />
            </div>
          )}
        </>
      )}
      {loaded && props.src && (
        <img
          src={props.src}
          alt={props.alt || 'Undefined image name'}
          className={props.className}
          style={{ ...props.style, ...aspectRatio }}
          {...aspectRatio}
          ref={attachZoomRef}
          loading="lazy"
          decoding="async"
        />
      )}
    </>
  )
}

function getMediumZoomMargin() {
  const width = window.innerWidth

  if (width < 500) {
    return 8
  } else if (width < 800) {
    return 20
  } else if (width < 1280) {
    return 30
  } else if (width < 1600) {
    return 40
  } else if (width < 1920) {
    return 48
  } else {
    return 72
  }
}
