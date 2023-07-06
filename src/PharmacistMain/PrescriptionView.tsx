import { Link } from 'react-router-dom'
import { PrescriptionStatus } from '../types'
import { useEffect, useState } from 'react'
import { useGetPrescription, useMutatePrescription } from './apiCalls'

const PrescriptionView = () => {
    const [status, setStatus] = useState<PrescriptionStatus | null>(null)

    const { data } = useGetPrescription()
    const mutation = useMutatePrescription(setStatus)

    const handleChange = (e: any) => {
        mutation.mutate(e.target.value)
    }

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status)
        }
    }, [data])

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
                        value={status || ''}
                    >
                        <option>{PrescriptionStatus.IN_PROGRESS}</option>
                        <option>{PrescriptionStatus.PENDING}</option>
                        <option>{PrescriptionStatus.FILLED}</option>
                    </select>
                </div>
                <div>Patient: <Link to={`/patients/${data?.userId}`}>{data?.patient?.firstName} {data?.patient?.lastName}</Link></div>
            </form>
        </div>
    )
}

export default PrescriptionView
