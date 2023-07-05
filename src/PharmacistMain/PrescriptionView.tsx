import { useParams } from 'react-router-dom'
import useSwr from 'swr'
import { PrescriptionStatus } from '../types'
import React, { useState } from 'react'

const PrescriptionView = () => {
    const getPrescriptionFetcher = (url: string) => fetch(url).then((res) => res.json())
    const putPrescriptionFetcher = (url: string, status: PrescriptionStatus) => fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    }).then((res) => res.json())
    const [shouldPut, setShouldPut] = useState<boolean>(false)
    const params = useParams()
    // get
    const { data, error, isLoading } = useSwr(`http://localhost:4000/prescriptions/${params.id}`, getPrescriptionFetcher)
    const [status, setStatus] = useState<PrescriptionStatus>(data?.status)
    // put
    const { data: postData } = useSwr(shouldPut ? [`http://localhost:4000/prescriptions/${params.id}`, status] : null, ([url, status]) => putPrescriptionFetcher(url, status))

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // on change this should update in the api
        setStatus(e.target.value as PrescriptionStatus)
        setShouldPut(true)
    }

    return (
        <div className="py-10 px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">
            <form>
                <div>Prescription: {data?.name}</div>
                <div>Refills: {data?.refills}</div>
                <div className="mb-4 flex justify-between">
                    <label className="mr-3" htmlFor="status">Fulfillment Status</label>
                    <select
                        className="w-[50%]"
                        id="status"
                        name="status"
                        onChange={handleChange}
                        value={data?.status}
                    >
                        <option>{PrescriptionStatus.IN_PROGRESS}</option>
                        <option>{PrescriptionStatus.PENDING}</option>
                        <option>{PrescriptionStatus.FILLED}</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default PrescriptionView
