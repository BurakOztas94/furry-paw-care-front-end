import { useEffect, useState } from "react"
import "./AppointmentPage.style.css"
import { getAppointments } from "../../api/AppointmentService"
import AppointmentCard from "../../components/Appointment/AppointmentCard/AppointmentCard"
import AppointmentAdder from "../../components/Appointment/AppointmentAdder/AppointmentAdder"

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        getAppointments().then(data => {
            setAppointments(data)
        })
    }, [])


    return (
        <div className="appointment-page">
            <h2>Appointment Management</h2>

            <div className="appointment-list-container">
                <h3>Appointment List</h3>

                <div className="appointment-list">
                    {appointments.map(appointment => (
                        <AppointmentCard key={appointment.id} appointment={appointment} setAppointments={setAppointments}/>
                    ))}
                </div>
                

                <AppointmentAdder setAppointments={setAppointments}/>
                
            </div>
        </div>
    )
}

export default AppointmentPage