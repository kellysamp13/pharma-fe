import { Navigate, useParams } from 'react-router-dom'
import useSwr from 'swr'
import {useState} from 'react'
import AddPrescriptionForm from '../../DoctorMain/Forms/AddPrescriptionForm';
import { Prescription, Patient } from '../../types';
import { getPatientFetcher } from './apiCalls'
import PatientForm from '../../DoctorMain/Forms/PatientForm';

const PatientView = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [shouldPost, setShouldPost] = useState<boolean>(false)
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: '',
        lastName: '',
        phone: '',
        prescriptions: [],
    })
    const params = useParams()
    const updatePatientFetcher = (url: string) => fetch(url,
        {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }
    ).then(res => res.json()).then(() => setShowModal(false))
    const { data: patientData, error, isLoading } = useSwr(`http://localhost:4000/patients/${params.id}`, getPatientFetcher)
    const { data, isValidating } = useSwr(shouldPost ? `http://localhost:4000/patients/${params.id}` : null, updatePatientFetcher)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShouldPost(true)
    }

    if (isLoading || !patientData) {
        // the submitting behavior is really weird
        return <div>Loading...</div>
    }

    // if (!patientData?.id) {
    //     return <Navigate to='/'/>
    // }

    return (
        <div className="py-10 px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">
            {showModal && <div className="absolute z-10 bg-slate-100 h-[60%] w-[50%] top-0 border border-black">
                <PatientForm data={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>}
            <div className="flex">
                <h3 className="font-bold text-lg my-4 mr-10">
                    Patient Info
                    <button onClick={() => setShowModal(true)} className='ml-3 px-4 text-sm py-1 font-bold rounded text-white bg-teal-600'>Edit</button>
                </h3>

                {/* allow updating this basic info */}
                <div>
                <div className="my-2">
                    <strong>Name: </strong>{patientData.firstName} {patientData.lastName}
                </div>
                <div className="my-2">
                    <strong>Email: </strong>{patientData.email}
                </div>
                <div className="my-2">
                    <strong>Phone number: </strong>{patientData.phone}
                </div>
                <div className="my-2">
                    <strong>Last appointment: </strong> {patientData.lastAppointment}
                </div>
                </div>
            </div>

                {/* NEED LOGIC ADDED FOR EXPIRED */}
            <h3 className="font-bold text-lg my-4">Active Prescriptions</h3>
            <ul>
                {patientData.activeScripts?.length ? patientData.activeScripts.map((script: Prescription) => {
                    return (
                        <li className="flex justify-between">
                            <div>{script.drugName}</div>
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
                {patientData.expiredScripts?.length ? patientData.expiredScripts?.map((script: Prescription) => {
                    return (
                        <li className="flex justify-between">
                            <div>{script.drugName}</div>
                            <div>{script.status}</div>
                            <div>Refills: {script.refills}</div>
                            {/* editing means ending refills - not updating any other info */}
                            <button className='px-4 text-sm py-1 font-bold rounded text-white bg-teal-600'>Edit</button>
                        </li>
                    )
                }): <div>No expired prescriptions.</div>}
            </ul>

            {/* show this section with a button */}
            <AddPrescriptionForm />
        </div>

    )
}

export default PatientView
