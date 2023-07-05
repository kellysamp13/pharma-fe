import PatientForm from "./Forms/PatientForm"
import { useState } from 'react'
import {Patient} from '../types'
import useSwr from 'swr'
import {Navigate} from 'react-router-dom'

const CreatePatient = () => {
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: '',
        lastName: '',
        phone: '',
        prescriptions: [],
    })
    const createPatientFetcher = (url: string) => fetch(url,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(res => res.json())

    const [shouldPost, setShouldPost] = useState<boolean>(false)
    const { data, error } = useSwr(shouldPost ? 'http://localhost:4000/patients' : null, createPatientFetcher)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        // where should we trim
        // need to handle adding prescription - different handle event?
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShouldPost(true)
    }

    if (data?.id) {
        return <Navigate to={`/patients/${data.id}`}/>
    }

    return (
        <div className="w-[80%] m-auto bg-white rounded my-10">
            <PatientForm isRequired={true} data={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default CreatePatient
