import { Prescription } from '../types'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const PharmacistMain = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['prescriptions'],
        queryFn: () => fetch('http://localhost:4000/prescriptions').then((res) => res.json())
    })

    if (isLoading || !data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <ul className="bg-white w-[90%] m-auto rounded px-4 mt-4">
                {data?.map((prescription: Prescription, index: number) => {
                    return (
                        <Link key={prescription.id} to={`/prescriptions/${prescription.id}`}>
                            <li className={`flex justify-between py-3 ${index !== data.length-1 ? 'border-b border-b-black' : ''}`} key={prescription.id}>
                                <div className="w-1/5">{prescription.name}</div>
                                <div>{prescription.refills}</div>
                                <div>{prescription.status}</div>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default PharmacistMain
