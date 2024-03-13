import { useEffect, useState } from "react"
import "./ReportAdder.style.css"
import { getAppointments } from "../../../api/AppointmentService"
import { createReport } from "../../../api/ReportService"

const ReportAdder = ({setReports}) => {

    const addReport = {
        name: "",
        species: "",
        breed: "",
        gender: "",
        color: "",
        dateOfBirth: ""
    }

    const [reportInAdd, setReportInAdd] = useState(addReport)

    const handleUserInput = (event) => {
        setReportInAdd({...reportInAdd, [event.target.name]: event.target.value})
    }

    const handleReportAdd = () => {
        createReport(reportInAdd).then(data => {
            setReports(prev => [...prev, data])
        })

        setReportInAdd(addReport)
    }

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        getAppointments().then(data => {
            setAppointments(data)
        })
    }, [])

    const handleSelect = (event) => {
        const selectedAppointmentId = parseInt(event.target.value);
        const selectedAppointment = appointments.find(appointment => appointment.id === selectedAppointmentId);
        setReportInAdd({ ...reportInAdd, appointment: selectedAppointment });
    };

    return (
    <div className="report-adder">
        <h3>Add Report</h3>
        <input onChange={handleUserInput} type="text" value={reportInAdd.title} placeholder="Title" name="title" />
            <input onChange={handleUserInput} type="text" value={reportInAdd.diagnosis} placeholder="Diagnosis" name="diagnosis" />
            <input onChange={handleUserInput} type="number" value={reportInAdd.price} placeholder="Price" name="price" />
        
        
            <select onChange={handleSelect} name="appointmentId" value={reportInAdd.appointment ? reportInAdd.appointment.id : ""}>
                <option value="">Select a appointment</option>
                {appointments.map(appointment => (
                    <option key={appointment.id} value={appointment.id}>{appointment.appointmentDate}</option>
                ))}
            </select>

        <button onClick={handleReportAdd}>Add</button>
    </div>
    )
}

export default ReportAdder