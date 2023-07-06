import { Patient } from '../types';
import PatientForm from '../DoctorMain/Forms/PatientForm';
import { useUpdatePatient } from './Patient/apiCalls'
import { useState } from 'react'

const EditPatientModal = ({ setShowModal }: { setShowModal: (arg: boolean) => void }) => {
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: '',
        lastName: '',
        phone: '',
        prescriptions: [],
    })

    const mutation: any = useUpdatePatient(setShowModal)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(formData)
    }

    return (
        <div className="absolute z-10 bg-slate-100 h-[60%] w-[50%] top-0 border border-black">
            <PatientForm data={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default EditPatientModal
