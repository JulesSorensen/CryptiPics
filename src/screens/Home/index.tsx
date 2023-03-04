import { getTranslation } from '@src/languages'
import React from 'react'

const Home: React.FC = () => {
  return (
    <div>
      <h3 className="page-title">{getTranslation("sideMenu").home}</h3>
    </div>
  )
}

export default Home
