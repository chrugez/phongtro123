import React, { memo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

const notActive = 'w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md'
const active = 'w-[46px] h-[48px] flex justify-center items-center bg-secondary2 hover:opacity-90 rounded-md cursor-pointer text-white'

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {

    const navigate = useNavigate()

    const handleChangePage = () => {
        if (!(text === '...')) {
            setCurrentPage(+text)
            navigate({
                pathname: "/",
                search: createSearchParams({
                    page: text
                }).toString()
            })
        }
    }

    return (
        <div
            className={+text === +currentPage ? active : `${notActive} ${text === '...' ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={handleChangePage}
        >
            {icon || text}
        </div>
    )
}

export default memo(PageNumber)