import React from 'react'

export const LoadingIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
      {...props}
    >
      <defs>
        <linearGradient id="spinnerGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDFDFD" />
          <stop offset="100%" stopColor="#16181C" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="url(#spinnerGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="93 100"
      />
    </svg>
  )
}
