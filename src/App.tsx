import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreatePatient from "./DoctorMain/CreatePatient"
import DoctorMain from './DoctorMain';
import PatientView from './Patient'
import {Link} from 'react-router-dom'
import PharmacistMain from './PharmacistMain';
import { useState } from 'react'
import PrescriptionView from './PharmacistMain/PrescriptionView';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const [viewType, setViewType] = useState<string>(sessionStorage.getItem('viewType') || 'provider')
  const isProviderView = viewType === 'provider'

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* NAVIGATION SECTION */}
        <div className="flex bg-teal-600 py-3 border-b border-b-white">
          <div className="w-[90%] m-auto ">
            <Link
              className='px-4 py-1 font-bold rounded text-white'
              to='/'>
                View all {isProviderView ? 'patients' : 'prescriptions'}
            </Link>

            {isProviderView && <Link className='px-4 py-1 font-bold rounded text-white' to='/addpatient'>Add a new patient</Link>}

            <button
                className='px-4 py-1 font-bold rounded text-white'
                onClick={() => {
                  const newView = isProviderView ? 'pharmacist' : 'provider'
                  sessionStorage.setItem('viewType', newView)
                  setViewType(newView)
                }}
              >
                Change to {isProviderView ? 'pharmacist' : 'provider'} view
              </button>
            </div>
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
