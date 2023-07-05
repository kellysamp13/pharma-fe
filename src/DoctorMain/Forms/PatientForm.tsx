interface Props {
    handleChange: (arg: any) => void
    handleSubmit: (arg: any) => void
    data: any
    isRequired?: boolean
}

const PatientForm = ({ isRequired = false, data, handleChange, handleSubmit }: Props) => {
    const disableSubmit = false

    return (
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
                    required={isRequired}
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
                    required={isRequired}
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
                    required={isRequired}
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
                    required={isRequired}
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
                    required={isRequired}
                    type="email"
                    value={data.email}
                />
            </div>

            <div className="flex flex-col items-center mt-5">
                <button
                    className={`px-4 py-1 w-[50%] font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-teal-600'}`}
                    disabled={disableSubmit}
                    type="submit"
                >
                    Create New Patient Account
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
    )
}

export default PatientForm
