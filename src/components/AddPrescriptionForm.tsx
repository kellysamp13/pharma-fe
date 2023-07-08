import { PrescriptionStatus } from "../types"

interface Props {
    handleChange: any
    handleSubmit: any
    data: any
}
const AddPrescriptionForm = ({ handleChange, handleSubmit, data }: Props) => {
    const disableSubmit = !data.name
    // allow providers to update name, refills only
    // allow pharmacists to update fulfillment status only
    // ONLY PROVIDERS CAN SEE THIS SECTION RN....
    const isProviderView = sessionStorage.getItem('viewType') === 'provider'

    return (
        <form className="" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-between flex-col md:flex-row">
                {isProviderView ? <div className="mb-4">
                    <label className="mr-3" htmlFor="name">Prescription Name</label>
                    <input
                        className=""
                        id="name"
                        name="name"
                        onChange={handleChange}
                        type="text"
                        value={data.name}
                    />
                </div> : <div>Prescription name: {data.name}</div>}

                {!isProviderView  ?  (
                    <div className="mb-4">
                        <label className="mr-3" htmlFor="status">Fulfillment Status</label>
                        <select
                            className=""
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

                {isProviderView ? <div className="mb-6">
                    <label className="mr-3" htmlFor="refills">Number of refills</label>
                    <input
                        className=""
                        id="refills"
                        name="refills"
                        onChange={handleChange}
                        type="number"
                        value={data.refills}
                        min={0}
                    />
                </div> : null}
                {/* would they want to add more than 1 prescription? */}
                {/* <button
                    className={`px-4 py-1 font-bold rounded ${disableSubmit ? 'bg-slate-300' : 'text-teal-600 border border-teal-600'}`}
                >
                    + Add another prescription
                </button> */}
            </div>
            <div className="flex justify-center mt-5">
                <button
                    className={`px-4 py-1 font-bold rounded text-white ${disableSubmit ? 'bg-slate-300' : 'bg-teal-600'}`}
                    type="submit"
                >
                    Add Prescription
                </button>
            </div>

      </form>
    )
}

export default AddPrescriptionForm
