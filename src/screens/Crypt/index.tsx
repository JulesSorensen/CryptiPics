import { getTranslation } from '@src/languages'
import React from 'react'

const Crypt: React.FC = () => {
  return (
    <div className='h-full'>
      <h3 className="page-title">{getTranslation("cryptPage.title")}</h3>
      <div className='flex items-center h-full'>

      </div>
    </div>
  )
}

export default Crypt
