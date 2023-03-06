import { faImage, faHouse, faGear, faEnvelopeOpenText, faTextSlash, faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import routes from '@routes'
import React from 'react'

interface SideBarItem {
  name: string
  path: string
  icon?: () => JSX.Element
}

const sidebar: SideBarItem[] = [
  {
    name: 'home',
    path: routes.HOME,
    icon: () => <FontAwesomeIcon className="w-5 h-5" icon={faHouse} />
  },
  {
    name: 'crypt',
    path: '/crypt',
    icon: () => <FontAwesomeIcon className="w-5 h-5" icon={faImage} />
  },
  {
    name: 'steganography',
    path: '/steganography',
    icon: () => <FontAwesomeIcon className="w-5 h-5" icon={faEnvelopeOpenText} />
  },
  // {
  //   name: 'privatetext',
  //   path: '/texts',
  //   icon: () => <FontAwesomeIcon className="w-5 h-5" icon={faTextSlash} />
  // },
  {
    name: 'account',
    path: '/account',
    icon: () => <FontAwesomeIcon className="w-5 h-5" icon={faPerson} />
  },
  {
    name: 'settings',
    path: '/settings',
    icon: () => <FontAwesomeIcon className="w-5 h-5" icon={faGear} />
  }
]

export default sidebar
