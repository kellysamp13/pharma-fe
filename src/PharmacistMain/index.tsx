import { Prescription } from '../schemas/Prescription'
import { Link } from 'react-router-dom'
import { useGetPrescriptions } from './apiCalls'
import { useState } from 'react'
import ListViewControls from '../components/ListViewControls'
import { useDebounce } from '../utils'

const PharmacistMain = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [offset, setOffset] = useState(0)
    const [filters, setFilters] = useState<string[]>([])
    const debouncedSearchTerm = useDebounce(searchTerm)

    const { data, isFetching, isLoading } = useGetPrescriptions(debouncedSearchTerm, offset, filters)

    if (isFetching && isLoading) {
        return <div>Loading...</div>
    }

    const { prescriptions = [], nextOffset = 0 } = data

    return (
        <div className="w-[90%] m-auto px-4 pb-10">
            <form className="flex">
                <div className="mr-3 flex flex-col justify-center">
                    Filter by status
                </div>

                <div>
                    {['In progress', 'Pending', 'Filled'].map(statusOption => (
                        <div key={statusOption}>
                            <input
                                checked={filters.includes(statusOption)}
                                className="mr-2"
                                type="checkbox"
                                onChange={() => {
                                    const newFilters = filters.includes(statusOption) ?
                                        filters.filter(filter => filter !== statusOption) : [...filters, statusOption]
                                    setFilters(newFilters)
                                }}
                            />
                            <label>{statusOption}</label>
                        </div>
                    ))}
                    <button
                        className="ml-2 text-white border border-white rounded px-2"
                        onClick={() => setFilters([])}
                        type='button'
                    >
                        Reset
                    </button>
                </div>
            </form>

            <div className="mt-4">
                <form>
                    <label className="mr-2">Search by drug name</label>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search"
                        value={searchTerm}
                    />
                    <button
                        className="ml-2 text-white border border-white rounded px-2"
                        onClick={() => setSearchTerm('')}
                        type='button'
                    >
                        Reset
                    </button>
                </form>
            </div>

            <ListViewControls
                onGoBack={() => setOffset(Math.max(offset - 5, 0))}
                onGoForward={() => {
                    if (nextOffset !== null) {
                        setOffset(offset + 5)
                    }
                }}
                isGoBackDisabled={nextOffset === 5 || !!searchTerm || !!filters}
                isGoForwardDisabled={nextOffset === null}
            />

            <div className="grid grid-cols-3 my-4 px-2 font-bold">
                <p>Prescription</p>
                <p>Status</p>
                <p>Refills</p>
            </div>
            <ul className="bg-white px-4 rounded">
                {prescriptions?.map((prescription: Prescription, index: number) => {
                    return (
                        <Link key={prescription.id} to={`/prescriptions/${prescription.id}`}>
                            <li
                                className={`grid grid-cols-3 py-3 ${index !== prescriptions.length-1 ? 'border-b border-b-black' : ''}`}
                                key={prescription.id}
                            >
                                <div>{prescription.name}</div>
                                <div>{prescription.status}</div>
                                <div>{prescription.refills}</div>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default PharmacistMain
