import React from 'react'
import { Prescription } from '../schemas/Prescription'

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
        <div className='flex justify-between flex-col items-center md:flex-row'>
            <div className='flex flex-col'>
                <label className='mr-3' htmlFor='name'>Prescription Name</label>
                <input
                    id='name'
                    name='name'
                    onChange={handleChange}
                    type='text'
                    value={data.name}
                />
            </div>


            <div className='flex flex-col'>
                <label className='mr-3' htmlFor='refills'>Number of refills</label>
                <input
                    id='refills'
                    name='refills'
                    onChange={handleChange}
                    type='number'
                    value={data.refills}
                    min={0}
                    className='w-[30%]'
                />
            </div>
        </div>
        <div className='flex justify-center mt-5'>
            <button
                className={`px-4 py-1 font-bold rounded text-white ${!data.name ? 'bg-slate-300' : 'bg-teal-700'}`}
                disabled={!data.name}
                type='submit'
            >
                Add Prescription
            </button>
        </div>

    </form>
)

export default AddPrescriptionForm
