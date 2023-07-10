import React from "react"
import { Prescription } from "../schemas/Prescription"

interface Props {
    data: Prescription
    handleChange: (arg: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: (arg: React.FormEvent<HTMLFormElement>) => void
}
const AddPrescriptionForm = ({
    data,
    handleChange,
    handleSubmit,
}: Props) => (
    <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex justify-between flex-col md:flex-row">
            <div className="mb-4">
                <label className="mr-3" htmlFor="name">Prescription Name</label>
                <input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={data.name}
                />
            </div>


            <div className="mb-6">
                <label className="mr-3" htmlFor="refills">Number of refills</label>
                <input
                    id="refills"
                    name="refills"
                    onChange={handleChange}
                    type="number"
                    value={data.refills}
                    min={0}
                />
            </div>
        </div>
        <div className="flex justify-center mt-5">
            <button
                className={`px-4 py-1 font-bold rounded text-white ${!data.name ? 'bg-slate-300' : 'bg-teal-600'}`}
                disabled={!data.name}
                type="submit"
            >
                Add Prescription
            </button>
        </div>

    </form>
)

export default AddPrescriptionForm
