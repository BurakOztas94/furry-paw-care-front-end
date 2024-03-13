import { useEffect, useState } from "react"
import "./ReportCard.style.css"
import { getAppointments } from "../../../api/AppointmentService"
import { updateReport, deleteReport } from "../../../api/ReportService"


const ReportCard = ({ report, setReports }) => {
    const [reportInCard, setReportInCard] = useState(report);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        setReportInCard(report);
    }, [report]);

    useEffect(() => {
        getAppointments().then(data => {
            setAppointments(data);
        });
    }, []);

    const handleSelect = (event) => {
        const selectedAppointmentId = parseInt(event.target.value);
        const selectedAppointment = appointments.find(appointment => appointment.id === selectedAppointmentId);
        setReportInCard({ ...reportInCard, appointment: selectedAppointment });
    };

    const handleReportUpdate = () => {
        updateReport(reportInCard).then(data => {
            setReports(prev => [...prev.filter(obj => obj.id !== reportInCard.id), data]);
        });
    };

    const handleReportDelete = () => {
        deleteReport(reportInCard.id).then(() => {
            setReports(prev => prev.filter(obj => obj.id !== reportInCard.id));
        });
    };

    const handleUserInput = (event) => {
        setReportInCard({ ...reportInCard, [event.target.name]: event.target.value });
    };

    return (
        <div className="report-card">
            <input onChange={handleUserInput} type="text" value={reportInCard.title} placeholder="Title" name="title" />
            <input onChange={handleUserInput} type="text" value={reportInCard.diagnosis} placeholder="Diagnosis" name="diagnosis" />
            <input onChange={handleUserInput} type="number" value={reportInCard.price} placeholder="Price" name="price" />
        

            <select onChange={handleSelect} name="appointmentId" value={reportInCard.appointment ? reportInCard.appointment.id : ""}>
                <option value="">Select a appointment</option>
                {appointments.map(appointment => (
                    <option key={appointment.id} value={appointment.id}>{appointment.appointmentDate}</option>
                ))}
            </select>

            <div>
                <button onClick={handleReportUpdate}>Update</button>
                <button onClick={handleReportDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ReportCard;
