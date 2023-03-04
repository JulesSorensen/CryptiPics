import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ className = '', children, onClick, ...props }) => {
  return (
    <button
      className={`bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
