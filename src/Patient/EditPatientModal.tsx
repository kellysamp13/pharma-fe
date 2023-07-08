import { Patient } from '../types';
import PatientForm from '../components/PatientForm';
import { useUpdatePatient } from './apiCalls'
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
        <div className="absolute z-10 bg-white rounded md:h-[70%] w-[70%] top-2 border-2 border-teal-600">
            <button onClick={() => setShowModal(false)} className="absolute right-4 top-2 font-bold">X</button>
            <PatientForm
                data={formData}
                handleCancel={() => setShowModal(false)}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default EditPatientModal
