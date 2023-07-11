import { getTranslation } from '@src/languages'
import React from 'react'
import './style.pcss'

const Crypt: React.FC = () => {
  return (
    <div className='h-full'>
      <h3 className="page-title">{getTranslation("cryptPage.title")}</h3>
      <div className='flex items-center h-full'>
        <form className="tabber">
          <label htmlFor="t1">Pizza</label>
          <input id="t1" name="food" type="radio" checked />
          <label htmlFor="t2">Tacos</label>
          <input id="t2" name="food" type="radio" />
          <div className="blob"></div>
        </form>
      </div>
    </div>
  )
}

export default Crypt
