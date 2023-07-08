import { Prescription } from '../types'
import { Link } from 'react-router-dom'
import { useGetPrescriptions } from './apiCalls'
import { useState, useEffect } from 'react'
import ListViewControls from '../components/ListViewControls'

const PharmacistMain = () => {
    // const { data, isLoading } = useGetPrescriptions()

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

    return (
        <div className="w-[90%] m-auto px-4 pb-10">
            <div className="flex flex-col">
                Filter by status
                <div>
                    <input type="checkbox"></input>
                    <label>In progress</label>
                </div>
                <div>
                    <input type="checkbox"></input>
                    <label>Pending</label>
                </div>
                <div>
                    <input type="checkbox"></input>
                    <label>Filled</label>
                </div>
            </div>

            <div className="mt-4">
                <form onSubmit={(e) => handleSearch(e)}>
                    <label className="mr-2">Search by drug name</label>
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
                                <div className="">{prescription.name}</div>
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
