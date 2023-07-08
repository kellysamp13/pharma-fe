interface Props {
    handleChange: (arg: any) => void
    handleSubmit: (arg: any) => void
    data: any
    isCreate?: boolean
    handleCancel?: () => void
}

const PatientForm = ({ isCreate = false, data, handleChange, handleSubmit, handleCancel }: Props) => {
    const disableSubmit = false

    return (
        <form className={`mx-auto ${isCreate ? 'w-[60%]' : 'w-[90%]'} py-10 rounded`} onSubmit={(e) => handleSubmit(e)}>

            <h3 className="font-bold text-lg mb-4">Patient Information</h3>

            <div className="mb-4 flex justify-between">
                <label className="mr-3" htmlFor="firstName">Patient First Name</label>
                <input
                    className="w-[50%]"
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required={isCreate}
                    type="text"
                    value={data.firstName}
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
                    required={isCreate}
                    type="text"
                    value={data.lastName}
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
                    required={isCreate}
                    type="date"
                    value={data.lastAppointment}
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
                    required={isCreate}
                    type="tel"
                    value={data.phone}
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
                    required={isCreate}
                    type="email"
                    value={data.email}
                />
            </div>

            <div className="flex flex-col items-center mt-10">
                <button
                    className={`px-4 py-2 w-[40%] font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-teal-600'}`}
                    disabled={disableSubmit}
                    type="submit"
                >
                    {isCreate ? 'Create Patient Account' : 'Update Patient Account'}
                </button>
                {handleCancel ? <button
                    className={`px-4 py-1 w-[40%] mt-2 font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-rose-600'}`}
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
