import{ Link }from 'react-router-dom'
import { Patient } from '../types'
import { useGetPatients } from './apiCalls'
import { useEffect, useState } from 'react'
import ListViewControls from '../components/ListViewControls'

const DoctorMain = () => {
    // const { data, isLoading } = useGetPatients()

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:4000/patients?offset=${offset}`).then((res) =>  res.json()).then(json => {
            setData(json.patients)
            setOffset(json.nextOffset || 0)
        })
    }, [])

    const handleSearch = (e: any) => {
        e.preventDefault()
        fetch(`http://localhost:4000/patients?name=${searchTerm}`).then((res) =>  res.json()).then(json => {
            setData(json.patients)
        })
    }

    return (
        <div className="w-[90%] m-auto px-4">
            <div className="mt-4">
                <form onSubmit={(e) => handleSearch(e)}>
                    <label className="mr-2">Search by last name</label>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        type="search"
                    />
                    <button className="ml-2 text-white border border-white rounded px-2" type='submit'>Submit</button>
                </form>
            </div>

            <ListViewControls
                onGoBack={() => {
                    // fetch 5 previous patients
                    return fetch(`http://localhost:4000/patients?offset=${offset}`).then((res) =>  res.json()).then(json => {
                        setData(json.patients)
                        setOffset(json.nextOffset || 0)
                    })
                }}
                onGoForward={() => {
                    // fetch next 5 patients disabled when no next offset
                    return fetch(`http://localhost:4000/patients?offset=${offset}`).then((res) =>  res.json()).then(json => {
                        setData(json.patients)
                        setOffset(json.nextOffset || 0)
                    })
                }}
                isGoBackDisabled={offset === 5}
                isGoForwardDisabled={!offset}
            />

            <div className="grid grid-cols-3 my-4 px-2 font-bold">
                <p>Patient name</p>
                <p>Prescriptions</p>
                <p>Last appointment</p>
            </div>

            <ul className="bg-white rounded px-4">
                {data?.map((patient: Patient, index: number) => {
                    return (
                        <Link key={patient.id} to={`/patients/${patient.id}`}>
                            <li
                                className={`grid grid-cols-3 justify-between py-3 ${index !== data.length-1 ? 'border-b border-b-black' : ''}`}
                                key={patient.id}
                            >
                                <div className="">{patient.firstName} {patient.lastName}</div>
                                <div className="">{patient.prescriptions?.length || 0}</div>
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
