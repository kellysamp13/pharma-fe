import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Patient } from '../schemas/Patient'
import { useCreatePatient } from "../apiCalls"
import PatientForm from "../components/PatientForm"

const CreatePatient = () => {
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: null,
        lastName: '',
        phone: '',
    })
    const [userId, setUserId] = useState<string>('')
    const mutation = useCreatePatient(setUserId, formData)

    if (userId) {
        return <Navigate to={`/patients/${userId}`}/>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate()
    }

    return (
        <div className="w-[80%] m-auto bg-white rounded my-10">
            <PatientForm
                data={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isCreate={true}
            />
        </div>
    )
}

export default CreatePatient
