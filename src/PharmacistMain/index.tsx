import { Prescription } from '../schemas/Prescription'
import { Link, Navigate } from 'react-router-dom'
import { useGetPrescriptions } from '../apiCalls'
import { useState } from 'react'
import ListViewControls from '../components/ListViewControls'
import { useDebounce } from '../utils'

const PharmacistMain = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [offset, setOffset] = useState(0)
    const [filters, setFilters] = useState<string[]>([])
    const debouncedSearchTerm = useDebounce(searchTerm)

    const { data, isFetching, isLoading, isError } = useGetPrescriptions(debouncedSearchTerm, offset, filters)

    if (isFetching && isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
       return <Navigate to='/error' />
    }

    const { prescriptions = [], nextOffset = 0 } = data

    return (
        <div className="w-[90%] m-auto px-4 pb-10">

            <div className="md:flex-row flex-col flex justify-between bg-white p-4 rounded mt-4">
                <form className="flex mb-4">
                    <div className="mr-3 flex flex-col justify-center">
                        Filter by status
                        <button
                            className="text-white bg-teal-700 font-bold rounded px-2"
                            onClick={() => setFilters([])}
                            type='button'
                        >
                            Reset
                        </button>
                    </div>

                    <div>
                        {['In progress', 'Pending', 'Filled'].map(statusOption => (
                            <div key={statusOption}>
                                <input
                                    checked={filters.includes(statusOption)}
                                    className="mr-2 cursor-pointer"
                                    id={statusOption}
                                    type="checkbox"
                                    onChange={() => {
                                        const newFilters = filters.includes(statusOption) ?
                                            filters.filter(filter => filter !== statusOption) : [...filters, statusOption]
                                        setFilters(newFilters)
                                    }}
                                />
                                <label htmlFor={statusOption} >{statusOption}</label>
                            </div>
                        ))}
                    </div>
                </form>

                <form className="flex flex-col">
                    <label htmlFor="search">Search by drug name</label>
                    <div>
                    <input
                        id="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search"
                        value={searchTerm}
                    />
                    <button
                        className="ml-2 text-white bg-teal-700 rounded px-2"
                        onClick={() => setSearchTerm('')}
                        type='button'
                    >
                        Reset
                    </button>
                    </div>
                </form>
            </div>

            <ListViewControls
                onGoBack={() => setOffset(Math.max(offset - 5, 0))}
                onGoForward={() => {
                    if (nextOffset !== null) {
                        setOffset(offset + 5)
                    }
                }}
                isGoBackDisabled={nextOffset === 5 || !!searchTerm || filters.length > 0}
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
                        <li key={prescription.id}>
                            <Link
                                className={`grid grid-cols-3 py-3 ${index !== prescriptions.length-1 ? 'border-b border-b-black' : ''}`}
                                to={`/prescriptions/${prescription.id}`}
                            >
                                <div>{prescription.name}</div>
                                <div>{prescription.status}</div>
                                <div>{prescription.refills}</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default PharmacistMain
