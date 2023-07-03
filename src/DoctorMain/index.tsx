import useSwr from 'swr'
import{ Link }from 'react-router-dom'
import { Patient } from '../types'

const DoctorMain = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data, error, isLoading } = useSwr('http://localhost:4000/patients', fetcher)

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {/* <div className="flex justify-between bg-white px-10 py-3">
                <Link className='px-4 py-1 font-bold rounded text-white bg-teal-600' to='/addpatient'>Add a new patient</Link>
                <button className='px-4 py-1 font-bold rounded text-white bg-teal-600'>Change to pharm view</button>
            </div> */}
            <ul className="bg-white w-[90%] m-auto rounded px-4 mt-4">
                {data?.map((patient: Patient) => {
                    return (
                        <Link key={patient.id} to={`/patients/${patient.id}`}>
                            <li className="flex justify-between py-3 border-b border-b-black" key={patient.id}>
                                <div className="w-1/5">{patient.firstName} {patient.lastName}</div>
                                <div className="w-1/5 break-words">{patient.email}</div>
                                <div>{patient.phone}</div>
                                <div>{patient.lastAppointment}</div>
                                {/* make the text dynamic */}
                                <div className="w-1/5">{patient.prescriptions?.length} Active Prescription(s)</div>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default DoctorMain