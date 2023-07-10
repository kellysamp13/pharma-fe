import { useQuery } from '@tanstack/react-query'

export const useGetPatients = (offset: number, searchTerm: string) => {
    return useQuery({
        queryKey: ['patients', offset, searchTerm],
        queryFn: () => fetch(`http://localhost:4000/patients?offset=${offset}&name=${searchTerm}`).then((res) => res.json())
    })
}
