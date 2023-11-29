import React from 'react'

export default function HiOutlineXMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
