import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const useGetPrescriptions = () => {
    return useQuery({
        queryKey: ['prescriptions'],
        queryFn: () => fetch('http://localhost:4000/prescriptions').then((res) => res.json())
    })
}

export const useGetPrescription = () => {
    const params = useParams()

    return useQuery({
        queryKey: ['prescription'],
        queryFn: () => fetch(`http://localhost:4000/prescriptions/${params.id}`).then((res) => res.json())
      })
}

export const useMutatePrescription = (onSuccessFn: any) => {
    const params = useParams()

    return useMutation({
        mutationFn: (status) => {
            return fetch(`http://localhost:4000/prescriptions/${params.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }).then(res => {
                const result = res.json()
                return result
            })
        },
        onSuccess: (data) => {
            onSuccessFn(data[0].status)
        }
      })
}
