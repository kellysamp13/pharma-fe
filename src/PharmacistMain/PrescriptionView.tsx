import { useParams } from 'react-router-dom'
import useSwr from 'swr'
import AddPrescriptionForm from '../DoctorMain/Forms/AddPrescriptionForm'

const PrescriptionView = () => {
    const getPrescriptionFetcher = (url: string) => fetch(url).then((res) => res.json())
    const params = useParams()
    const { data, error, isLoading } = useSwr(`http://localhost:4000/prescriptions/${params.id}`, getPrescriptionFetcher)

    console.log('data', data)

    return (
        <div>
            {/* <AddPrescriptionForm /> */}
        </div>
    )
}

export default PrescriptionView
