import { useQuery } from '@tanstack/react-query'

export const useGetPatients = () => {
    return useQuery({
        queryKey: ['patients'],
        queryFn: () => {
            return fetch('http://localhost:4000/patients').then((res) => res.json())
        }
    })
}
