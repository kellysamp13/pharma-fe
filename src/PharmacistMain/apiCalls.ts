import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { PrescriptionStatus } from '../schemas/Prescription'

export const useGetPrescriptions = (searchTerm: string, offset: number, filters: string[]) => {
    return useQuery({
        queryKey: ['prescriptions', searchTerm, offset],
        queryFn: (): Promise<any> => {
        //    FILTERS NOT WORKING
           return fetch(`http://localhost:4000/prescriptions?name=${searchTerm}&offset=${offset}&filters=${filters.join(',')}`)
           .then((res) => res.json())
        }
    })
}

export const useGetPrescription = () => {
    const params = useParams()

    return useQuery({
        queryKey: ['prescription'],
        queryFn: (): Promise<any> => fetch(`http://localhost:4000/prescriptions/${params.id}`).then((res) => res.json())
      })
}

export const useMutatePrescription = (onSuccessFn: React.Dispatch<React.SetStateAction<PrescriptionStatus | null>>) => {
    const params = useParams()

    return useMutation({
        mutationFn: (status: string): Promise<any> => {
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
