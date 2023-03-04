import React from 'react'
import ReactLoaderSpinner from 'react-loader-spinner'

interface LoaderProps {
  show?: boolean
  className?: string
  height?: number
  width?: number
  absolute?: boolean
}

const Loader: React.FC<LoaderProps> = ({ show = true, className = '', height = 50, width = 50, absolute = false }) => {
  if (!show) return <></>
  return (
    <div
      className={`text-center flex justify-center flex-grow items-center ${
        absolute ? `absolute top-0 bottom-0 left-0 right-0 bg-opacity-50 bg-white` : ``
      } ${className}`}
    >
      <ReactLoaderSpinner type="TailSpin" color="#2E3748" height={height} width={width} />
    </div>
  )
}

export default Loader
