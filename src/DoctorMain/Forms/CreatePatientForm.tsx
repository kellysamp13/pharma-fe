import React, { useState } from 'react'
import { Patient } from '../../types'
import useSwr from 'swr'
import { Navigate } from 'react-router-dom'
import {createPatientFetcher} from '../../Shared/Patient/apiCalls'

const CreatePatientForm = ({ buttonText = 'Create New Patient Account', fetcher = createPatientFetcher, url = 'http://localhost:4000/patients' }) => {
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: '',
        lastName: '',
        phone: '',
        prescriptions: [],
    })
    const [shouldPost, setShouldPost] = useState<boolean>(false)
    const { data, error } = useSwr(shouldPost ? url : null, fetcher)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        // where should we trim
        // need to handle adding prescription - different handle event?
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShouldPost(true)
    }

    // const disableSubmit = !formData.email || !formData.firstName || !formData.lastName || !formData.email || !formData.phone
    const disableSubmit = false

    if (data?.id) {
        return <Navigate to={`/patients/${data.id}`}/>
    }

    return (
        // this div should be the page style
        // <div className="pt-10">
        <form className="mx-auto p-6 rounded" onSubmit={(e) => handleSubmit(e)}>

            <h3 className="font-bold text-lg mb-4">Patient Information</h3>

            <div className="mb-4 flex justify-between">
                <label className="mr-3" htmlFor="firstName">Patient First Name</label>
                <input
                    className="w-[50%]"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required
                    type="text"
                    value={formData.firstName}
                />
            </div>

            <div className="mb-4 flex justify-between">
                <label className="mr-3" htmlFor="lastName">Patient Last Name</label>
                <input
                    className="w-[50%]"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    required
                    type="text"
                    value={formData.lastName}
                />
            </div>

            <div className="mb-4 flex justify-between">
                <label className="mr-3" htmlFor="lastAppointment">Last appointment date</label>
                <input
                    className="w-[50%]"
                    id="lastAppointment"
                    name="lastAppointment"
                    // it looks like: 2023-06-13
                    onChange={handleChange}
                    required
                    type="date"
                    value={formData.lastAppointment}
                />
            </div>

            <div className="mb-6 flex justify-between relative">
                <label className="mr-3" htmlFor="phone">Patient Phone number</label>
                <input
                    className="w-[50%]"
                    id="phone"
                    maxLength={10}
                    minLength={10}
                    name="phone"
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    type="tel"
                    value={formData.phone}
                />
                {/* whats the best practice for format info? */}
                {/* <p className="absolute right-0 bottom-[-50%] text-xs">Format: 123-456-7890</p> */}
            </div>

            <div className="mb-4 flex justify-between">
                <label className="mr-3" htmlFor="email">Email</label>
                <input
                    className="w-[50%]"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required
                    type="email"
                    value={formData.email}
                />
            </div>

            <div className="flex flex-col items-center mt-5">
                <button
                    className={`px-4 py-1 w-[50%] font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-teal-600'}`}
                    disabled={disableSubmit}
                    type="submit"
                >
                    {buttonText}
                </button>
                <button
                    className={`px-4 py-1 w-[40%] mt-2 font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-rose-600'}`}
                    disabled={disableSubmit}
                    type="button"
                >
                    Cancel
                </button>
            </div>
      </form>
    //   </div>
    )
}

export default CreatePatientForm
