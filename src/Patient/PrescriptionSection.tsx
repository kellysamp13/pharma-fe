import AddPrescriptionForm from '../components/AddPrescriptionForm'
import { Prescription, PrescriptionStatus } from '../schemas/Prescription'
import { Patient } from '../schemas/Patient'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreatePrescription } from '../apiCalls'
import EditPrescriptionModal from './EditPrescriptionModal'
import { Navigate } from 'react-router-dom'

interface Props {
    patientData: Patient | null
    refetchPatient: () => void
}

const PrescriptionSection = ({ patientData, refetchPatient }: Props) => {
    const params = useParams()
    const isProviderView = sessionStorage.getItem('viewType') === 'provider'

    const [prescriptions, setPrescriptions] = useState<Prescription>({
        id: '',
        name: '',
        refills: 0,
        status: PrescriptionStatus.IN_PROGRESS,
        userId: String(params.id || ''),
    })

    const [expandedAdd, setExpandedAdd] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editedScript, setEditedScript] = useState({
        name: '',
        id: '',
        refills: 0,
        status: '',
    })

    const createScriptMutation = useCreatePrescription(refetchPatient)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createScriptMutation.mutate(prescriptions)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPrescriptions({...prescriptions, [e.target.name]: e.target.value})
    }

    if (createScriptMutation.isError) {
        return <Navigate to='/error' />
    }

    return (
        <>
            {showModal ? (
                <EditPrescriptionModal
                    hideModal={() => {
                        setShowModal(false)
                        setEditedScript({
                            name: '',
                            id: '',
                            refills: 0,
                            status: '',
                        })
                    }}
                    refetchPatient={refetchPatient}
                    script={editedScript}
                />
            ) : null}

            <h3 className="font-bold text-lg my-4">Active Prescriptions</h3>
            <ul className="border-t border-t-black">
                {patientData?.activeScripts?.length ? patientData?.activeScripts.map((script: Prescription) => {
                    return (
                        <li
                            key={script.id}
                            className={`flex justify-between items-center mb-2 py-2 border-b border-b-black`}
                        >
                            <div className="w-[80%] md:grid md:grid-cols-4 md:gap-4">
                                <div>{script.name}</div>
                                <div>{script.status}</div>
                                <div>Refills: {script.refills}</div>
                            </div>

                            <button
                                className='px-4 text-sm py-1 h-[2rem] font-bold rounded text-white bg-teal-700'
                                onClick={() => {
                                    setShowModal(true)
                                    setEditedScript({
                                        name: script.name,
                                        id: script.id,
                                        refills: script.refills,
                                        status: '',
                                    })
                                }}
                            >
                                Edit
                            </button>
                        </li>
                    )
                }): <li>No active prescriptions.</li>}
            </ul>

            <h3 className="font-bold text-lg my-4">Expired Prescriptions</h3>
            <ul className="border-t border-t-black">
                {patientData?.expiredScripts?.length ? patientData?.expiredScripts?.map((script: Prescription) => {
                    return (
                        <li
                            key={script.id}
                            className={`flex justify-between items-center mb-2 py-2 border-b border-b-black`}
                        >
                            <div className="w-[80%] md:grid md:grid-cols-4">
                                <div>{script.name}</div>
                                <div>{script.status}</div>
                                <div>Refills: {script.refills}</div>
                            </div>
                            <button
                                className='px-4 text-sm py-1 font-bold rounded text-white bg-teal-700 h-[2rem]'
                                onClick={() => {
                                    setShowModal(true)
                                    setEditedScript({
                                        name: script.name,
                                        id: script.id,
                                        refills: script.refills,
                                        status: script.status,
                                    })
                                }}
                            >
                                Edit
                            </button>
                        </li>
                    )
                }): <li>No expired prescriptions.</li>}
            </ul>

            {isProviderView ? <>
                <h3 className="font-bold text-lg my-4">
                    Add New Prescription
                    <button
                        className='px-4 text-sm py-1 font-bold rounded text-white bg-teal-700 ml-3'
                        onClick={() => setExpandedAdd(!expandedAdd)}
                    >
                        {expandedAdd ? '-' : '+'}
                    </button>
                </h3>

                {expandedAdd ? (
                    <AddPrescriptionForm
                        data={prescriptions}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                ) : null}
            </> : null}
        </>
    )
}

export default PrescriptionSection
