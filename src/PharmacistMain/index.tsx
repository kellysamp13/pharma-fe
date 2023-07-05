import useSwr from 'swr'
import { Prescription } from '../types'
import { Link } from 'react-router-dom'

const PharmacistMain = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data, error, isLoading } = useSwr('http://localhost:4000/prescriptions', fetcher)

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
                                <div className="w-1/5">{prescription.drugName}</div>
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
