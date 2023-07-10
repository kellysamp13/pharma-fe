import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import CreatePatient from './DoctorMain/CreatePatient'
import DoctorMain from './DoctorMain';
import PatientView from './Patient'
import PharmacistMain from './PharmacistMain';
import PrescriptionView from './PharmacistMain/PrescriptionView';
import ErrorPage from './ErrorPage';

const queryClient = new QueryClient()

function App() {
  const [viewType, setViewType] = useState<string>(sessionStorage.getItem('viewType') || 'provider')
  const isProviderView = viewType === 'provider'

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* NAVIGATION SECTION */}
        <div className='bg-teal-700 py-3 border-b border-b-white'>
          <div className='justify-around flex flex-col md:flex-row px-4 md:max-w-[80%] md:m-auto'>
            <Link
              className='flex items-center px-2 w-[12rem] justify-center font-bold rounded text-white border border-white mr-2 mb-2 md:mb-0 h-[2rem]'
              to='/'
            >
              View all {isProviderView ? 'patients' : 'prescriptions'}
            </Link>

            {isProviderView ? (
              <Link
                className='px-2 flex items-center justify-center font-bold border border-white rounded text-white mr-2 mb-2 md:mb-0 h-[2rem] w-[12rem]'
                to='/addpatient'
              >
                Add a new patient
              </Link>
            ) : null}

            <div>
              <button
                  className='flex items-center px-2 font-bold rounded border border-white text-white mr-2 text-center h-[2rem] w-[15rem] justify-center'
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
        </div>

        <Routes>
          <Route path='/' element={isProviderView ? <DoctorMain/> : <PharmacistMain />}/>
          <Route path='/addpatient' element={<CreatePatient />}/>
          <Route path='/patients/:id' element={<PatientView />}/>
          <Route path='/prescriptions/:id' element={<PrescriptionView />}/>
          <Route path='/error' element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
