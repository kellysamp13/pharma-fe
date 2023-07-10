import { Prescription } from '../schemas/Prescription'
import { useState } from 'react'
import { useUpdatePrescription } from '../apiCalls'

interface Props {
    hideModal: () => void
    script: {
        id: string,
        name: string,
        refills: number,
    }
    refetchPatient: () => void
}

const EditPrescriptionModal = ({ hideModal, refetchPatient, script }: Props) => {
    const mutation = useUpdatePrescription(refetchPatient)
    const [editedScript, setEditedScript] = useState({
        name: script.name,
        refills: script.refills,
    })

    return (
        <div className="absolute z-10 bg-white rounded md:h-[50%] w-[70%] top-2 border-2 border-teal-600">
                <button
                    className="absolute right-4 top-2 font-bold"
                    onClick={hideModal}
                >
                    X
                </button>
                <form
                    className='mx-auto w-[90%] py-10 rounded'
                    onSubmit={(e) => {
                        e.preventDefault()
                        mutation.mutate({ name: editedScript.name, refills: editedScript.refills, id: script.id })
                    }}
                >
                    <h3 className="font-bold text-lg mb-4 text-center">Prescription Information</h3>
                    <div className="mb-4 flex justify-between flex-col md:flex-row items-center">
                        <label className="md:mr-3" htmlFor="scriptName">Prescription Name</label>
                        <input
                            className="md:w-[50%]"
                            id="scriptName"
                            name="scriptName"
                            onChange={(e) => setEditedScript({ ...editedScript, name: e.target.value })}
                            type="text"
                            value={editedScript.name}
                        />
                    </div>

                    <div className="mb-4 flex justify-between flex-col md:flex-row items-center">
                        <label className="md:mr-3" htmlFor="refills">Refills</label>
                        <input
                            className="md:w-[50%]"
                            id="refills"
                            name="refills"
                            onChange={(e) => setEditedScript({ ...editedScript, refills: Math.max(0, Number(e.target.value)) })}
                            type="number"
                            value={editedScript.refills}
                        />
                    </div>

                    <div className="flex flex-col items-center mt-10">
                        <button
                            className='px-4 py-2 font-bold rounded text-white bg-teal-600'
                            type="submit"
                        >
                            Update Prescription
                        </button>
                        <button
                            className='px-4 py-1 mt-2 font-bold rounded text-white bg-rose-600'
                            onClick={hideModal}
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
    )
}

export default EditPrescriptionModal
