import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreatePatient from "./DoctorMain/CreatePatient"
import DoctorMain from './DoctorMain';
import PatientView from './Shared/Patient'
import {Link} from 'react-router-dom'
import PharmacistMain from './PharmacistMain';
import { useState } from 'react'
import PrescriptionView from './PharmacistMain/PrescriptionView';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// As a provider, I should be able to
// * see all prescriptions
// * edit prescription filled state
// * see my other patients?

const queryClient = new QueryClient()

function App() {
  const [viewType, setViewType] = useState<string>(sessionStorage.getItem('viewType') || 'provider')
  const isProviderView = viewType === 'provider'

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex justify-between bg-white px-10 py-3">
          {isProviderView && <Link className='px-4 py-1 font-bold rounded text-white bg-teal-600' to='/addpatient'>Add a new patient</Link>}
          <Link className='px-4 py-1 font-bold rounded text-white bg-teal-600' to='/'>View all {isProviderView ? 'patients' : 'prescriptions'}</Link>
          <button
            onClick={() => {
              const newView = isProviderView ? 'pharmacist' : 'provider'
              sessionStorage.setItem('viewType', newView)
              setViewType(newView)
            }}
            className='px-4 py-1 font-bold rounded text-white bg-teal-600'>
              Change to {isProviderView ? 'pharmacist' : 'provider'} view
            </button>
        </div>
        <Routes>
          <Route path='/' element={isProviderView ? <DoctorMain/> : <PharmacistMain />}/>
          <Route path='/addpatient' element={<CreatePatient />}/>
          <Route path='/patients/:id' element={<PatientView />}/>
          <Route path='/prescriptions/:id' element={<PrescriptionView />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
