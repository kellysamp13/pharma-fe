import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUpdatePrescription } from '../apiCalls'
import { PrescriptionStatus } from '../schemas/Prescription'

interface Props {
    hideModal: () => void
    script: {
        id: string,
        name: string,
        refills: number,
        status: any,
    }
    refetchPatient: () => void
}

const EditPrescriptionModal = ({ hideModal, refetchPatient, script }: Props) => {
    const mutation = useUpdatePrescription(refetchPatient)
    const [editedScript, setEditedScript] = useState({
        name: script.name,
        refills: script.refills,
        status: script.status,
    })
    const isProviderView = sessionStorage.getItem('viewType') === 'provider'

    if (mutation.isError) {
        return <Navigate to='/error' />
    }

    return (
        <div
            className='fixed z-10 bg-white rounded max-h-[380px] w-[300px] md:w-[400px] md:left-[30%] top-2 border-2 border-teal-700'
        >
            <button
                className='absolute right-4 top-2 font-bold'
                onClick={hideModal}
            >
                X
            </button>
            <form
                className='mx-auto w-[90%] py-10 rounded flex flex-col justify-center'
                onSubmit={(e) => {
                    e.preventDefault()
                    mutation.mutate({
                        id: script.id,
                        name: editedScript.name,
                        refills: editedScript.refills,
                        status: editedScript.status,
                    })
                }}
            >
                <h3 className='font-bold text-lg mb-4 text-center'>Prescription Information</h3>
                {isProviderView ?
                    <>
                        <div className='mb-4 flex justify-between flex-col md:flex-row items-center'>
                            <label className='md:mr-3' htmlFor='scriptName'>Prescription Name</label>
                            <input
                                className='md:w-[50%]'
                                id='scriptName'
                                name='scriptName'
                                onChange={(e) => setEditedScript({ ...editedScript, name: e.target.value })}
                                type='text'
                                value={editedScript.name}
                            />
                        </div>

                        <div className='mb-4 flex justify-between flex-col md:flex-row items-center'>
                            <label className='md:mr-3' htmlFor='refills'>Refills</label>
                            <input
                                className='md:w-[50%]'
                                id='refills'
                                name='refills'
                                onChange={(e) => setEditedScript({ ...editedScript, refills: Math.max(0, Number(e.target.value)) })}
                                type='number'
                                value={editedScript.refills}
                            />
                        </div>
                    </> : (
                        <div>
                            <label className='mr-3' htmlFor='status'>Fulfillment Status</label>
                            <select
                                id='status'
                                name='status'
                                onChange={(e) => setEditedScript({ ...editedScript, status: e.target.value })}
                                value={editedScript.status || ''}
                            >
                                <option>{PrescriptionStatus.IN_PROGRESS}</option>
                                <option>{PrescriptionStatus.PENDING}</option>
                                <option>{PrescriptionStatus.FILLED}</option>
                            </select>
                        </div>
                    )
                }

                    <div className='flex flex-col items-center mt-10'>
                        <button
                            className='px-4 py-2 font-bold rounded text-white bg-teal-700'
                            type='submit'
                        >
                            Update Prescription
                        </button>
                        <button
                            className='px-4 py-1 mt-2 font-bold rounded text-white bg-rose-600'
                            onClick={hideModal}
                            type='button'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
    )
}

export default EditPrescriptionModal
