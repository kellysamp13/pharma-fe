import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Patient } from '../schemas/Patient'
import { Prescription } from '../schemas/Prescription'

export const useGetPatient = () => {
    const params = useParams()

    return useQuery({
        queryKey: ['patient'],
        queryFn: (): Promise<Patient> => {
            return fetch(`http://localhost:4000/patients/${params.id}`).then((res) => res.json()).then(json => {
                // separate 0 refill prescriptions from all prescriptions to show in 2 sections
                const expiredScripts = json.prescriptions.filter((script: Prescription) => !Number(script.refills))
                const activeScripts = json.prescriptions.filter((script: Prescription) => Number(script.refills))
                return {...json, expiredScripts, activeScripts}
            })
        }
    })
}

export const useUpdatePatient = (onSuccessFn: () => void, refetch: () => void) => {
    const params = useParams()

    return useMutation({
        mutationFn: (formData: Patient): Promise<Patient> => {
            return fetch(`http://localhost:4000/patients/${params.id}`,
                {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            ).then(res => res.json())
        },
        onSuccess: () => {
            // hide modal after update
            onSuccessFn()
            // refetch user data
            refetch()
        }
    })
}

export const useCreatePatient = (onSuccessFn: React.Dispatch<React.SetStateAction<string>>, formData: Patient) => {
    return useMutation({
        mutationFn: () => fetch('http://localhost:4000/patients',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }).then(res => res.json()),
        onSuccess: (data) => {
            // set the id in state, so we know to redirect to the new user's profile page
            onSuccessFn(data.id)
        }
    })
}

export const useCreatePrescription = (refetch: () => void) => useMutation({
    mutationFn: (prescriptions: Prescription): Promise<Prescription> => fetch('http://localhost:4000/prescriptions',
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prescriptions })
        }).then(res => res.json()),
    // refetch patient info
    onSuccess: () => refetch(),
})
