import { Prescription } from '../schemas/Prescription'
import { Link } from 'react-router-dom'
import { useGetPrescriptions } from './apiCalls'
import { useState } from 'react'
import ListViewControls from '../components/ListViewControls'

const PharmacistMain = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [offset, setOffset] = useState(0)
    const [filters, setFilters] = useState<string[]>([])

    const { data, isFetching, isLoading } = useGetPrescriptions(searchTerm, offset, filters)

    // const debouncedFilter = useDebounce(filter, 500)

    if (isFetching && isLoading) {
        return <div>Loading...</div>
    }

    const { prescriptions = [], nextOffset = 0 } = data

    // const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //     const filterString = filters.join(',')
    //     // useGetPrescriptions(searchTerm)
    //     // fetch(`http://localhost:4000/prescriptions?filters=${filterString}`).then((res) =>  res.json()).then(json => {
    //     //     // setData(json.prescriptions)
    //     //     setOffset(json.nextOffset)
    //     // })
    // }

    return (
        <div className="w-[90%] m-auto px-4 pb-10">
            <form className="flex">
                <div className="mr-3 flex flex-col justify-center">
                    <p>Filter by status</p>
                </div>

                <div>
                    <div>
                        <input
                            checked={filters.includes('in progress')}
                            className="mr-2"
                            type="checkbox"
                            onChange={() => {
                                const newFilters = filters.includes('in progress') ?
                                    filters.filter(filter => filter !== 'in progress') : [...filters, 'in progress']
                                setFilters(newFilters)
                            }}
                        />
                        <label>In progress</label>
                    </div>
                    <div>
                        <input
                            checked={filters.includes('pending')}
                            className="mr-2"
                            onChange={() => {
                                const newFilters = filters.includes('pending') ?
                                    filters.filter(filter => filter !== 'pending') : [...filters, 'pending']
                                setFilters(newFilters)
                            }}
                            type="checkbox"
                        />
                        <label>Pending</label>
                    </div>
                    <div>
                        <input
                            checked={filters.includes('filled')}
                            className="mr-2"
                            type="checkbox"
                            onChange={() => {
                                const newFilters = filters.includes('filled') ?
                                    filters.filter(filter => filter !== 'filled') : [...filters, 'filled']
                                setFilters(newFilters)
                            }}
                        />
                        <label>Filled</label>
                    </div>
                </div>
            </form>

            <div className="mt-4">
                <form>
                    <label className="mr-2">Search by drug name</label>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search"
                        value={searchTerm}
                    />
                </form>
            </div>


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

            <div className="grid grid-cols-3 my-4 px-2 font-bold">
                <p>Prescription</p>
                <p>Status</p>
                <p>Refills</p>
            </div>
            <ul className="bg-white px-4 rounded">
                {prescriptions?.map((prescription: Prescription, index: number) => {
                    return (
                        <Link key={prescription.id} to={`/prescriptions/${prescription.id}`}>
                            <li
                                className={`grid grid-cols-3 py-3 ${index !== prescriptions.length-1 ? 'border-b border-b-black' : ''}`}
                                key={prescription.id}
                            >
                                <div>{prescription.name}</div>
                                <div>{prescription.status}</div>
                                <div>{prescription.refills}</div>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default PharmacistMain
