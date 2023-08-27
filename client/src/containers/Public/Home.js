import React from 'react'
import { Header, Navigation } from './'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className='w-full flex flex-col items-center h-full border border-red-500'>
            <Header />
            <Navigation />
            <div className='w-1100 flex flex-col items-center justify-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home