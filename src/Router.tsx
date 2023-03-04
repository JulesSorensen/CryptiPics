import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from '@screens/NotFound'
import NavContainer from '@components/Layout/NavContainer'
import TestScreen from '@screens/TestScreen'
import Login from '@screens/Login'
import routes from '@routes'
import Home from '@screens/Home'
import MyAccount from '@screens/MyAccount'
import LostPassword from '@screens/LostPassword'
import UpdateLostPassword from '@screens/UpdateLostPassword'

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavContainer children={<Home />} />} />
        <Route path={routes.HOME} element={<NavContainer children={<Home />} />} />
        <Route path={routes.MY_ACCOUNT} element={<NavContainer children={<MyAccount />} />} />

        <Route path="/test" element={<NavContainer children={<TestScreen />} />} />

        {/* Not Found Page */}
        <Route path={'*'} element={<NavContainer children={<NotFound />} />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.LOST_PASSWORD} element={<LostPassword />} />
        <Route path={routes.UPDATE_LOST_PASSWORD} element={<UpdateLostPassword />} />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Router
