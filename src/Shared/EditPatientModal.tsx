import { Patient } from '../types';
import PatientForm from '../DoctorMain/Forms/PatientForm';
import { updatePatientFetcher } from './Patient/apiCalls'
import { useState } from 'react'
import useSwr from 'swr'
import { useParams } from 'react-router-dom'

const EditPatientModal = () => {
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

    const { data, isValidating } = useSwr(shouldPost ? [`http://localhost:4000/patients/${params.id}`, formData] : null, ([url, formData]) => updatePatientFetcher(url, formData))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShouldPost(true)
    }

    return (
        <div className="absolute z-10 bg-slate-100 h-[60%] w-[50%] top-0 border border-black">
            <PatientForm data={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default EditPatientModal
