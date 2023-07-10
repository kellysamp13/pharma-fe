import React from "react"
import { Patient } from '../schemas/Patient'

interface Props {
    data: Patient
    handleCancel?: () => void
    handleChange: (arg: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (arg: React.FormEvent<HTMLFormElement>) => void
    isCreate?: boolean
}

const PatientForm = ({
    data,
    handleCancel,
    handleChange,
    handleSubmit,
    isCreate = false,
}: Props) => {
    // needs to disable on submit
    const disableSubmit = false

    const { firstName, lastName, lastAppointment, phone, email } = data

    return (
        <form className={`mx-auto ${isCreate ? 'w-[60%]' : 'w-[90%]'} py-10 rounded`} onSubmit={(e) => handleSubmit(e)}>
            <h3 className="font-bold text-lg mb-4 text-center">Patient Information</h3>
            <div className="mb-4 flex justify-between flex-col md:flex-row items-center">
                <label className="md:mr-3" htmlFor="firstName">Patient First Name</label>
                <input
                    className="md:w-[50%]"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required={isCreate}
                    type="text"
                    value={firstName}
                />
            </div>

            <div className="mb-4 flex justify-between flex-col md:flex-row items-center">
                <label className="md:mr-3" htmlFor="lastName">Patient Last Name</label>
                <input
                    className="md:w-[50%]"
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    required={isCreate}
                    type="text"
                    value={lastName}
                />
            </div>

            <div className="mb-4 flex justify-between flex-col md:flex-row items-center">
                <label className="md:mr-3" htmlFor="lastAppointment">Last appointment date</label>
                <input
                    className="md:w-[50%]"
                    id="lastAppointment"
                    name="lastAppointment"
                    // it looks like: 2023-06-13
                    onChange={handleChange}
                    required={isCreate}
                    type="date"
                    value={lastAppointment || ''}
                />
            </div>

            <div className="mb-6 flex justify-between flex-col md:flex-row items-center relative">
                <label className="md:mr-3" htmlFor="phone">Patient Phone number</label>
                <input
                    className="md:w-[50%]"
                    id="phone"
                    maxLength={10}
                    minLength={10}
                    name="phone"
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required={isCreate}
                    type="tel"
                    value={phone}
                />
            </div>

            <div className="mb-4 flex justify-between flex-col md:flex-row items-center">
                <label className="md:mr-3" htmlFor="email">Email</label>
                <input
                    className="md:w-[50%]"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    required={isCreate}
                    type="email"
                    value={email}
                />
            </div>

            <div className="flex flex-col items-center mt-10">
                <button
                    className={`px-4 py-2 font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-teal-700'}`}
                    disabled={disableSubmit}
                    type="submit"
                >
                    {isCreate ? 'Create Patient Account' : 'Update Patient Account'}
                </button>
                {handleCancel ? <button
                    className={`px-4 py-1 mt-2 font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-rose-600'}`}
                    onClick={() => handleCancel()}
                    type="button"
                >
                    Cancel
                </button> : null}
            </div>
      </form>
    )
}

export default PatientForm
