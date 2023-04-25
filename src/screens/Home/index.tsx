import { getTranslation } from '@src/languages'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '@routes'

const Home: React.FC = () => {
  return (
    <div className='flex flex-col h-full'>
      <h3 className="page-title">{getTranslation("sideMenu.home")}</h3>
      <div className='flex justify-center items-center h-full m-y-auto'>
        <div className='flex flex-col max-w-5xl w-full justify-center space-y-6'>
          <div className='flex flex-row justify-around'>
            <Link to={routes.CRYPT} className='home-card'>
              <h1 className="text-xl font-bold section-title">{getTranslation("homePage.crypttitle")}</h1>
              <img src="./img/examples/decrypted.png" alt="Encrypted and decrypted picture" className='mt-3 mb-1 max-h-32 mx-auto' />
              <p className="basic-text">{getTranslation("homePage.crypttext")}</p>
            </Link>
            <Link to={routes.STEGANOGRAPHY} className='home-card'>
              <h1 className="text-xl font-bold section-title">{getTranslation("homePage.steganographytitle")}</h1>
              <img src="./img/examples/steganography.png" alt="Steganography text exemple" className='mt-3 mb-1 max-h-32 mx-auto' />
              <p className="basic-text">{getTranslation("homePage.steganographytext")}</p>
            </Link>
          </div>
          <Link to={routes.PASTEBIN} className='home-card mx-auto'>
              <h1 className="text-xl font-bold section-title">{getTranslation("homePage.pastebintitle")}</h1>
              <img src="./img/examples/clipboard.png" alt="Clipboard icon" className='mt-3 mb-1 max-h-32 mx-auto' />
              <p className="basic-text">{getTranslation("homePage.pastebintext")}</p>
            </Link>
        </div>
      </div>

    </div>
  )
}

export default Home
