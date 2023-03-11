import { getTranslation } from '@src/languages'
import React from 'react'

const Home: React.FC = () => {
  return (
    <div className='h-full'>
      <h3 className="page-title">{getTranslation("sideMenu.home")}</h3>
      <p className='basic-text mt-10'>Bievenue sur CryptiPics</p>
      <div className='flex items-center mt-16'>
        <div className='flex flex-col justify-center space-y-6'>
          <div className='flex flex-row justify-between'>
            <div className='card flex flex-col justify-between w-1/2 mr-6 transition-all duration-200 hover:animate-waving-hand hover:bg-blue-200 hover:dark:bg-blue-900/50 cursor-pointer hover:shadow-inner'>
              <h1 className="text-xl font-bold section-title">{getTranslation("homePage.crypttitle")}</h1>
              <img src="./img/examples/decrypted.png" alt="" className='max-h-64' />
              <p className="basic-text">{getTranslation("homePage.crypttext")}</p>
            </div>
            <div className='card flex flex-col justify-between w-1/2 transition-all duration-200 hover:animate-waving-hand hover:bg-blue-200 hover:dark:bg-blue-900/50 cursor-pointer hover:shadow-inner'>
              <h1 className="text-xl font-bold section-title">{getTranslation("homePage.steganographytitle")}</h1>
              <img src="./img/examples/steganography.png" alt="" className='max-h-64' />
              <p className="basic-text">{getTranslation("homePage.steganographytext")}</p>
            </div>
          </div>
          <div className='card flex flex-col justify-between w-96 mx-auto transition-all duration-200 hover:animate-waving-hand hover:bg-blue-200 hover:dark:bg-blue-900/50 cursor-pointer hover:shadow-inner'>
            <h1 className="text-xl font-bold section-title">{getTranslation("homePage.commingsoontitle")}</h1>
            <p className="basic-text">{getTranslation("homePage.commingsoontext")}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
