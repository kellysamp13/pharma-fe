import { Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import PrescriptionSection from './PrescriptionSection'
import EditPatientModal from '../EditPatientModal'
import { useQuery } from '@tanstack/react-query'

const PatientView = () => {
    const params = useParams()

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['patient'],
        queryFn: () => {
            return fetch(`http://localhost:4000/patients/${params.id}`).then((res) => res.json()).then(json => {
                const expiredScripts = json.prescriptions.filter((script: any) => !Number(script.refills))
                const activeScripts = json.prescriptions.filter((script: any) => Number(script.refills))
                return {...json, expiredScripts, activeScripts}
            })
        }
    })

    const [showModal, setShowModal] = useState<boolean>(false)

    if (isLoading || !data) {
        // the submitting behavior is really weird - it doesn't have id for a min so redirects to /
        return <div>Loading...</div>
    }

    if (!data?.id && !isLoading && !isFetching) {
        return <Navigate to='/'/>
    }

    return (
        <div className="py-10 px-20 bg-white w-[90%] mx-auto p-6 rounded my-10">

            {showModal && <EditPatientModal setShowModal={setShowModal} />}

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
                        <strong>Name: </strong>{data.firstName} {data.lastName}
                    </div>
                    <div className="my-2">
                        <strong>Email: </strong>{data.email}
                    </div>
                    <div className="my-2">
                        <strong>Phone number: </strong>{data.phone}
                    </div>
                    <div className="my-2">
                        <strong>Last appointment: </strong> {data.lastAppointment}
                    </div>
                </div>
            </div>

            <PrescriptionSection patientData={data} />
        </div>

    )
}

export default PatientView
