import { useEffect, useState } from "react"
import "./DoctorPage.style.css"
import { getDoctors } from "../../api/DoctorService"
import DoctorCard from "../../components/Doctor/DoctorCard/DoctorCard"
import DoctorAdder from "../../components/Doctor/DoctorAdder/DoctorAdder"
import AvailableDate from "../../components/AvailableDate/AvailableDate"

const DoctorPage = () => {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        getDoctors().then(data => {
            setDoctors(data)
        })
    }, [])


    return (
        <div className="doctor-page">
            <h2>Doctor Management</h2>

            <div className="doctor-list-container">
                <h3>Doctor List</h3>

                <div className="doctor-list">
                    {doctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} setDoctors={setDoctors}/>
                    ))}
                </div>
                

                <DoctorAdder setDoctors={setDoctors}/>
                
            </div>

            <AvailableDate />
        </div>
    )
}

export default DoctorPage