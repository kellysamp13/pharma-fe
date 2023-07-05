import { PrescriptionStatus } from "../../types"

interface Props {
    handleChange: any
    handleSubmit: any
    data: any
}
const AddPrescriptionForm = ({ handleChange, handleSubmit, data }: Props) => {
    const disableSubmit = !data.drugName
    const isProviderView = sessionStorage.getItem('viewType') === 'provider'

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
                    value={data.drugName}
                />
            </div>

            {/* Only allow Pharmacists to edit this */}
            {!isProviderView  ?  (
                <div className="mb-4 flex justify-between">
                    <label className="mr-3" htmlFor="status">Fulfillment Status</label>
                    <select
                        className="w-[50%]"
                        id="status"
                        name="status"
                        onChange={handleChange}
                        value={data.status}
                    >
                        <option>{PrescriptionStatus.IN_PROGRESS}</option>
                        <option>{PrescriptionStatus.PENDING}</option>
                        <option>{PrescriptionStatus.FILLED}</option>
                    </select>
                </div>
            ) : null}

            <div className="mb-6 flex justify-between">
                <label className="mr-3" htmlFor="refills">Number of refills</label>
                <input
                    className="w-[50%]"
                    id="refills"
                    name="refills"
                    onChange={handleChange}
                    type="number"
                    value={data.refills}
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
