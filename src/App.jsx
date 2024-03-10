import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import CustomerPage from "./pages/CustomerPage/CustomerPage"
import AnimalPage from "./pages/AnimalPage/AnimalPage"
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage"
import DoctorPage from "./pages/DoctorPage/DoctorPage"
import ReportPage from "./pages/ReportPage/ReportPage"
import VaccinePage from './pages/VaccinePage/VaccinePage'
import Navbar from './components/Navbar/Navbar'


function App() {

  return (
    <div className="app">

        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />          
          <Route path='/animals' element ={<AnimalPage />} />
          <Route path='/appointments' element ={<AppointmentPage />} />
          <Route path='/customers' element ={<CustomerPage />} />
          <Route path='/doctors' element ={<DoctorPage />} />
          <Route path='/reports' element ={<ReportPage />} />
          <Route path='/vaccines' element ={<VaccinePage />} />
        </Routes>
    </div>
  )
}

export default App
