import { useState } from 'react'
import{ Link }from 'react-router-dom'
import { Patient } from '../schemas/Patient'
import { useGetPatients } from './apiCalls'
import ListViewControls from '../components/ListViewControls'

const DoctorMain = () => {
    // RESET SEARCH TERM ON BUTTON CLICK
    // ON CLICKING VIEW ALL
    const [searchTerm, setSearchTerm] = useState('')
    const [offset, setOffset] = useState(0)

    const { data, isLoading } = useGetPatients(offset, searchTerm)

    if (isLoading) {
        return <div>Loading...</div>
    }

    const { patients = [], nextOffset = 0 } = data

    return (
        <div className="w-[90%] m-auto px-4">
            <div className="mt-4">
                <form>
                    {/* CHANGE TO STARTS WITH? */}
                    <label className="mr-2">Search by last name</label>
                    <input
                        // DEBOUNCE, SEARCH AFTER 3
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        type="search"
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

            {/* DONT PAGINATE SEARCH TERMS */}
            <ListViewControls
                onGoBack={() => setOffset(Math.max(offset - 5, 0))}
                onGoForward={() => {
                    if (nextOffset !== null) {
                        setOffset(offset + 5)
                    }
                }}
                isGoBackDisabled={nextOffset === 5}
                isGoForwardDisabled={nextOffset === null}
            />

            <div className="grid grid-cols-3 my-4 px-2 font-bold break-all">
                <p>Patient name</p>
                <p>Prescriptions</p>
                <p>Last appointment</p>
            </div>

            <ul className="bg-white rounded px-4">
                {patients.map((patient: Patient, index: number) => {
                    return (
                        <Link key={patient.id} to={`/patients/${patient.id}`}>
                            <li
                                className={`grid grid-cols-3 justify-between py-3 ${index !== patients.length-1 ? 'border-b border-b-black' : ''}`}
                                key={patient.id}
                            >
                                <div>{patient.firstName} {patient.lastName}</div>
                                <div>{patient.prescriptions?.length || 0}</div>
                                <div>{patient.lastAppointment}</div>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default DoctorMain
