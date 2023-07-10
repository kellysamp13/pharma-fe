import { useState } from 'react'
import{ Link }from 'react-router-dom'
import { Patient } from '../schemas/Patient'
import { useGetPatients } from '../apiCalls'
import ListViewControls from '../components/ListViewControls'
import { useDebounce } from '../utils'

const DoctorMain = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [offset, setOffset] = useState(0)
    const debouncedSearchTerm = useDebounce(searchTerm)

    const { data, isLoading } = useGetPatients(offset, debouncedSearchTerm)

    if (isLoading) {
        return <div>Loading...</div>
    }

    const { patients = [], nextOffset = 0 } = data

    return (
        <div className="w-[90%] m-auto px-4">
            <div className="mt-4 bg-white rounded p-4 flex justify-center">
                <form>
                    <label htmlFor="search" className="mr-2">Search by last name</label>
                    <input
                        id="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search"
                        value={searchTerm}
                    />
                    <button
                        className="ml-2 text-white bg-teal-700 font-bold rounded px-2"
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
                isGoBackDisabled={nextOffset === 5 || !!searchTerm}
                isGoForwardDisabled={nextOffset === null}
            />

            <div className="grid grid-cols-3 my-4 px-2 font-bold break-all">
                <p>Patient name</p>
                <p>Last appointment</p>
                <p>Phone</p>
            </div>

            <ul className="bg-white rounded px-4">
                {patients.map((patient: Patient, index: number) => {
                    return (
                        <li key={patient.id}>
                            <Link
                                className={`grid grid-cols-3 justify-between py-3 ${index !== patients.length-1 ? 'border-b border-b-black' : ''}`}
                                key={patient.id}
                                to={`/patients/${patient.id}`}
                            >
                                <div>{patient.firstName} {patient.lastName}</div>
                                <div>{patient.lastAppointment}</div>
                                <div>{patient.phone}</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DoctorMain
