import { Navigate, useParams } from 'react-router-dom'
import useSwr from 'swr'
import {useState} from 'react'
import { getPatientFetcher } from './apiCalls'
import PrescriptionSection from './PrescriptionSection'
import EditPatientModal from '../EditPatientModal';

const PatientView = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    // const { data: user } = useSWR(['/api/user', token], ([url, token]) => fetchWithToken(url, token))
    // const { data: orders } = useSWR(user ? ['/api/orders', user] : null, fetchWithUser)
    const params = useParams()
    // get request
    const { data: patientData, error, isLoading } = useSwr(`http://localhost:4000/patients/${params.id}`, getPatientFetcher)

    if (isLoading || !patientData) {
        // the submitting behavior is really weird
        return <div>Loading...</div>
    }

    // if (!patientData?.id) {
    //     return <Navigate to='/'/>
    // }

    return (
        <div className="py-10 px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">

            {showModal && <EditPatientModal />}

            <div className="flex">
                <h3 className="font-bold text-lg my-4 mr-10">
                    Patient Info
                    <button
                        onClick={() => setShowModal(true)}
                        className='ml-3 px-4 text-sm py-1 font-bold rounded text-white bg-teal-600'
                    >
                        Edit
                    </button>
                </h3>

                <div>
                <div className="my-2">
                    <strong>Name: </strong>{patientData.firstName} {patientData.lastName}
                </div>
                <div className="my-2">
                    <strong>Email: </strong>{patientData.email}
                </div>
                <div className="my-2">
                    <strong>Phone number: </strong>{patientData.phone}
                </div>
                <div className="my-2">
                    <strong>Last appointment: </strong> {patientData.lastAppointment}
                </div>
                </div>
            </div>

            <PrescriptionSection patientData={patientData} />
        </div>

    )
}

export default PatientView
