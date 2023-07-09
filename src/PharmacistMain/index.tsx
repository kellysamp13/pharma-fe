import { Prescription } from '../schemas/Prescription'
import { Link } from 'react-router-dom'
import { useGetPrescriptions } from './apiCalls'
import { useState, useEffect } from 'react'
import ListViewControls from '../components/ListViewControls'

const PharmacistMain = () => {
    const { data: otherData, isLoading } = useGetPrescriptions()

    // if (isLoading || !data) {
    //     return <div>Loading...</div>
    // }

    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        fetch('http://localhost:4000/prescriptions').then((res) =>  res.json()).then(json => {
            setData(json.prescriptions)
            setOffset(json.nextOffset)
        })
    }, [])

    const handleSearch = (e: any) => {
        e.preventDefault()
        fetch(`http://localhost:4000/prescriptions?name=${searchTerm}`).then((res) =>  res.json()).then(json => {
            setData(json.prescriptions)
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const filterString = filters.join(',')
        fetch(`http://localhost:4000/prescriptions?filters=${filterString}`).then((res) =>  res.json()).then(json => {
            setData(json.prescriptions)
            setOffset(json.nextOffset)
        })
    }

    const [filters, setFilters] = useState<string[]>([])

    return (
        <div className="w-[90%] m-auto px-4 pb-10">
            <form className="flex" onSubmit={handleSubmit}>
                <div className="mr-3 flex flex-col justify-center">
                    <p>Filter by status</p>

                    <button className="mt-2  ml-2 text-white border border-white rounded px-2" type='submit'>Submit</button>
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
                <form onSubmit={(e) => handleSearch(e)}>
                    <label className="mr-2">Search by drug name</label>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search"
                        value={searchTerm}
                    />
                    <button className="ml-2 text-white border border-white rounded px-2" type='submit'>Submit</button>
                </form>
            </div>


            <ListViewControls
                onGoBack={() => {
                    // fetch 5 previous prescriptions
                    return fetch(`http://localhost:4000/prescriptions?offset=${offset}`).then((res) =>  res.json()).then(json => {
                        setData(json.prescriptions)
                        setOffset(json.nextOffset || 0)
                    })
                }}
                onGoForward={() => {
                    // fetch next 5 prescriptions disabled when no next offset
                    return fetch(`http://localhost:4000/prescriptions?offset=${offset}`).then((res) =>  res.json()).then(json => {
                        setData(json.prescriptions)
                        setOffset(json.nextOffset || 0)
                    })
                }}
                isGoBackDisabled={offset === 5}
                isGoForwardDisabled={!offset}
            />

            <div className="grid grid-cols-3 my-4 px-2 font-bold">
                <p>Prescription</p>
                <p>Status</p>
                <p>Refills</p>
            </div>
            <ul className="bg-white px-4 rounded">
                {data?.map((prescription: Prescription, index: number) => {
                    return (
                        <Link key={prescription.id} to={`/prescriptions/${prescription.id}`}>
                            <li
                                className={`grid grid-cols-3 py-3 ${index !== data.length-1 ? 'border-b border-b-black' : ''}`}
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
