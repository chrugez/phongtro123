import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from '../components'
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../services'
import { useSelector } from 'react-redux'

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {

    const { dataEdit } = useSelector(state => state.post)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [reset, setReset] = useState(false)

    useEffect(() => {
        let addressArr = dataEdit?.address?.split(',')
        let foundProvince = provinces.length > 0 && provinces?.find(item => item?.province_name.trim() === addressArr[addressArr.length - 1].trim())
        setProvince(foundProvince ? foundProvince.province_id : '')
    }, [provinces])

    useEffect(() => {
        let addressArr = dataEdit?.address?.split(',')
        let foundDistrict = districts.length > 0 && districts?.find(item => item?.district_name.trim() === addressArr[addressArr.length - 2].trim())
        setDistrict(foundDistrict ? foundDistrict.district_id : '')
    }, [districts])

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data?.results)
            }
            // console.log(response);
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict("")
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response?.data?.results)
            }
            // console.log(response);
        }
        province && fetchPublicDistrict(province)
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${district ? `${districts.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces.find(item => item.province_id === province)?.province_name : ''}`,
            province: `${province ? provinces.find(item => item.province_id === province)?.province_name : ''}`
        }))
    }, [province, district])

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        type='province'
                        value={province}
                        setValue={setProvince}
                        options={provinces}
                        label='Tỉnh/TP'
                    />
                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        reset={reset}
                        type='district'
                        value={district}
                        setValue={setDistrict}
                        options={districts}
                        label='Quận/Huyện'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <InputReadOnly label='Địa chỉ chính xác' value={`${district ? `${districts.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces.find(item => item.province_id === province)?.province_name : ''}`} />
                </div>
            </div>
        </div>
    )
}

export default memo(Address)