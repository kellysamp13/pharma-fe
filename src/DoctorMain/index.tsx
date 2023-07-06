import{ Link }from 'react-router-dom'
import { Patient } from '../types'
import { useGetPatients } from './apiCalls'

const DoctorMain = () => {
    const { data, isLoading } = useGetPatients()

    if (isLoading || !data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <ul className="bg-white w-[90%] m-auto rounded px-4 mt-4">
                {data?.map((patient: Patient, index: number) => {
                    return (
                        <Link key={patient.id} to={`/patients/${patient.id}`}>
                            <li className={`flex justify-between py-3 ${index !== data.length-1 ? 'border-b border-b-black' : ''}`} key={patient.id}>
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
