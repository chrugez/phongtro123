import React from 'react'
import { Header, Navigation, Search } from './'
import { Outlet } from 'react-router-dom'
import { Intro, Contact } from '../../components'
import { useSelector } from 'react-redux'

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)

    return (
        <div className='w-full flex flex-col gap-6 items-center h-full'>
            <Header />
            <Navigation />
            {isLoggedIn && <Search />}
            <div className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <div className='h-[500px]'></div>
        </div>
    )
}

export default Home