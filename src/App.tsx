import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreatePatient from "./DoctorMain/CreatePatient"
import DoctorMain from './DoctorMain';
import PatientView from './Shared/Patient'
import {Link} from 'react-router-dom'
import PharmacistMain from './PharmacistMain';
import { useState } from 'react'

// As a provider, I should be able to
// * see all prescriptions
// * edit prescription filled state
// * see my other patients?

function App() {
  const [viewType, setViewType] = useState<string>(sessionStorage.getItem('viewType') || 'provider')

  return (
    <div>
      <BrowserRouter>
        <div className="flex justify-between bg-white px-10 py-3">
          <Link className='px-4 py-1 font-bold rounded text-white bg-teal-600' to='/addpatient'>Add a new patient</Link>
          <Link className='px-4 py-1 font-bold rounded text-white bg-teal-600' to='/'>View all patients</Link>
          <button
            onClick={() => {
              const newView = viewType === 'provider' ? 'pharmacist' : 'provider'
              sessionStorage.setItem('viewType', newView)
              setViewType(newView)
            }}
            className='px-4 py-1 font-bold rounded text-white bg-teal-600'>
              Change to {viewType === 'provider' ? 'pharmacist' : 'provider'} view
            </button>
        </div>
        <Routes>
          <Route path='/' element={viewType === 'provider' ? <DoctorMain/> : <PharmacistMain />}/>
          <Route path='/addpatient' element={<CreatePatient />}/>
          <Route path='/patients/:id' element={<PatientView />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
