import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const createPatientFetcher = (url: string, formData: any) => fetch(url,
    {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    }).then(res => res.json())

export const useGetPatient = () => {
    const params = useParams()

    return useQuery({
        queryKey: ['patient'],
        queryFn: () => {
            return fetch(`http://localhost:4000/patients/${params.id}`).then((res) => res.json()).then(json => {
                const expiredScripts = json.prescriptions.filter((script: any) => !Number(script.refills))
                const activeScripts = json.prescriptions.filter((script: any) => Number(script.refills))
                return {...json, expiredScripts, activeScripts}
            })
        }
    })
}

export const useUpdatePatient = (onSuccessFn: any) => {
    const queryClient = useQueryClient()
    const params = useParams()

    return useMutation({
        mutationFn: (formData) => {
            return fetch(`http://localhost:4000/patients/${params.id}`,
                {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }
            ).then(res => res.json())
        },
        onSuccess: (data) => {
            onSuccessFn(false)
            // refresh patient data - what is updater?
            // queryClient.setQueryData(['patient'], data)
            console.log(data)
        }
    })
}

export const useCreatePatient = (onSuccessFn: any) => {
    const params = useParams()

    return useMutation({
        mutationFn: (formData) => {
            return fetch('http://localhost:4000/patients',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                }).then(res => {
                    const result = res.json()
                    return result
                })
        },
        onSuccess: (data) => {
            onSuccessFn(data.id)
        }
    })
}

export const useCreatePrescription = () => {
    return useMutation({
        mutationFn: (prescriptions) => {
            return fetch('http://localhost:4000/prescriptions',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prescriptions })
                }).then(res => res.json())
        },
        onSuccess: (data) => {
            // now I have this data - I need to have it on the user though
            // so maybe this returns a user
            console.log(data)
        }
    })
}
