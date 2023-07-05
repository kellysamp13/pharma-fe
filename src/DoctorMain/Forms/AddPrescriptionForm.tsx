import React, { useState } from 'react'
import { Prescription, PrescriptionStatus } from '../../types'
import useSwr from 'swr'
import { useParams } from 'react-router-dom'

const AddPrescriptionForm = () => {
    // const [prescriptions, setPrescriptions] = useState<Prescription[] | null>(null)
    const params = useParams()

    const [prescriptions, setPrescriptions] = useState<Prescription>({
        status: PrescriptionStatus.IN_PROGRESS,
        refills: 0,
        drugName: '',
        userId: String(params.id || ''),
        id: '',
    })

    const fetcher = (url: string) => fetch(url,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prescriptions })
        }).then(res => res.json())

        const [shouldPost, setShouldPost] = useState<boolean>(false)
        const { data, error } = useSwr(shouldPost ? `http://localhost:4000/prescriptions` : null, fetcher)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShouldPost(true)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // don't trim until we post it
        // update local state
        setPrescriptions({...prescriptions, [e.target.name]: e.target.value.trim()})
    }

    const disableSubmit = !prescriptions.drugName

    return (
        <form className="" onSubmit={(e) => handleSubmit(e)}>
            <h3 className="font-bold text-lg my-4">Add New Prescription</h3>
            <div className="mb-4 flex justify-between">
                <label className="mr-3" htmlFor="drugName">Prescription Name</label>
                <input
                    className="w-[50%]"
                    id="drugName"
                    name="drugName"
                    onChange={handleChange}
                    type="text"
                    value={prescriptions.drugName}
                />
            </div>

            {/* HARD CODED FOR DOCTORS */}
            {/* <div className="mb-4 flex justify-between">
                <label className="mr-3" htmlFor="status">Fulfillment Status</label>
                <select
                    className="w-[50%]"
                    id="status"
                    name="status"
                    onChange={handleChange}
                    value={prescriptions.status}
                >
                    <option>{PrescriptionStatus.IN_PROGRESS}</option>
                    <option>{PrescriptionStatus.PENDING}</option>
                    <option>{PrescriptionStatus.FILLED}</option>
                </select>
            </div> */}

            <div className="mb-6 flex justify-between">
                <label className="mr-3" htmlFor="refills">Number of refills</label>
                <input
                    className="w-[50%]"
                    id="refills"
                    name="refills"
                    onChange={handleChange}
                    type="number"
                    value={prescriptions.refills}
                    min={0}
                />
            </div>
            {/* would they want to add more than 1 prescription? */}
            {/* <button
                className={`px-4 py-1 font-bold rounded ${disableSubmit ? 'bg-slate-300' : 'text-teal-600 border border-teal-600'}`}
            >
                + Add another prescription
            </button> */}

            <div className="flex justify-center mt-5">
                <button
                    className={`px-4 py-1 font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-teal-600'}`}
                    type="submit"
                >
                    Update
                </button>
            </div>

      </form>
    )
}

export default AddPrescriptionForm
