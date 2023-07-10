import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUpdatePatient } from '../apiCalls'
import { Patient } from '../schemas/Patient';
import PatientForm from '../components/PatientForm';

interface Props {
    refetchPatient: () => void
    setShowModal: () => void
}

const EditPatientModal = ({ setShowModal, refetchPatient }: Props) => {
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: '',
        lastName: '',
        phone: '',
        prescriptions: [],
    })

    const mutation = useUpdatePatient(setShowModal, refetchPatient)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(formData)
    }

    if (mutation.isError) {
        return <Navigate to='/error' />
    }

    return (
        <div className='fixed z-10 bg-white rounded md:max-h-[480px] w-[300px] md:left-[25%] md:w-[400px] top-2 border-2 border-teal-700'>
            <button
                className='absolute right-4 top-2 font-bold'
                onClick={setShowModal}
            >
                X
            </button>
            <PatientForm
                data={formData}
                handleCancel={setShowModal}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default EditPatientModal
