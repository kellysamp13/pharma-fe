import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PrescriptionStatus } from '../schemas/Prescription'
import { useGetPrescription, useMutatePrescription } from './apiCalls'

const PrescriptionView = () => {
    const [status, setStatus] = useState<PrescriptionStatus | null>(null)

    const { data } = useGetPrescription()
    const mutation = useMutatePrescription(setStatus)

    // getting an error for mutate when removing any
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        mutation.mutate(e.target.value)
    }

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status)
        }
    }, [data])

    return (
        <div className="py-10 px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">
            <form className="flex justify-between mb-4">
                <div>Prescription: {data?.name}</div>
                <div>
                    <label className="mr-3" htmlFor="status">Fulfillment Status</label>
                    <select
                        id="status"
                        name="status"
                        onChange={handleChange}
                        value={status || ''}
                    >
                        <option>{PrescriptionStatus.IN_PROGRESS}</option>
                        <option>{PrescriptionStatus.PENDING}</option>
                        <option>{PrescriptionStatus.FILLED}</option>
                    </select>
                </div>
                <div>Refills: {data?.refills}</div>
            </form>

            <Link
                className="text-teal-600 font-bold"
                to={`/patients/${data?.userId}`}
            >
                View Patient Info
            </Link>
        </div>
    )
}

export default PrescriptionView
