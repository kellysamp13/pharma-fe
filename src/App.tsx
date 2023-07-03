import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import CreatePatientForm from "./DoctorMain/Forms/CreatePatientForm"
import DoctorMain from './DoctorMain';
import PatientView from './Shared/Patient'
import {Link} from 'react-router-dom'

// As a provider, I should be able to
// * create new patients
// * write prescriptions for these patients
// * see my other patients
// * the status of their previously written prescriptions

// ui to create a new patient - option to add prescription or leave blank /POST
// ui to update a patient - add, update, remove prescription /PATCH or /POST
// ui to see all patients and their prescriptions - search, filter? /GET
// imagining this as one doctor logged in - but do I need to create some sort of doctor/pharma account in the api?


function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex justify-between bg-white px-10 py-3">
          <Link className='px-4 py-1 font-bold rounded text-white bg-teal-600' to='/addpatient'>Add a new patient</Link>
          <Link className='px-4 py-1 font-bold rounded text-white bg-teal-600' to='/'>View all patients</Link>
          <button className='px-4 py-1 font-bold rounded text-white bg-teal-600'>Change to pharm view</button>
        </div>
        <Routes>
          <Route path='/' element={<DoctorMain/>}/>
          <Route path='/addpatient' element={<CreatePatientForm />}/>
          <Route path='/patients/:id' element={<PatientView />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
