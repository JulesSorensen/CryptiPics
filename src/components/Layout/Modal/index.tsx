import { XIcon } from '@heroicons/react/outline'
import React from 'react'
import { Modal as ResponsiveModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import './styles.pcss'

interface IModal {
  active: boolean
  title?: string
  toggle: () => void
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

const Modal: React.FC<IModal> = ({ title = '', active, toggle, children, onClose, className = '' }) => {
  const handleClose = () => {
    toggle()

    if (onClose) {
      onClose()
    }
  }

  return (
    <ResponsiveModal
      open={active}
      onClose={handleClose}
      showCloseIcon={false}
      classNames={{
        modal: `modal ${className} dark:bg-slate-700 dark:text-white`
      }}
      center
    >
      <div className="flex justify-between items-center mb-5">
        <div className="text-2xl font-bold ml-2">{title}</div>
        <div className="text-2xl cursor-pointer" onClick={handleClose}>
          <XIcon className="w-5 h-5" />
        </div>
      </div>
      <>{children}</>
    </ResponsiveModal>
  )
}

export default Modal
