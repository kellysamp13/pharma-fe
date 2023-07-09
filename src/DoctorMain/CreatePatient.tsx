import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Patient } from '../schemas/Patient'
import { useCreatePatient } from "../Patient/apiCalls"
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

    const mutation = useCreatePatient(setUserId)

    if (userId) {
        return <Navigate to={`/patients/${userId}`}/>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        // where should we trim
        // need to handle adding prescription - different handle event?
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate()
    }

    // if (data?.id) {
    //     return <Navigate to={`/patients/${data.id}`}/>
    // }

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
