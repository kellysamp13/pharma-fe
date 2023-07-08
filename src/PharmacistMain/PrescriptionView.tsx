import { Link, useParams } from 'react-router-dom'
import { PrescriptionStatus } from '../types'
import { useEffect, useState } from 'react'
import { useGetPrescription, useMutatePrescription } from './apiCalls'

const PrescriptionView = () => {
    const [status, setStatus] = useState<PrescriptionStatus | null>(null)

    // const { data } = useGetPrescription()
    const [data, setData] = useState<any>([])
    const mutation = useMutatePrescription(setStatus)

    const handleChange = (e: any) => {
        mutation.mutate(e.target.value)
    }

    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:4000/prescriptions/${params.id}`).then((res) =>  res.json()).then(json => setData(json))
    }, [])

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status)
        }
    }, [data])

    return (
        <div className="py-10 px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">
            <form className="flex justify-between mb-4">
                <div>Prescription: {data?.name}</div>
                <div className="">
                    <label className="mr-3" htmlFor="status">Fulfillment Status</label>
                    <select
                        className=""
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
            <div>
                Patient:&nbsp;
                <Link
                    className="text-teal-600 font-bold"
                    to={`/patients/${data?.userId}`}
                >
                    {data?.patient?.firstName} {data?.patient?.lastName}
                </Link>
            </div>
        </div>
    )
}

export default PrescriptionView
