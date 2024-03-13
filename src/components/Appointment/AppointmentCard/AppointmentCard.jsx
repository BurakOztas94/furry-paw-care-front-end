import { useEffect, useState } from "react"
import "./AppointmentCard.style.css"
import { getDoctors } from "../../../api/DoctorService"
import { updateAppointment, deleteAppointment } from "../../../api/AppointmentService"
import { getAnimals } from "../../../api/AnimalService"

const AppointmentCard = ({ appointment, setAppointments }) => {
    const [appointmentInCard, setAppointmentInCard] = useState(appointment);
    const [doctors, setDoctors] = useState([]);
    const [animals, setAnimals] = useState([])

    useEffect(() => {
        setAppointmentInCard(appointment);
    }, [appointment]);

    useEffect(() => {
        getDoctors().then(data => {
            setDoctors(data);
        });
    }, []);

    useEffect(() => {
        getAnimals().then(data => {
            setAnimals(data);
        });
    }, []);

    const handleDoctorSelect = (event) => {
        const selectedDoctorId = parseInt(event.target.value);
        const selectedDoctor = doctors.find(doctor => doctor.id === selectedDoctorId);
        setAppointmentInCard({ ...appointmentInCard, doctor: selectedDoctor });
    };

    const handleAnimalSelect = (event) => {
        const selectedAnimalId = parseInt(event.target.value);
        const selectedAnimal = animals.find(animal => animal.id === selectedAnimalId);
        setAppointmentInCard({ ...appointmentInCard, animal: selectedAnimal });
    };

    const handleAppointmentUpdate = () => {
        updateAppointment(appointmentInCard).then(data => {
            setAppointments(prev => [...prev.filter(obj => obj.id !== appointmentInCard.id), data]);
        });
    };

    const handleAppointmentDelete = () => {
        deleteAppointment(appointmentInCard.id).then(() => {
            setAppointments(prev => prev.filter(obj => obj.id !== appointmentInCard.id));
        });
    };

    const handleUserInput = (event) => {
        setAppointmentInCard({ ...appointmentInCard, [event.target.name]: event.target.value });
    };

    return (
        <div className="appointment-card">
            <input onChange={handleUserInput} type="datetime-local" value={appointmentInCard.appointmentDate} placeholder="Appointment Date" name="appointmentDate" />
    
    <select onChange={handleDoctorSelect} name="doctorId" value={appointmentInCard.doctor ? appointmentInCard.doctor.id : ""}>
        <option value="">Select a doctor</option>
        {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
        ))}
    </select>

    <select onChange={handleAnimalSelect} name="animalId" value={appointmentInCard.animal ? appointmentInCard.animal.id : ""}>
        <option value="">Select an animal</option>
        {animals.map(animal => (
            <option key={animal.id} value={animal.id}>{animal.name}</option>
        ))}
    </select>

            <div>
                <button onClick={handleAppointmentUpdate}>Update</button>
                <button onClick={handleAppointmentDelete}>Delete</button>
            </div>
        </div>
    );
};

export default AppointmentCard;
