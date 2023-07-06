import PatientForm from "./Forms/PatientForm"
import { useState } from 'react'
import {Patient} from '../types'
import { Navigate } from 'react-router-dom'
import { useCreatePatient } from "../Shared/Patient/apiCalls"

const CreatePatient = () => {
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: '',
        lastName: '',
        phone: '',
        prescriptions: [],
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
            <PatientForm isRequired={true} data={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default CreatePatient
