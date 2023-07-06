import AddPrescriptionForm from '../../DoctorMain/Forms/AddPrescriptionForm'
import { Prescription, PrescriptionStatus } from '../../types'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCreatePrescription } from './apiCalls'

interface Props {
    patientData: any
}

const PrescriptionSection = ({ patientData }: Props) => {
    const params = useParams()

    const [prescriptions, setPrescriptions] = useState<Prescription>({
        status: PrescriptionStatus.IN_PROGRESS,
        refills: 0,
        name: '',
        userId: String(params.id || ''),
        id: '',
    })

    const mutation: any = useCreatePrescription()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(prescriptions)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // don't trim until we post it
        // update local state
        setPrescriptions({...prescriptions, [e.target.name]: e.target.value.trim()})
    }

    const disableSubmit = !prescriptions.name

    return (
        <>
            <h3 className="font-bold text-lg my-4">Active Prescriptions</h3>
            <ul>
                {patientData?.activeScripts?.length ? patientData?.activeScripts.map((script: Prescription) => {
                    return (
                        <li className="flex justify-between">
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
                        <li className="flex justify-between">
                            <div>{script.name}</div>
                            <div>{script.status}</div>
                            <div>Refills: {script.refills}</div>
                            {/* editing means ending refills - not updating any other info */}
                            <button className='px-4 text-sm py-1 font-bold rounded text-white bg-teal-600'>Edit</button>
                        </li>
                    )
                }): <div>No expired prescriptions.</div>}
            </ul>

            <h3 className="font-bold text-lg my-4">Add New Prescription</h3>
            {/* show this section with a button */}
            <AddPrescriptionForm handleChange={handleChange} handleSubmit={handleSubmit} data={prescriptions} />
        </>
    )
}

export default PrescriptionSection
