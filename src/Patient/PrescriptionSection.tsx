import AddPrescriptionForm from '../components/AddPrescriptionForm'
import { Prescription, PrescriptionStatus } from '../schemas/Prescription'
import { Patient } from '../schemas/Patient'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreatePrescription } from './apiCalls'

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

    const mutation = useCreatePrescription(refetchPatient)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(prescriptions)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPrescriptions({...prescriptions, [e.target.name]: e.target.value})
    }

    const [expandedAdd, setExpandedAdd] = useState(false)

    return (
        <>
            <h3 className="font-bold text-lg my-4">Active Prescriptions</h3>
            <ul>
                {patientData?.activeScripts?.length ? patientData?.activeScripts.map((script: Prescription) => {
                    return (
                        <li key={script.id} className="grid grid-cols-4 mb-2">
                            <div>{script.name}</div>
                            <div>{script.status}</div>
                            <div>Refills: {script.refills}</div>
                            {/* editing means ending refills - not updating any other info */}
                            <button className='px-4 text-sm py-1 font-bold rounded text-white bg-teal-600'>Edit</button>
                        </li>
                    )
                }): <div>No active prescriptions.</div>}
            </ul>

            <h3 className="font-bold text-lg my-4">Expired Prescriptions</h3>
            <ul>
                {patientData?.expiredScripts?.length ? patientData?.expiredScripts?.map((script: Prescription) => {
                    return (
                        <li key={script.id} className="grid grid-cols-4 mb-2">
                            <div>{script.name}</div>
                            <div>{script.status}</div>
                            <div>Refills: {script.refills}</div>
                            {/* editing means ending refills - not updating any other info */}
                            <button className='px-4 text-sm py-1 font-bold rounded text-white bg-teal-600'>Edit</button>
                        </li>
                    )
                }): <div>No expired prescriptions.</div>}
            </ul>

            {/* show this section with a button */}
            {isProviderView ? <>
                <h3 className="font-bold text-lg my-4">
                    Add New Prescription
                    <button
                        className='px-4 text-sm py-1 font-bold rounded text-white bg-teal-600 ml-3'
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
