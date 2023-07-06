import { useParams } from 'react-router-dom'
import { PrescriptionStatus } from '../types'
import { useEffect, useState } from 'react'
import {
    useQuery,
    useMutation,
  } from '@tanstack/react-query'

const PrescriptionView = () => {
    const params = useParams()

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ['prescription'],
        queryFn: () => fetch(`http://localhost:4000/prescriptions/${params.id}`).then((res) => res.json())
      })
    const [status, setStatus] = useState<PrescriptionStatus | null>(null)

    const mutation = useMutation({
        mutationFn: (status) => {
            return fetch(`http://localhost:4000/prescriptions/${params.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }).then(res => {
                const result = res.json()
                return result
            })
        },
        onSuccess: (data) => {
            setStatus(data[0].status)
        }
      })

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
            </form>
        </div>
    )
}

export default PrescriptionView
