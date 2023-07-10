import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Prescription } from '../schemas/Prescription'

export const useGetPrescriptions = (searchTerm: string, offset: number, filters: string[]) => {
    return useQuery({
        queryKey: ['prescriptions', searchTerm, offset, filters],
        queryFn: () => {
          const formattedFilters = filters.join(',').toLowerCase()
           return fetch(`http://localhost:4000/prescriptions?name=${searchTerm}&offset=${offset}&filters=${formattedFilters}`)
           .then((res) => res.json())
        }
    })
}

export const useGetPrescription = () => {
    const params = useParams()

    return useQuery({
        queryKey: ['prescription'],
        queryFn: (): Promise<Prescription> => fetch(`http://localhost:4000/prescriptions/${params.id}`).then((res) => res.json())
      })
}

export const useMutatePrescription = (refetch: () => void) => {
    const params = useParams()

    return useMutation({
        mutationFn: (status: string): Promise<Prescription[]> => {
            return fetch(`http://localhost:4000/prescriptions/${params.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }).then(res => {
                const data = res.json()
                return data
            })
        },
        onSuccess: () => refetch()
      })
}
