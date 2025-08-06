/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from 'react'
import ColorThief from 'colorthief'
import { limitBrightness } from '@/utils/color'

interface FillEggCrackIconProps extends React.SVGProps<SVGSVGElement> {
  image?: string
}

export const FillEggCrackIcon = (props: FillEggCrackIconProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [color, setColor] = useState<string>('#80828D') // fallback

  useEffect(() => {
    if (!props?.image) return
    const img = imgRef.current
    if (img && img.complete) {
      getColor()
    } else {
      img?.addEventListener('load', getColor)
    }

    function getColor() {
      if (!imgRef.current) return
      const colorThief = new ColorThief()
      const [r, g, b] = colorThief.getColor(imgRef.current)
      const [r2, g2, b2] = limitBrightness([r, g, b], 60)
      setColor(`rgb(${r2}, ${g2}, ${b2})`)
    }
  }, [props?.image])

  return (
    <>
      {props?.image && (
        <img
          ref={imgRef}
          src={props?.image}
          crossOrigin="anonymous"
          alt="logo"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
      )}
      <svg width="16" height="16" viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M13.5 9.5C13.4982 10.956 12.9199 12.352 11.8915 13.3827C10.8631 14.4134 9.46846 14.9949 8.0125 15C4.84625 15.0075 2.37438 12.3125 2.505 9.14875C2.58063 7.32313 3.23688 5.365 4.33188 3.7225C5.46875 2.01813 6.83938 1 8 1C8.82813 1 9.76438 1.52 10.6463 2.4375C10.6899 2.48302 10.7147 2.54334 10.7158 2.6064C10.7168 2.66945 10.694 2.73057 10.6519 2.7775L7.625 6.16687C7.56765 6.23097 7.5278 6.30878 7.50931 6.39278C7.49082 6.47678 7.49432 6.56413 7.51945 6.64639C7.54459 6.72864 7.59052 6.80303 7.6528 6.86234C7.71508 6.92166 7.79162 6.96391 7.875 6.985L9.41313 7.36938L9.00625 9.40187C8.98032 9.53191 9.0071 9.66693 9.08071 9.77722C9.15431 9.88751 9.26872 9.96405 9.39875 9.99C9.43205 9.9969 9.46599 10.0003 9.5 10C9.61542 9.99979 9.72722 9.95966 9.81642 9.88641C9.90561 9.81316 9.96672 9.7113 9.98938 9.59813L10.4894 7.09812C10.5146 6.97217 10.4903 6.84134 10.4217 6.73277C10.353 6.6242 10.2452 6.54622 10.1206 6.515L8.92313 6.21562L11.2288 3.6325C11.254 3.60417 11.2854 3.58196 11.3206 3.56757C11.3557 3.55318 11.3937 3.54699 11.4316 3.54946C11.4695 3.55193 11.5063 3.563 11.5393 3.58183C11.5722 3.60066 11.6005 3.62675 11.6219 3.65812C11.6369 3.67937 11.6513 3.70062 11.6656 3.72062C12.8313 5.47125 13.5 7.57687 13.5 9.5Z" />
      </svg>
    </>
  )
}
