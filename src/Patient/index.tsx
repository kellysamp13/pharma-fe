import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PrescriptionSection from './PrescriptionSection'
import EditPatientModal from './EditPatientModal'
import { useGetPatient } from './apiCalls'
import { Patient } from '../schemas/Patient'

const PatientView = () => {
    const { data, isLoading, isFetching } = useGetPatient()

    const [showModal, setShowModal] = useState<boolean>(false)

    // const [data, setData] = useState<Patient | null>(null)
    // const [searchTerm, setSearchTerm] = useState('')

    if (isLoading || isFetching) {
        // the submitting behavior is really weird - it doesn't have id for a min so redirects to /
        return <div>Loading...</div>
    }

    return (
        <div className="md:py-10 md:px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">

            {showModal && <EditPatientModal setShowModal={() => setShowModal(false)} />}

            <div className="flex">
                <h3 className="font-bold text-lg my-4 mr-10">
                    Patient Info
                    <button
                        onClick={() => setShowModal(true)}
                        className='md:ml-3 px-4 text-sm py-1 font-bold rounded text-white bg-teal-600'
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

            <PrescriptionSection patientData={data} />
        </div>

    )
}

export default PatientView
