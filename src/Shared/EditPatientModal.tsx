import { Patient } from '../types';
import PatientForm from '../DoctorMain/Forms/PatientForm';
import { updatePatientFetcher } from './Patient/apiCalls'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const EditPatientModal = ({ setShowModal }: { setShowModal: (arg: boolean) => void }) => {
    const [formData, setFormData] = useState<Patient>({
        email: '',
        firstName: '',
        lastAppointment: '',
        lastName: '',
        phone: '',
        prescriptions: [],
    })
    const params = useParams()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`http://localhost:4000/patients/${params.id}`,
                {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            ).then(res => res.json())
        },
        onSuccess: (data) => {
            setShowModal(false)
            // refresh patient data - what is updater?
            queryClient.setQueryData(['patient'], data)
            console.log(data)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate()
    }

    return (
        <div className="absolute z-10 bg-slate-100 h-[60%] w-[50%] top-0 border border-black">
            <PatientForm data={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

export default EditPatientModal
