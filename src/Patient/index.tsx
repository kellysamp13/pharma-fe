import { useState } from 'react'
import PrescriptionSection from './PrescriptionSection'
import EditPatientModal from './EditPatientModal'
import { useGetPatient } from '../apiCalls'
import { Navigate } from 'react-router-dom'

const PatientView = () => {
    const { data, isLoading, isFetching, isError, refetch: refetchPatient } = useGetPatient()

    const [showModal, setShowModal] = useState<boolean>(false)

    if (isLoading || isFetching) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <Navigate to='/error' />
     }

    return (
        <div className="md:py-10 md:px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">

            {showModal && <EditPatientModal refetchPatient={refetchPatient} setShowModal={() => setShowModal(false)} />}

            <div className="flex">
                <h3 className="font-bold text-lg my-4 mr-10">
                    Patient Info
                    <button
                        onClick={() => setShowModal(true)}
                        className='md:ml-3 px-4 text-sm py-1 font-bold rounded text-white bg-teal-700'
                    >
                        Edit
                    </button>
                </h3>

                <div>
                    <div className="my-2">
                        <strong>Name: </strong>{data?.firstName} {data?.lastName}
                    </div>
                    <div className="my-2">
                        <strong>Email: </strong>{data?.email}
                    </div>
                    <div className="my-2">
                        <strong>Phone number: </strong>{data?.phone}
                    </div>
                    <div className="my-2">
                        <strong>Last appointment: </strong> {data?.lastAppointment}
                    </div>
                </div>
            </div>

            <PrescriptionSection refetchPatient={refetchPatient} patientData={data || null} />
        </div>

    )
}

export default PatientView
